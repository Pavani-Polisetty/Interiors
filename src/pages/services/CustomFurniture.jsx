import { useNavigate } from "react-router-dom";
import "../services.css";
import dinning from "../../assets/services/dinning-table.jpg";
import jhula from "../../assets/services/jhulas.jpg";

function CustomFurniture() {
  const navigate = useNavigate();

  const furnitureServices = [
    {
      name: "Dining Tables",
      icon: "🍽️",
      image: dinning,
    },
    {
      name: "Cots",
      icon: "🛏️",
      image:
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Sofa",
      icon: "🛋️",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Jhulas",
      icon: "🪜",
      image: jhula,
    },
  ];

  return (
    <>
      <section className="custom-section">
        <div className="custom-header">
          <button
            className="custom-back-btn"
            onClick={() => navigate("/services")}
          >
            ←
          </button>
          <div className="custom-title-wrapper">
            <h1 className="custom-title">Custom Furniture Services</h1>
            <div className="custom-title-underline"></div>
          </div>
        </div>

        <p className="custom-subtitle">
          Stylish and custom-made furniture crafted for comfort, durability, and
          elegance
        </p>

        <div className="custom-container">
          {furnitureServices.map((service, index) => (
            <div key={index} className="custom-card">
              <div className="custom-card-image">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-img"
                />
              </div>
              <div className="custom-card-content">
                <div className="custom-card-header">
                  <div className="custom-card-icon">{service.icon}</div>
                  <h3 className="custom-card-title">{service.name}</h3>
                </div>
                <div className="custom-card-divider"></div>
                <p className="custom-card-text">
                  Premium {service.name.toLowerCase()} designed to perfectly
                  match your space, lifestyle, and interior aesthetics.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CustomFurniture;
