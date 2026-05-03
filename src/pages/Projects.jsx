import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./projects.css";

/* TV IMAGES */
import tv1 from "../assets/projects/tv1.jpeg";
import tv2 from "../assets/projects/tv2.jpeg";
import tv3 from "../assets/projects/tv3.jpeg";
import tv4 from "../assets/projects/tv4.jpeg";
import tv5 from "../assets/projects/tv5.jpeg";
import tv6 from "../assets/projects/tv6.jpeg";
import tv7 from "../assets/projects/tv7.jpeg";

/* COT IMAGES */
import bed1 from "../assets/projects/bed1.jpeg";
import bed2 from "../assets/projects/bed2.jpeg";
import bed3 from "../assets/projects/bed3.jpeg";
import bed4 from "../assets/projects/bed4.jpeg";
import bed5 from "../assets/projects/bed5.jpeg";
import bed6 from "../assets/projects/bed6.jpeg";
import bed7 from "../assets/projects/bed7.jpeg";
import bed8 from "../assets/projects/bed8.jpeg";
import bed9 from "../assets/projects/bed9.jpeg";
import bed10 from "../assets/projects/bed10.jpeg";
import cots1 from "../assets/projects/cots1.jpeg";
import cots2 from "../assets/projects/cots2.jpeg";
import cots3 from "../assets/projects/cots3.jpeg";
import cots4 from "../assets/projects/cots4.jpeg";
import cots5 from "../assets/projects/cots5.jpeg";
import cots6 from "../assets/projects/cots6.jpeg";
import cots7 from "../assets/projects/cots7.jpeg";
import cots8 from "../assets/projects/cots8.jpeg";
import cots9 from "../assets/projects/cots9.jpeg";
import cots10 from "../assets/projects/cots10.jpeg";
import cots11 from "../assets/projects/cots11.jpeg";
import cots12 from "../assets/projects/cots12.jpeg";
import cots13 from "../assets/projects/cots13.jpeg";
import cots14 from "../assets/projects/cots14.jpeg";
import kitchen1 from "../assets/projects/kitchen1 .jpeg";
import kitchen2 from "../assets/projects/kitchen2.jpeg";
import kitchen3 from "../assets/projects/kitchen3.jpeg";
import poojaMandir1 from "../assets/projects/pooja-mandir1.jpeg";
import poojaMandir2 from "../assets/projects/pooja-mandir2.jpeg";
import poojaMandir3 from "../assets/projects/pooja-mandir3.jpeg";
import poojaMandir4 from "../assets/projects/pooja-mandir4.jpeg";
import poojaMandir5 from "../assets/projects/pooja-mandir5.jpeg";
import poojaMandir6 from "../assets/projects/pooja-mandir6.jpeg";
import dress1 from "../assets/projects/dress1.jpeg";
import dress2 from "../assets/projects/dress2.jpeg";
import dress3 from "../assets/projects/dress3.jpeg";
import dress4 from "../assets/projects/dress4.jpeg";

function Projects() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const tvImages = [tv1, tv2, tv3, tv4, tv5, tv6, tv7];
  const cotImages = [
    bed1,
    bed2,
    bed3,
    bed4,
    bed5,
    bed6,
    bed7,
    bed8,
    bed9,
    bed10,
  ];
  const cotsImages = [
    cots1,
    cots2,
    cots3,
    cots4,
    cots5,
    cots6,
    cots7,
    cots8,
    cots9,
    cots10,
    cots11,
    cots12,
    cots13,
    cots14,
  ];
  const kitchenImages = [kitchen1, kitchen2, kitchen3];
  const poojaMandirImages = [
    poojaMandir1,
    poojaMandir2,
    poojaMandir3,
    poojaMandir4,
    poojaMandir5,
    poojaMandir6,
  ];
  const dressImages = [dress1, dress2, dress3, dress4];

  return (
    <section className="projects-section">
      <div className="projects-header-container">
        <button className="header-back-btn" onClick={() => navigate("/")}>
          ←
        </button>
        <h1 className="projects-title">Our Projects</h1>
      </div>

      <p className="projects-intro">
        Browse a selection of completed TV units, bedroom wardrobes, cots,
        kitchen designs, pooja mandir designs, and dress storage designs to see
        the quality and detailing of our work
      </p>

      <div className="projects-group">
        <h2 className="category-title">TV Units</h2>
        <div className="category-scroll">
          {tvImages.map((img, index) => (
            <div key={index} className="scroll-card">
              <img
                src={img}
                alt="TV Unit"
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>

        <h2 className="category-title">Bedroom Wardrobes</h2>
        <div className="category-scroll">
          {cotImages.map((img, index) => (
            <div key={index} className="scroll-card">
              <img src={img} alt="Cots" onClick={() => setSelectedImage(img)} />
            </div>
          ))}
        </div>

        <h2 className="category-title">Cots</h2>
        <div className="category-scroll">
          {cotsImages.map((img, index) => (
            <div key={index} className="scroll-card">
              <img
                src={img}
                alt="Cot Design"
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>

        <h2 className="category-title">Kitchen</h2>
        <div className="category-scroll">
          {kitchenImages.map((img, index) => (
            <div key={index} className="scroll-card">
              <img
                src={img}
                alt="Kitchen"
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>

        <h2 className="category-title">Pooja Mandir</h2>
        <div className="category-scroll">
          {poojaMandirImages.map((img, index) => (
            <div key={index} className="scroll-card">
              <img
                src={img}
                alt="Pooja Mandir"
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>

        <h2 className="category-title">Dressing Tables </h2>
        <div className="category-scroll">
          {dressImages.map((img, index) => (
            <div key={index} className="scroll-card">
              <img
                src={img}
                alt="Dress Storage"
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <h2>Like what you see?</h2>
          <p>
            You&apos;ve seen our work. Book now to start planning your own
            interior project with us.
          </p>
          <Link to="/booking" className="project-book-link">
            Book Now
          </Link>
        </div>
      </div>

      {selectedImage && (
        <div
          className="project-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Project full view" />
        </div>
      )}
    </section>
  );
}

export default Projects;
