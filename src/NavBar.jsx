import React, { useState } from 'react';
import { FaHome, FaShoppingBag, FaBell, FaUser, FaBars, FaTimes, FaStore } from 'react-icons/fa'; // Import the store icon
import { Link } from 'react-router-dom';
import './NavBar.css';

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(prevState => !prevState); // Toggle open state
  };

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false); // Close the nav when a link is clicked
  };

  return (
    <div className="top-nav">
      <div className="logo">
        <FaStore size={30} /> {/* Store icon */}
        <span className="logo-text" style={{color:"black"}}>RockStore</span> {/* Logo text */}
      </div>
      <div className="nav-toggle" onClick={toggleNav} style={{paddingRight:'5rem', color:"black"}}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <div className={`nav-items ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-item" onClick={handleLinkClick}>
          <FaHome size={24} />
          <span>Home</span>
        </Link>
        <div className="nav-item" onClick={handleLinkClick}>
          <FaShoppingBag size={24} />
          <span>Cart</span>
        </div>
        <div className="nav-item" onClick={handleLinkClick}>
          <div className="notification-icon">
            <FaBell size={24} />
            <span className="notification-badge">5</span>
          </div>
          <span>Notification</span>
        </div>
        <div className="nav-item" onClick={handleLinkClick}>
          <FaUser size={24} />
          <span>Account</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
