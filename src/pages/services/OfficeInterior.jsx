import { useNavigate } from "react-router-dom";
import "../services.css";

function OfficeInterior() {
  const navigate = useNavigate();

  const officeServices = [
    {
      name: "Wall Mounted Units",
      icon: "🏢",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Pedestals",
      icon: "🗄️",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Cabinets",
      icon: "📁",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=500",
    },
  ];

  return (
    <>
      <section className="office-section">
        <div className="office-header">
          <button
            className="office-back-btn"
            onClick={() => navigate("/services")}
          >
            ←
          </button>
          <div className="office-title-wrapper">
            <h1 className="office-title">Office Interior Services</h1>
            <div className="office-title-underline"></div>
          </div>
        </div>

        <p className="office-subtitle">
          Professional and modern office solutions designed for productivity and
          comfort
        </p>

        <div className="office-container">
          {officeServices.map((service, index) => (
            <div key={index} className="office-card">
              <div className="office-card-image">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-img"
                />
              </div>
              <div className="office-card-content">
                <div className="office-card-header">
                  <div className="office-card-icon">{service.icon}</div>
                  <h3 className="office-card-title">{service.name}</h3>
                </div>
                <div className="office-card-divider"></div>
                <p className="office-card-text">
                  Premium {service.name.toLowerCase()} designed to create
                  organized, efficient, and stylish workspaces.
                </p>
              </div>
              <div className="office-card-arrow">
                <span>›</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default OfficeInterior;
