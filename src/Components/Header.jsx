import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/profile.png" alt="Logo" className="logo" />
        <span className="brand">Mr. Achiver</span>
      </div>

      <nav className="header-center">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Projects</a>
        <a href="#">Contact</a>
      </nav>

      <div className="header-right">
        <a href="#"><img src="../../public/linkedin.png" alt="LinkedIn" /></a>
        <a href="#"><img src="../../public/twitter.png" alt="Twitter" /></a>
        <a href="#"><img src="../../public/github.png" alt="GitHub" /></a>
        <a href="#"><img src="../../public/insta.png" alt="Instagram" /></a>
      </div>
    </header>
  );
};

export default Header;
