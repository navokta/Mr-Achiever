import React, { useState, useEffect, useRef } from 'react';
import './ByteWarBanner.css';

const HackathonCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const keyRefs = useRef([]);

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true); // Trigger fade-in for main content

    // Animate keys one by one
    keyRefs.current.forEach((key, index) => {
      if (key) {
        setTimeout(() => {
          key.style.opacity = 1;
          key.style.transform = 'translateY(0)';
        }, 800 + index * 180);
      }
    });
  }, []);

  return (
    <div className={`hackathon-component ${isVisible ? 'visible' : ''}`}>
      {/* Tagline */}
      <div className="tagline animate-slide-up" style={{ '--delay': '0.2s' }}>
        UPCOMING HACKATHON
      </div>

      {/* Title */}
      <h1 className="title animate-slide-up" style={{ '--delay': '0.4s' }}>
        BYTEWAR 2025
      </h1>

      {/* Subtitle */}
      <p className="subtitle animate-slide-up" style={{ '--delay': '0.6s' }}>
        India's most intense coding competition is back!
      </p>

      {/* Action */}
      <p className="action animate-slide-up" style={{ '--delay': '0.8s' }}>
        Build. Breakthrough. Win. Prizes worth ₹10,000!
      </p>

      {/* Stats */}
      <div className="stats animate-slide-up" style={{ '--delay': '1.0s' }}>
        <div className="stat-item">
          <span className="number">500+</span>
          <span className="label">Coders</span>
        </div>
        <div className="stat-item">
          <span className="number">Unlimited</span>
          <span className="label">Possibilities</span>
        </div>
      </div>

      {/* Register Button with Advanced Hover & Click Animations */}
      <button
        className="register-btn animate-pop"
        style={{ '--delay': '1.3s' }}
        onClick={() => (window.location.href = 'https://www.bytewar.in/')}
      >
        REGISTER NOW
      </button>

      {/* Animated Code Keys */}
      
    </div>
  );
};

export default HackathonCard;