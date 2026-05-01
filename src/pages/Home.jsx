import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import "../home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <section className="landing-hero">
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <p className="subtitle">Your Journey to Elegant Spaces →</p>

          <h1>
            Designing Beautiful <span>Interiors</span>
          </h1>

          <p className="desc">
            We create premium interiors blending comfort, luxury, and modern
            design. Explore our services and projects, then get in touch to
            start your own space transformation.
          </p>

          <div className="hero-actions">
            <button
              className="primary-cta"
              onClick={() => navigate("/services")}
            >
              View Services
            </button>

            <button
              className="secondary-cta"
              onClick={() => navigate("/projects")}
            >
              View Projects
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div className="hero-image">
          <HeroCarousel />
        </div>
      </section>
    </div>
  );
}

export default Home;
