import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section">
          <h2 className="footer-logo">🐾 PetFood</h2>
          <p>
            Healthy & nutritious food for your lovely pets.
            Made with love and care.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Pet Categories</h3>
          <ul>
            <li><a href="/dog-food">Dog Food</a></li>
            <li><a href="/cat-food">Cat Food</a></li>
            <li><a href="/bird-food">Bird Food</a></li>
            <li><a href="/fish-food">Fish Food</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@petfood.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Location: New York, USA</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PetFood. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
