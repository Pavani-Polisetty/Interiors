import { useState } from "react";
import {
  insertBooking,
  sendBookingEmailNotification,
  formatBookingEmailFailure,
} from "../supabaseClient";
import { getServiceDescription } from "../data/bookingServices";
import "./booking.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  service: "",
  service_date: "",
  description: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const service = formData.service.trim();
    const row = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: String(formData.phone).trim(),
      address: formData.address.trim(),
      service,
      service_description: getServiceDescription(service),
      service_date: formData.service_date.trim(),
      description: formData.description.trim(),
    };

    const { error: insertError } = await insertBooking(row);

    if (insertError) {
      console.error("Booking insert failed:", insertError);
      alert(insertError.message || "Could not save booking. Check the bookings table and RLS policies.");
      setSubmitting(false);
      return;
    }

    try {
      const mailResult = await sendBookingEmailNotification(row);
      console.log("Owner / customer email result:", mailResult);
      if (mailResult?.ownerSandboxFallback) {
        alert(
          "Booking saved. Owner notification was sent to your SMTP account email (sandbox mode). After you configure SMTP properly, you can use any OWNER_EMAIL and send customer confirmations.",
        );
      } else if (mailResult?.customerEmail?.sent === false && mailResult?.customerEmail?.providerStatus) {
        alert(
          "Booking saved. Owner was notified. Customer confirmation email could not be sent (check SMTP / FROM_EMAIL).",
        );
      } else {
        alert("Booking saved. Notifications sent.");
      }
      setFormData(initialForm);
    } catch (err) {
      console.error("send-email failed:", err);
      if (err?.cause) console.error("send-email cause:", err.cause);
      if (err?.status != null) console.error("send-email HTTP status:", err.status);
      if (err?.body != null) console.error("send-email response body:", err.body);
      alert(`Booking saved, but email notification failed.\n\n${formatBookingEmailFailure(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Interior Consultation</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Project address"
          value={formData.address}
          onChange={handleChange}
        />

        <select name="service" value={formData.service} onChange={handleChange} required>
          <option value="">Select Service</option>
          <option value="Home Interior">Home Interior</option>
          <option value="Modular Kitchen">Modular Kitchen</option>
          <option value="Office Interior">Office Interior</option>
          <option value="Custom Furniture">Custom Furniture</option>
        </select>

        {formData.service ? (
          <p className="service-desc-preview" role="status">
            {getServiceDescription(formData.service)}
          </p>
        ) : null}

        <label className="booking-field-label" htmlFor="contact_service_date">
          Preferred service date (optional)
        </label>
        <input
          id="contact_service_date"
          type="date"
          name="service_date"
          value={formData.service_date}
          onChange={handleChange}
          min={new Date().toISOString().slice(0, 10)}
        />

        <textarea
          name="description"
          placeholder="Describe your project, timeline, budget range, or any special requirements (optional)"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting…" : "Book Consultation"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
