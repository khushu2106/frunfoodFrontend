import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔐 Change true/false to test
  const isLoggedIn = false; 

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo">
        <Link to="/">🐶 Pet Food Shop</Link>
      </div>

      {/* MOBILE MENU ICON */}
      <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* NAV LINKS */}
      <nav className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
      </nav>

      {/* ICONS */}
      <div className="header-icons">

        <div className="icon-tooltip">
          <Link to="/wishlist"><FaHeart /></Link>
          <span className="tooltip-text">Wishlist</span>
        </div>

        <div className="icon-tooltip">
          <Link to="/cart"><FaShoppingCart /></Link>
          <span className="tooltip-text">Cart</span>
        </div>

        {/* PROFILE */}
        <div className="profile-dropdown">
          <button
            className="profile-btn"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <FaUser />
          </button>
          <span className="tooltip-text profile-tip">Profile</span>

          {openProfile && (
            <div className="dropdown-menu">
              {!isLoggedIn ? (
                <>
                  <Link to="/register" onClick={() => setOpenProfile(false)}>Register</Link>
                  <Link to="/login" onClick={() => setOpenProfile(false)}>Login</Link>
                </>
              ) : (
                <>
                  <Link to="/profile" onClick={() => setOpenProfile(false)}>My Profile</Link>
                  <Link to="/logout" onClick={() => setOpenProfile(false)}>Logout</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;