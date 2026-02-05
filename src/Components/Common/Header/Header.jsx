import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import axios from "axios";
import "./Header.css";
import { AuthContext } from "../../Pages/Auth/Authcontext";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const token = localStorage.getItem("userToken");

  /* ===============================
     CART & WISHLIST COUNT
  =============================== */
  useEffect(() => {
    if (!isLoggedIn || !token) return;

    const fetchCounts = async () => {
      try {
        const cartRes = await axios.get(
          "http://localhost:5000/api/cart/count",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartCount(cartRes.data.count || 0);

        const wishlistRes = await axios.get(
          "http://localhost:5000/api/wishlist/count",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlistCount(wishlistRes.data.count || 0);
      } catch (error) {
        console.error("Header count error:", error);
      }
    };

    fetchCounts();
  }, [isLoggedIn, token]);

  /* ===============================
     LOGOUT
  =============================== */
  const handleLogout = () => {
    logout();
    setCartCount(0);
    setWishlistCount(0);
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo">🐶 Pet Food Shop</div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* NAV LINKS */}
      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        {/* PRODUCTS */}
        <div
          className="dropdown"
          onMouseEnter={() => setProductOpen(true)}
          onMouseLeave={() => setProductOpen(false)}
        >
          <button className="dropdown-btn">Products</button>

          {productOpen && (
            <div className="products-dropdown-menu">
              <Link to="/products" onClick={() => setMenuOpen(false)}>All</Link>
              <Link to="/products/category/2">Cat</Link>
              <Link to="/products/category/1">Dog</Link>
              <Link to="/products/category/3">Puppy</Link>
              <Link to="/products/category/sub_categories/4">Accessories</Link>
              <Link to="/products/category/sub_categories/3">Toys</Link>
            </div>
          )}
        </div>

        {/* ABOUT */}
        <div
          className="dropdown"
          onMouseEnter={() => setAboutOpen(true)}
          onMouseLeave={() => setAboutOpen(false)}
        >
          <button className="dropdown-btn">About Us</button>

          {aboutOpen && (
            <div className="products-dropdown-menu">
              <Link to="/about">About Us</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          )}
        </div>

        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
      </nav>

      {/* RIGHT ICONS */}
      <div className="header-icons">
        <Link to="/wishlist" className="icon-box">
          <FaHeart />
          {wishlistCount > 0 && (
            <span className="count-badge">{wishlistCount}</span>
          )}
        </Link>

        <Link to="/cart" className="icon-box">
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="count-badge">{cartCount}</span>
          )}
        </Link>

        {!isLoggedIn ? (
          <Link to="/login" className="icon-box">
            <FaSignInAlt />
          </Link>
        ) : (
          <div className="profile-dropdown">
            <button onClick={() => setProfileOpen(!profileOpen)}>
              <FaUser />
            </button>

            {profileOpen && (
              <div className="profile-menu">
                <Link to="/profile" onClick={() => setProfileOpen(false)}>
                  My Profile
                </Link>
                <Link to="/myorders" onClick={() => setProfileOpen(false)}>
                  My Orders
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
