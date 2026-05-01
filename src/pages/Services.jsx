import Navbar from "../components/Navbar";
import "./services.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Services() {
  const navigate = useNavigate();

  // 🔥 Scroll animation state
  const whyRef = useRef(null);
  const [showWhy, setShowWhy] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowWhy(true);
        }
      },
      { threshold: 0.3 },
    );

    if (whyRef.current) observer.observe(whyRef.current);

    return () => {
      if (whyRef.current) observer.unobserve(whyRef.current);
    };
  }, []);

  return (
    <>
      <Navbar />

      <section className="services">
        {/* 🔹 HOW WE WORK */}
        <div className="process-section">
          <h2>How We Work</h2>

          <div className="process-steps">
            <div className="step-card">
              <span>01</span>
              <h4>Consultation</h4>
              <p>Understanding your space, style and requirements.</p>
            </div>

            <div className="step-card">
              <span>02</span>
              <h4>Design Planning</h4>
              <p>Creating layouts and modern design concepts.</p>
            </div>

            <div className="step-card">
              <span>03</span>
              <h4>Material Selection</h4>
              <p>Choosing premium materials that suit your design.</p>
            </div>

            <div className="step-card">
              <span>04</span>
              <h4>Execution & Delivery</h4>
              <p>Perfect implementation with on-time completion.</p>
            </div>
          </div>
        </div>

        {/* 🔹 WHY CHOOSE US */}
        <div className="why-section" ref={whyRef}>
          <h2>Why Choose Us</h2>

          <div className={`why-grid ${showWhy ? "show" : ""}`}>
            <div>✔ Experienced Designers</div>
            <div>✔ Premium Materials</div>
            <div>✔ On-Time Delivery</div>
            <div>✔ Affordable Luxury Designs</div>
          </div>
        </div>

        {/* 🔹 SERVICES */}
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">
          Elegant solutions designed for comfort and style
        </p>

        <div className="services-container">
          <div
            className="service-card home-bg"
            onClick={() => navigate("/services/home-interior")}
          >
            <h3>Home Interior Design</h3>
            <p>
              Create warm, elegant, and functional living spaces designed to
              reflect your personality.
            </p>
          </div>

          <div
            className="service-card kitchen-bg"
            onClick={() => navigate("/services/modular-kitchen")}
          >
            <h3>Modular Kitchen</h3>
            <p>
              Design stylish and efficient kitchens with smart storage and
              layouts.
            </p>
          </div>

          <div
            className="service-card office-bg"
            onClick={() => navigate("/services/office-interior")}
          >
            <h3>Office Interior</h3>
            <p>Build professional workspaces that inspire productivity.</p>
          </div>

          <div
            className="service-card furniture-bg"
            onClick={() => navigate("/services/custom-furniture")}
          >
            <h3>Custom Furniture</h3>
            <p>Craft unique furniture designed perfectly for your space.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
