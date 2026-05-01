import { useNavigate } from "react-router-dom";
import "../services.css";
import tvUnitImg from "../../assets/services/tv-unit.jpg";
import bedroomImg from "../../assets/services/bedroom.jpg";
import crockeryImg from "../../assets/services/crockery.jpg";
import wallPanelImg from "../../assets/services/wall-panel.jpg";
import partitionImg from "../../assets/services/partition.jpg";
import falseCeilingImg from "../../assets/services/false-ceiling.jpg";
import poojaImg from "../../assets/services/pooja.jpg";
import dressingTableImg from "../../assets/services/dressing-table.jpg";
import { useEffect } from "react";

function HomeInterior() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      name: "TV Unit",
      icon: "📺",
      image: tvUnitImg,
    },
    {
      name: "Bedrooms",
      icon: "🛏️",
      image: bedroomImg,
    },
    {
      name: "Crockery Unit",
      icon: "🍽️",
      image: crockeryImg,
    },
    {
      name: "Wall Panelings",
      icon: "🧱",
      image: wallPanelImg,
    },
    {
      name: "Partitions",
      icon: "↔️",
      image: partitionImg,
    },
    {
      name: "False Ceilings",
      icon: "🏠",
      image: falseCeilingImg,
    },
    {
      name: "Pooja Mandir",
      icon: "⛩️",
      image: poojaImg,
    },
    {
      name: "Dressing Tables",
      icon: "🪞",
      image: dressingTableImg,
    },
  ];

  return (
    <>
      <section className="home-section">
        <div className="kitchen-header">
          <button
            className="kitchen-back-btn"
            onClick={() => navigate("/services")}
          >
            ←
          </button>
          <div className="kitchen-title-wrapper">
            <h1 className="kitchen-title">Home Interior Services</h1>
          </div>
        </div>

        <p className="home-subtitle">
          Elegant and modern interior solutions crafted for comfort and style
        </p>

        <div className="home-container">
          {services.map((service, index) => (
            <div key={index} className="home-card">
              <div className="home-card-image">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-img"
                />
              </div>
              <div className="home-card-content">
                <div className="home-card-header">
                  <div className="home-card-icon">{service.icon}</div>
                  <h3 className="home-card-title">{service.name}</h3>
                </div>
                <div className="home-card-divider"></div>
                <p className="home-card-text">
                  Premium {service.name.toLowerCase()} designs created to
                  enhance your living space.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomeInterior;
