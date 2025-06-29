import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import twitter from '../assets/twitter.png';
import linkedin from '../assets/linkedin.png';
import insta from '../assets/insta.png';
import github from '../assets/github.png';
import logo from '../assets/Logo.png';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="brand">Navokta</span>
      </div>

      <nav className={`header-center ${menuOpen ? 'mobile-active' : ''}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/About" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/Story" onClick={() => setMenuOpen(false)}>Stories</NavLink>
        <NavLink to="/Contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        <div className="mobile-socials">
          <a href="https://www.linkedin.com/company/navokta/" target='_blank'><img src={linkedin} alt="LinkedIn" /></a>
          <a href="https://x.com/navokta" target='_blank'><img src={twitter} alt="Twitter" /></a>
          <a href="https://github.com/navokta/" target='_blank'><img src={github} alt="GitHub" /></a>
          <a href="https://www.instagram.com/navokta/" target='_blank'><img src={insta} alt="Instagram" /></a>
        </div>
      </nav>

      <div className="header-right">
        <div className="desktop-socials">
          <a href="https://www.linkedin.com/company/navokta/" target='_blank'><img src={linkedin} alt="LinkedIn" /></a>
          <a href="https://x.com/navokta" target='_blank'><img src={twitter} alt="Twitter" /></a>
          <a href="https://github.com/navokta/" target='_blank'><img src={github} alt="GitHub" /></a>
          <a href="https://www.instagram.com/navokta/" target='_blank'><img src={insta} alt="Instagram" /></a>
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
