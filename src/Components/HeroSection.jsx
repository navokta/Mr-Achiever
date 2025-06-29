import React from 'react';
import './HeroSection.css';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>
        Are you Exicted to Listen <span className="highlight">Our Hero's Story</span>
      </h1>
      <p>
        Navokta: Your Stories Matters, No matter your Field.
      </p>
      <div className="hero-buttons">
        <NavLink to={"/Story"}><button className="get-started">
          Read Stories <span className="sparkle">✨</span>
        </button></NavLink>
        <button className="learn-more">
          Learn More <span className="arrow">→</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
