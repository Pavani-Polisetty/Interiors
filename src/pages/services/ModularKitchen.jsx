import { useNavigate } from "react-router-dom";
import "../services.css";
import profile from "../../assets/services/profile-doors.jpg";
import kitchen from "../../assets/services/kitchen-cabinets.jpg";
import storage from "../../assets/services/storage-racks.jpg";
import folding from "../../assets/services/folding-shutter.jpeg";
function ModularKitchen() {
  const navigate = useNavigate();

  const kitchenServices = [
    {
      name: "Folding Shutter",
      icon: "🚪",
      image: folding,
    },
    {
      name: "Profile Doors",
      icon: "🪟",
      image: profile,
    },
    {
      name: "Kitchen Cabinets",
      icon: "🗄️",
      image: kitchen,
    },
    {
      name: "Storage Racks",
      icon: "🧺",
      image: storage,
    },
  ];

  return (
    <>
      <section className="kitchen-section">
        <div className="kitchen-header">
          <button
            className="kitchen-back-btn"
            onClick={() => navigate("/services")}
          >
            ←
          </button>
          <div className="kitchen-title-wrapper">
            <h1 className="kitchen-title">Modular Kitchen Services</h1>
          </div>
        </div>

        <p className="kitchen-subtitle">
          Smart, stylish, and space-saving kitchen solutions designed for modern
          living
        </p>

        <div className="kitchen-container">
          {kitchenServices.map((service, index) => (
            <div key={index} className="kitchen-card">
              <div className="kitchen-card-image">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-img"
                />
              </div>
              <div className="kitchen-card-content">
                <div className="kitchen-card-header">
                  <div className="kitchen-card-icon">{service.icon}</div>
                  <h3 className="kitchen-card-title">{service.name}</h3>
                </div>
                <div className="kitchen-card-divider"></div>
                <p className="kitchen-card-text">
                  Premium {service.name.toLowerCase()} designed to maximize
                  efficiency, storage, and elegance in your modular kitchen.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ModularKitchen;
