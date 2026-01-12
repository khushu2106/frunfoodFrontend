import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaHeart } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <h2>🐶 Pet Food Shop</h2>
      </div>

      {/* Center Menu */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      {/* Right Icons */}
      <div className="header-icons">
        <Link to="/wishlist" title="Wishlist">
          <FaHeart />
        </Link>

        <Link to="/cart" title="Cart">
          <FaShoppingCart />
        </Link>

        <Link to="/profile" title="My Profile">
          <FaUserCircle />
        </Link>
      </div>
    </header>
  );
};

export default Header;
