/** Catalog copy for each booking service (shown in the form and stored/emailed with the booking). */
export const BOOKING_SERVICES = {
  "Home Interior": {
    description:
      "Full residential interiors — layout, materials, lighting, and finishes tailored to your home and lifestyle.",
  },
  "Modular Kitchen": {
    description:
      "Efficient modular kitchen design with storage planning, finishes, and appliance layout for daily cooking comfort.",
  },
  "Office Interior": {
    description:
      "Workplace interiors focused on productivity, branding, acoustics, and ergonomic layouts for teams.",
  },
  "Custom Furniture": {
    description:
      "Bespoke furniture and built-ins — dimensions, wood/finish options, and on-site coordination.",
  },
};

export function getServiceDescription(serviceKey) {
  if (!serviceKey || typeof serviceKey !== "string") return "";
  return BOOKING_SERVICES[serviceKey]?.description ?? "";
}
