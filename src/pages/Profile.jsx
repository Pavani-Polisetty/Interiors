import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";
import "./profile.css";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftPhone, setDraftPhone] = useState("");

  const isValidPhone = useMemo(() => {
    if (!phone.trim()) return true;
    return /^[0-9+\-()\s]{7,20}$/.test(phone.trim());
  }, [phone]);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setErrorMsg("");
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      const user = data?.user;
      setEmail(user?.email ?? "");

      const meta = user?.user_metadata ?? {};

      // Prefer app profile data (captured at signup) when available.
      if (user?.id) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("username, phone")
          .eq("id", user.id)
          .maybeSingle();

        if (!profileError && profile) {
          const nextName = profile.username ?? meta.full_name ?? meta.name ?? "";
          const nextPhone = profile.phone ?? meta.phone ?? "";
          setName(nextName);
          setPhone(nextPhone);
          setDraftName(nextName);
          setDraftPhone(nextPhone);
        } else {
          const nextName = meta.full_name ?? meta.name ?? "";
          const nextPhone = meta.phone ?? "";
          setName(nextName);
          setPhone(nextPhone);
          setDraftName(nextName);
          setDraftPhone(nextPhone);
        }
      } else {
        const nextName = meta.full_name ?? meta.name ?? "";
        const nextPhone = meta.phone ?? "";
        setName(nextName);
        setPhone(nextPhone);
        setDraftName(nextName);
        setDraftPhone(nextPhone);
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const handleCancel = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setDraftName(name);
    setDraftPhone(phone);
    setEditMode(false);
  };

  const handleSave = async () => {
    setSuccessMsg("");
    setErrorMsg("");

    if (!draftName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!/^[0-9+\-()\s]{7,20}$/.test(draftPhone.trim()) && draftPhone.trim()) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }

    setSaving(true);
    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    const userId = userRes?.user?.id;

    const [{ error: metaError }, { error: profileError }] = await Promise.all([
      supabase.auth.updateUser({
        data: {
          full_name: draftName.trim(),
          phone: draftPhone.trim(),
        },
      }),
      userId
        ? supabase
            .from("profiles")
            .update({ username: draftName.trim(), phone: draftPhone.trim() })
            .eq("id", userId)
        : Promise.resolve({ error: userErr ?? null }),
    ]);
    setSaving(false);

    if (metaError || profileError) {
      setErrorMsg((metaError || profileError).message);
      return;
    }
    setName(draftName.trim());
    setPhone(draftPhone.trim());
    setSuccessMsg("Profile updated successfully.");
    setEditMode(false);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <main className="profile-main">
        {loading ? (
          <div className="profile-shell">
            <section className="profile-side profile-panel">
              <div className="profile-skeleton" />
            </section>
            <section className="profile-content profile-panel">
              <div className="profile-skeleton tall" />
            </section>
          </div>
        ) : (
          <div className="profile-shell">
            <section className="profile-side profile-panel">
              <div className="profile-avatar" aria-hidden="true">
                <div className="profile-avatar-inner">
                  {(name || email || "?").trim().slice(0, 1).toUpperCase()}
                </div>
              </div>

              <h3 className="profile-side-name">{name || "User"}</h3>
              <p className="profile-side-email">{email || "—"}</p>

              <div className="profile-side-menu">
                <button type="button" className="profile-side-item active">
                  Profile
                </button>
              </div>
            </section>

            <section className="profile-content profile-panel">
              <header className="profile-content-header">
                <div>
                  <h2 className="profile-content-title">Personal Information</h2>
                  <p className="profile-content-subtitle">Your account details</p>
                </div>

                {!editMode ? (
                  <button
                    type="button"
                    className="profile-edit"
                    onClick={() => {
                      setDraftName(name);
                      setDraftPhone(phone);
                      setErrorMsg("");
                      setSuccessMsg("");
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <div className="profile-edit-actions">
                    <button
                      type="button"
                      className="profile-edit-secondary"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="profile-edit-primary"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Saving…" : "Save"}
                    </button>
                  </div>
                )}
              </header>

              {errorMsg ? <div className="profile-alert error">{errorMsg}</div> : null}
              {successMsg ? <div className="profile-alert success">{successMsg}</div> : null}

              <div className="profile-section">
                <h4 className="profile-section-title">Personal Details</h4>

                <div className="profile-kv">
                  <div className="profile-kv-item">
                    <div className="profile-kv-label">User name</div>
                    {editMode ? (
                      <input
                        className="profile-inline-input"
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        placeholder="Enter your name"
                        autoComplete="name"
                      />
                    ) : (
                      <div className="profile-kv-value">{name || "—"}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h4 className="profile-section-title">Contact Information</h4>

                <div className="profile-kv two">
                  <div className="profile-kv-item">
                    <div className="profile-kv-label">Email Address</div>
                    <div className="profile-kv-value">{email || "—"}</div>
                  </div>

                  <div className="profile-kv-item">
                    <div className="profile-kv-label">Phone number</div>
                    {editMode ? (
                      <>
                        <input
                          className="profile-inline-input"
                          value={draftPhone}
                          onChange={(e) => setDraftPhone(e.target.value)}
                          placeholder="Enter phone number"
                          inputMode="tel"
                          autoComplete="tel"
                        />
                        {draftPhone.trim() &&
                        !/^[0-9+\-()\s]{7,20}$/.test(draftPhone.trim()) ? (
                          <div className="profile-help error">
                            Use digits and symbols only (e.g. +91 98765 43210).
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <div className="profile-kv-value">{phone || "—"}</div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;

