import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-left">
        <img src="../assets/Logo.png" alt="Logo" className="logo" />
        <span className="brand">Navokta</span>
      </div>

      <nav className={`header-center ${menuOpen ? 'mobile-active' : ''}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/About" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/Story" onClick={() => setMenuOpen(false)}>Stories</NavLink>
        <NavLink to="/Contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        <div className="mobile-socials">
          <a href="https://www.linkedin.com/company/navokta/" target='_blank'><img src="../assets/linkedin.png" alt="LinkedIn" /></a>
          <a href="https://x.com/navokta" target='_blank'><img src="../assets/twitter.png" alt="Twitter" /></a>
          <a href="https://github.com/navokta/" target='_blank'><img src="../assets/github.png" alt="GitHub" /></a>
          <a href="https://www.instagram.com/navokta/" target='_blank'><img src="../assets/insta.png" alt="Instagram" /></a>
        </div>
      </nav>

      <div className="header-right">
        <div className="desktop-socials">
          <a href="https://www.linkedin.com/company/navokta/" target='_blank'><img src="../assets/linkedin.png" alt="LinkedIn" /></a>
          <a href="https://x.com/navokta" target='_blank'><img src="../assets/twitter.png" alt="Twitter" /></a>
          <a href="https://github.com/navokta/" target='_blank'><img src="../assets/github.png" alt="GitHub" /></a>
          <a href="https://www.instagram.com/navokta/" target='_blank'><img src="../assets/insta.png" alt="Instagram" /></a>
        </div>

        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar top"></span>
          <span className="bar middle"></span>
          <span className="bar bottom"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
