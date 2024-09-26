import React, { useState } from 'react';
import { FaHome, FaShoppingBag, FaBell, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavBar.css';

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bottom-nav">
      <div className="nav-toggle" onClick={toggleNav}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <div className={`nav-items ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-item"> {/* Link to Homepage */}
          <FaHome size={24} />
          <span>Home</span>
        </Link>
        <div className="nav-item">
          <FaShoppingBag size={24} />
          <span>Cart</span>
        </div>
        <div className="nav-item">
          <div className="notification-icon">
            <FaBell size={24} />
            <span className="notification-badge">5</span>
          </div>
          <span>Notification</span>
        </div>
        <div className="nav-item">
          <FaUser size={24} />
          <span>Account</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
