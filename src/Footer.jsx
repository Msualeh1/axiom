import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  return (
    <footer style={styles.footer}>
      <Container>
        
        <Row>
          <Col md={4} style={styles.column}>
            <h5 style={styles.title}>RockStore</h5>
            <p>Your one-stop shop for everything you need.</p>
          </Col>
          <Col md={4} style={styles.column}>
            <h5 style={styles.title}>Quick Links</h5>
            <ul style={styles.list}>
              <li><a href="#home" style={styles.link}>Home</a></li>
              <li><a href="#products" style={styles.link}>Products</a></li>
              <li><a href="#services" style={styles.link}>Services</a></li>
              <li><a href="#blogs" style={styles.link}>Blogs</a></li>
              <li><a href="#about" style={styles.link}>About Us</a></li>
            </ul>
          </Col>
          <Col md={4} style={styles.column}>
            <h5 style={styles.title}>Contact Us</h5>
            <p>Email: info@rockstore.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button variant="primary" onClick={scrollToTop} style={styles.scrollButton}>
              Back to Top
            </Button>
            <p style={styles.copyright}>
              &copy; {new Date().getFullYear()} RockStore. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#0C233D', // Dark blue color
    color: '#fff', // White text
    padding: '20px 0',
    position: 'relative',
    bottom: '0',
    width: '100%',
    paddingTop:"2rem",
    
  },

  column: {
    marginBottom: '20px',
  },
  title: {
    color: '#ffffff', // White for headings
    marginBottom: '15px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
  },
  copyright: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#ffffff',
  },
  scrollButton: {
    marginBottom: '20px',
    backgroundColor: '#007bff', // Bootstrap primary color
    borderColor: '#007bff', // Bootstrap primary border color
  },
};

export default Footer;