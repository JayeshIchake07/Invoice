import React from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

const HomepageNavbar = () => (
  <nav className="navbar">
    <div className="logo">Firm Manager</div>
    <div className="nav-links">
      <Link to="home" smooth duration={500}>Home</Link>
      <Link to="about" smooth duration={500}>About</Link>
      <Link to="summary" smooth duration={500}>Summary</Link>
      <Link to="contact" smooth duration={500}>Contact</Link>
    </div>
  </nav>
);

export default HomepageNavbar;
