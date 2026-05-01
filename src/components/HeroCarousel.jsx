import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo1.jpeg";
import about1 from "../assets/landing1.jpg";
import about2 from "../assets/landing2.jpeg";
import about3 from "../assets/landing3.jpeg";

const images = [logo, about1, about2, about3];

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="hero"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.6 }}
          className="carousel-img"
        />
      </AnimatePresence>
    </div>
  );
}

export default HeroCarousel;
