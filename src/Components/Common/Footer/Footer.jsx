import React from "react";
import { Link } from "react-router-dom"; // Link import karna zaroori hai
import "./Footer.css";
import logo from "../../../assets/logo1.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section">
          <h2 className="footer-logo">
            <img src={logo} alt="Fur & Food" className="logo-footer" />
            PetFood
          </h2>
          <p>
            Healthy & nutritious food for your lovely pets.
            Made with love and care.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Categories Section (Cleaned & Updated) */}
        <div className="footer-section">
          <h3>Pet Categories</h3>
          <ul>
            <li><Link to="/category/1">Dog Food</Link></li>
            <li><Link to="/category/2">Cat Food</Link></li>
            <li><Link to="/category/3">Kitten Food</Link></li>
            <li><Link to="/category/4">Puppy Food</Link></li>
            <li><Link to="/category/5">Toys</Link></li>
            <li><Link to="/category/6">Grooming & Accessories</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        {/* Contact Info Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          {/* Email Link */}
          <p>
            Email: <a href="mailto:fur&food@gmail.com" className="contact-link">
              fur&food@gmail.com
            </a>
          </p>

          {/* Phone Link */}
          <p>
            Phone: <a href="tel:+916354529996" className="contact-link">
              +91 7069209050
            </a>
          </p>

          <p>Location: Ahmedabad</p>
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