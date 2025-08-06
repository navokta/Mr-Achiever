import React from 'react';
import { FaRocket, FaCode, FaTrophy, FaServer } from 'react-icons/fa';
import { GiProcessor } from 'react-icons/gi';
import './ByteWarBanner.css';

const ByteWarBanner = () => {
  return (
    <div className="bytewar-container">
      {/* Animated background elements */}
      <div className="circuit-pattern"></div>
      <div className="binary-animation"></div>
      <div className="glowing-dots"></div>
      
      {/* Main content */}
      <div className="content-wrapper">
        <div className="text-content">
          <div className="badge-container">
            <span className="hackathon-badge pulse">
              <FaRocket className="icon-spin" /> UPCOMING HACKATHON
            </span>
          </div>
          
          <h1 className="neon-heading">
            <span>BYTEWAR </span> 
            <span className="neon-accent">2025</span>
          </h1>
          
          <p className="glow-text">
            India's most intense <span className="highlight">coding competition</span> is back!<br />
            <span className="highlight">Build. Breakthrough. Win.</span> Prizes worth ₹10,000!
          </p>
          
          <div className="tech-stats">
            <div className="stat-item">
              <GiProcessor className="stat-icon" />
              <div>
                <span className="stat-value">500+ </span>
                <span className="stat-label">Coders</span>
              </div>
            </div>
            <div className="stat-item">
              <FaCode className="stat-icon" />
              <div>
                <span className="stat-value">Unlimited </span>
                <span className="stat-label">Possibilities</span>
              </div>
            </div>
            {/* <div className="stat-item">
              <FaTrophy className="stat-icon" />
              <div>
                <span className="stat-value">₹10K+ </span>
                <span className="stat-label">Prize</span>
              </div>
            </div> */}
          </div>
        </div>
        
        {/* Holographic button */}
        <a 
          href="https://www.bytewar.in/BannerPage" 
          target="_blank" 
          rel="noopener noreferrer"
          className="holographic-button"
        >
          <span className="button-text">REGISTER NOW</span>
          <span className="button-glow"></span>
          <span className="button-border"></span>
        </a>
      </div>
      
      {/* Animated code elements */}
      <div className="floating-code">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="code-line" style={{ animationDelay: `${i * 0.5}s` }}>
            {`// ${Math.random().toString(36).substring(2, 15)}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ByteWarBanner;