import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import "./Header.css";
import { AuthContext } from "../../Pages/Auth/Authcontext";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  // Fetch cart & wishlist counts
  useEffect(() => {
    if (!isLoggedIn || !token) return;

    const fetchCounts = async () => {
      const currentToken = localStorage.getItem("userToken");
      if (!currentToken) return;

      try {
        const cartRes = await axios.get("http://localhost:5000/api/cart/count", {
          headers: { Authorization: `Bearer ${currentToken}` } 
        });
        setCartCount(cartRes.data.count || 0);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, [isLoggedIn, token]);

  // Proper logout
  const handleLogout = () => {
    logout();              // AuthContext state update
    setCartCount(0);
    setWishlistCount(0);
    setOpenProfile(false);
    navigate("/logout");    // redirect
  };

  return (
    <header className="header">
      <div className="logo">🐶 Pet Food Shop</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      <div className="header-icons">
        {/* Wishlist */}
        <div className="icon-tooltip">
          <Link to="/wishlist">
            <FaHeart />
            {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
          </Link>
          <span className="tooltip-text">Wishlist</span>
        </div>

        {/* Cart */}
        <div className="icon-tooltip">
          <Link to="/cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </Link>
          <span className="tooltip-text">Cart</span>
        </div>

        {/* Login / Profile */}
        {!isLoggedIn ? (
          <div className="icon-tooltip">
            <Link to="/login">
              <FaSignInAlt />
            </Link>
            <span className="tooltip-text">Login</span>
          </div>
        ) : (
          <div className="profile-dropdown">
            <button className="profile-btn" onClick={() => setOpenProfile(!openProfile)}>
              <FaUser />
            </button>
            <span className="tooltip-text profile-tip">Profile</span>

            {openProfile && (
              <div className="profile-menu">
                <Link to="/profile">My Profile</Link>
                <Link to="/myorders">My Orders</Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
