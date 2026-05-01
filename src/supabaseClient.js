import { createClient } from "@supabase/supabase-js";

/** Public values only (never put service role / Resend keys here). */
const rawUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() ||
  "https://mltsfovyuxhhkqiozfws.supabase.co";
export const SUPABASE_URL = rawUrl.replace(/\/+$/, "");

/**
 * Anon / publishable key from Supabase → Project Settings → API (JWT `eyJ…` or `sb_publishable_…`).
 * `createClient` throws if the key is empty, so we use a non-empty fallback when `.env` is unset.
 */
const ANON_FROM_ENV = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
/** Only used when env is unset; keeps the app from crashing on import. Prefer the real anon JWT in `.env`. */
const ANON_KEY_FALLBACK = "sb_publishable_8WR-lYp3d2aBZqRRydzriQ_n5aBgyH3";

export const SUPABASE_ANON_KEY = ANON_FROM_ENV || ANON_KEY_FALLBACK;

if (import.meta.env.DEV && !ANON_FROM_ENV) {
  console.warn(
    "[supabase] VITE_SUPABASE_ANON_KEY is missing — using a placeholder key so the app can load. Add the anon JWT to myapp/.env for database and email.",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** Canonical Edge Functions URL: https://<project-ref>.supabase.co/functions/v1/<name> */
export function edgeFunctionUrl(functionName) {
  const hostname = new URL(SUPABASE_URL).hostname; // <project-ref>.supabase.co
  const projectRef = hostname.split(".supabase.co")[0];
  return `https://${projectRef}.functions.supabase.co/${functionName.replace(/^\//, "")}`;
}

/**
 * Insert into `bookings`. Tries the current schema first; if the DB still uses
 * legacy columns (customer_name, project_address, service_type), retries automatically.
 */
export async function insertBooking(row) {
  const { name, email, phone, address, service } = row;
  const description = row.description?.trim?.() ?? "";
  const service_description = row.service_description?.trim?.() ?? "";
  const service_date = row.service_date?.trim?.() ?? "";

  const modern = {
    name,
    email,
    phone,
    address: address || null,
    service,
    description: description || null,
    service_description: service_description || null,
    service_date: service_date || null,
  };

  const slim = {
    name,
    email,
    phone,
    address: address || null,
    service,
  };

  const legacy = {
    customer_name: name,
    email,
    phone,
    project_address: address || null,
    service_type: service,
  };

  const missingColumn = (err) => {
    const m = String(err?.message || err?.hint || "");
    return (
      /schema cache/i.test(m) ||
      /could not find the ['"][\w]+['"] column/i.test(m) ||
      /column .* does not exist/i.test(m)
    );
  };

  let res = await supabase.from("bookings").insert([modern]);
  if (res.error && missingColumn(res.error)) {
    res = await supabase.from("bookings").insert([slim]);
  }
  if (res.error && missingColumn(res.error)) {
    res = await supabase.from("bookings").insert([legacy]);
  }

  return res;
}

/**
 * Calls the `send-email` Edge Function (SMTP) after a booking row is inserted.
 * Uses explicit fetch() so URL, POST, apikey, Authorization, and JSON body match Supabase’s contract.
 *
 * Accepts either the legacy anon JWT (`eyJ…`) or the newer publishable key (`sb_publishable_…`) — both are valid
 * for the Functions gateway. See https://supabase.com/docs/guides/api/api-keys
 */
/** Readable message from Edge Function / SMTP errors (used in Booking / Contact alerts). */
export function formatBookingEmailFailure(err) {
  const b = err?.body;
  if (
    b &&
    typeof b === "object" &&
    typeof b.hint === "string" &&
    b.hint.trim()
  ) {
    return b.hint;
  }
  if (
    b &&
    typeof b === "object" &&
    typeof b.error === "string" &&
    b.error.trim()
  ) {
    return b.error;
  }
  const pb = b?.providerBody;
  if (pb && typeof pb === "object" && typeof pb.message === "string") {
    return pb.message;
  }
  if (typeof b === "string") return b;
  if (b && typeof b === "object") return JSON.stringify(b, null, 2);
  return err?.message || "Unknown error";
}

export async function sendBookingEmailNotification(booking) {
  const { name, email, phone, address, service } = booking;
  const payload = {
    name,
    email,
    phone,
    address,
    service,
    service_description: booking.service_description ?? "",
    description: booking.description ?? "",
    service_date: booking.service_date ?? "",
  };

  if (!SUPABASE_ANON_KEY?.trim()) {
    const err = new Error(
      "Missing Supabase anon key. Set VITE_SUPABASE_ANON_KEY in myapp/.env (Project Settings → API) and restart npm run dev.",
    );
    console.error("[send-email]", err.message);
    throw err;
  }

  const url = edgeFunctionUrl("send-email");
  console.log("[send-email] POST", url);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (parseErr) {
      console.error("[send-email] Non-JSON response", {
        status: res.status,
        text: text?.slice(0, 500),
      });
      const err = new Error(
        `Edge Function returned non-JSON (HTTP ${res.status})`,
      );
      err.status = res.status;
      err.body = text;
      throw err;
    }

    console.log("[send-email] response", {
      status: res.status,
      ok: res.ok,
      data,
    });

    if (!res.ok) {
      const err = new Error(
        data?.error || `send-email failed (HTTP ${res.status})`,
      );
      err.status = res.status;
      err.body = data;
      console.error("[send-email] HTTP error", err.message, data);
      throw err;
    }

    return data;
  } catch (e) {
    if (e?.name === "TypeError" && String(e.message).includes("fetch")) {
      const wrapped = new Error(
        "Could not reach Edge Function (network/CORS). Confirm the project URL/key, deploy `send-email`, and check the Network tab for *.supabase.co.",
      );
      wrapped.cause = e;
      console.error("[send-email] fetch failed", e);
      throw wrapped;
    }
    throw e;
  }
}
