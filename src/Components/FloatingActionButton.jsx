import React, { useState, useEffect } from 'react';
import './FloatingActionButton.css';

const FloatingActionButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={`fab-container ${isActive ? 'active' : ''}`} style={{ bottom: showTopBtn ? '80px' : '20px' }}>
        <div className="fab-options">
          <a href="/add-story" className="fab-option">📝 Add a Story</a>
          <a href="tel:+918307233996" className="fab-option">📞 Call</a>
        </div>
        <div
          className={`fab-button ${isActive ? 'cross' : ''}`}
          onClick={() => setIsActive(!isActive)}
        >
          <span className="plus-icon">+</span>
        </div>
      </div>

      {showTopBtn && (
        <button className="topBtn" onClick={scrollToTop} title="Go to top">
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default FloatingActionButton;
