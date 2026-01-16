import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaUser
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);

  // 🔐 Change true/false to test
  const isLoggedIn = false; // false = visitor, true = user

  return (
    <header className="header">

      {/* LOGO */}
      <div className="logo">
        🐶 Pet Food Shop
      </div>

      {/* NAV LINKS */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* ICONS */}
      <div className="header-icons">

        {/* WISHLIST */}
        <div className="icon-tooltip">
          <Link to="/wishlist">
            <FaHeart />
          </Link>
          <span className="tooltip-text">Wishlist</span>
        </div>

        {/* CART */}
        <div className="icon-tooltip">
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
          <span className="tooltip-text">Cart</span>
        </div>

        {/* SEARCH */}
        <div className="icon-tooltip">
          <Link to="/search">
            <FaSearch />
          </Link>
          <span className="tooltip-text">Search</span>
        </div>

        {/* PROFILE */}
        <div className="profile-dropdown">
          <button
            className="profile-btn"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <FaUser />
          </button>

          <span className="tooltip-text profile-tip">
            Profile
          </span>

          {openProfile && (
            <div className="dropdown-menu">
              {!isLoggedIn ? (
                <>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
                </>
              ) : (
                <>
                  <Link to="/profile">My Profile</Link>
                  <Link to="/logout">Logout</Link>
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
