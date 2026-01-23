import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaSignInAlt
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  // 🔐 Auth status (later backend / localStorage se aayega)
  const isLoggedIn = false; // false = visitor, true = logged user

  // 📦 Product categories
  const categories = [
    { id: 1, name: "All", slug: "all" },
    { id: 2, name: "Cat", slug: "cat" },
    { id: 3, name: "Dog", slug: "dog" },
    { id: 4, name: "Kitten", slug: "kitten" },
    { id: 5, name: "Puppy", slug: "puppy" },
    { id: 6, name: "Toys", slug: "toys" },
    { id: 7, name: "Grooming & Accessories", slug: "grooming-accessories" }
  ];

  return (
    <header className="header">

      {/* LOGO */}
      <div className="logo">
        🐶 Pet Food Shop
      </div>

      {/* NAV LINKS */}
      <nav className="nav-links">
        <Link to="/">Home</Link>

        {/* PRODUCTS CLICK DROPDOWN */}
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => setShowProducts(!showProducts)}
          >
            Products ▾
          </button>

          {showProducts && (
            <div className="products-dropdown-menu">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/products/${cat.slug}`}
                  onClick={() => setShowProducts(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      {/* RIGHT ICONS */}
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

        {/* 🔐 LOGIN / PROFILE */}
        {!isLoggedIn ? (
          /* VISITOR */
          <div className="icon-tooltip">
            <Link to="/login">
              <FaSignInAlt />
            </Link>
            <span className="tooltip-text">Login</span>
          </div>
        ) : (
          /* LOGGED USER */
          <div className="profile-dropdown">
            <button
              className="profile-btn"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <FaUser />
            </button>

            <span className="tooltip-text profile-tip">Profile</span>

            {openProfile && (
              <div className="profile-menu">
                <Link to="/profile">My Profile</Link>
                <Link to="/myorders">My Orders</Link>
                <Link to="/logout">Logout</Link>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;