import { useNavigate } from "react-router-dom";
import "../pages/booking-success.css";

function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="booking-success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p className="success-message">
          Thank you for booking with Srinivasa Interiors. We have received your
          consultation request and will get back to you soon.
        </p>

        <div className="success-details">
          <h3>What's Next?</h3>
          <ul>
            <li>Our team will review your request</li>
            <li>You'll receive a confirmation email shortly</li>
            <li>We'll contact you within 24 hours</li>
          </ul>
        </div>

        <div className="success-actions">
          <button onClick={() => navigate("/")} className="home-btn">
            Back to Home
          </button>
          <button
            onClick={() => navigate("/services")}
            className="services-btn"
          >
            View Services
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;
