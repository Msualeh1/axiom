import React from 'react';
import './Footer.css'; // Make sure to create and import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>We offer a wide variety of car spare parts, apparel, and electrical equipment to meet your needs.</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> Address: 123 Car St, Auto City</li>
            <li><i className="fas fa-phone"></i> Phone: +1 234 567 890</li>
            <li><i className="fas fa-envelope"></i> Email: support@rockstore.com</li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 RockStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
