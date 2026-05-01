import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import "./landing.css";

function Landing() {
  return (
    <div className="landing">
      {/* NAVBAR */}
      <header className="landing-navbar">
        <h2 className="logo">SRINIVASA INTERIORS</h2>

        <div className="nav-buttons">
          <Link to="/login" className="btn login-btn">
            Login
          </Link>

          <Link to="/signup" className="btn signup-btn">
            Signup
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
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

          <div className="hero-buttons">
            <Link to="/login" className="hero-btn primary">
              LOGIN
            </Link>

            <Link to="/signup" className="hero-btn secondary">
              SIGNUP
            </Link>
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

export default Landing;
