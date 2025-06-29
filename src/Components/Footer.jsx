import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom';

const Footer = () => {
 const currentYear = new Date().getFullYear();
  return (
     <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-box footer-about des">
          <h3 className="footer-txt">About Navokta's Stories</h3>
          <p>
           This platform is a space where you can share your stories, achievements, failures, experiences, and much more. It's a place to inspire others with your journey and learn from the real-life paths of people like you. Your voice matters—because every story deserves to be heard.
          </p>

          {/* Social Media Icons */}
          <div className="social-icons" style={{ display: 'flex' }}>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-box des">
          <h3 className="footer-txt">Quick Links</h3>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/About">About</NavLink></li>
            <li><NavLink to="/Story">Stories</NavLink></li>
            <li><NavLink to="/Contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-box des">
          <h3 className="footer-txt">Contact Us</h3>
          <p>
            Email: <a href="mailto:navokta@gmail.com" style={{ textDecoration: 'none', color: '#ec6090'}}>
              navokta@gmail.com
            </a>
          </p>
          <p>
            Phone: <a href="tel:+918307233996" style={{ textDecoration: 'none', color: '#ec6090'}}>
              +91 8307233996
            </a>
          </p>
          <p>
            Address: Sikandrabad <br />
            District : Bulandshahr - 203205
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom des">
        <p>&copy; {currentYear} All Rights Reserved by Navokta</p>
        <p>
          Made with ❤️ by{' '}
          <a href="https://www.navokta.com" style={{ textDecoration: 'none', color: 'white' }}>
            <strong>Navokta</strong>
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
