import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/profile.png" alt="Logo" className="logo" />
        <span className="brand">Mr. Achiver</span>
      </div>

      <nav className="header-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Story">Stories</NavLink>
        <NavLink to="/Contact">Contact</NavLink>
      </nav>

      <div className="header-right">
        <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a>
        <a href="#"><img src="/twitter.png" alt="Twitter" /></a>
        <a href="#"><img src="/github.png" alt="GitHub" /></a>
        <a href="#"><img src="/insta.png" alt="Instagram" /></a>
      </div>
    </header>
  );
};

export default Header;