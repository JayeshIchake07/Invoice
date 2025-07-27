import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const AppNavbar = () => (
  <nav className="navbar">
    <div className="logo">Firm Panel</div>
    <div className="nav-links">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/clients">Clients</Link>
      <Link to="/bills">Bills</Link>
    </div>
  </nav>
);

export default AppNavbar;
