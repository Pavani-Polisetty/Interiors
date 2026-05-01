import Navbar from "../components/Navbar";
import "./about.css";

// import images
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";

function About() {
  return (
    <>
      <Navbar />

      <section className="about">
        <div className="about-container">
          <h1 className="about-title">About Srinivasa Interiors</h1>
          <p className="about-subtitle">
            Designing spaces that inspire elegant living
          </p>

          <div className="mission-box">
            <h2>Our Mission</h2>
            <p>
              At Srinivasa Interiors, we create sophisticated and functional
              spaces that reflect individuality and comfort. Our approach
              combines creative design, premium materials, and precise
              craftsmanship to deliver interiors that enhance everyday living
              and stand the test of time.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <img src={about1} alt="Creative Design" />
              <h3>Creative Design</h3>
              <p>Elegant, modern interiors tailored to your lifestyle.</p>
            </div>

            <div className="about-card">
              <img src={about2} alt="Quality Materials" />
              <h3>Quality Materials</h3>
              <p>
                We use premium materials for durability and luxury finishes.
              </p>
            </div>

            <div className="about-card">
              <img src={about3} alt="Customer Focus" />
              <h3>Customer Focus</h3>
              <p>Your satisfaction and comfort guide every design decision.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
