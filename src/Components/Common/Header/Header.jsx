import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const isLoggedIn = !!token;

  // Product categories
  const categories = [
    { id: 1, name: "All", slug: "all" },
    { id: 2, name: "Cat", slug: "cat" },
    { id: 3, name: "Dog", slug: "dog" },
    { id: 4, name: "Kitten", slug: "kitten" },
    { id: 5, name: "Puppy", slug: "puppy" },
    { id: 6, name: "Toys", slug: "toys" },
    { id: 7, name: "Grooming & Accessories", slug: "grooming-accessories" }
  ];

  // Fetch cart & wishlist counts
  useEffect(() => {
    if (!token) return;

    const fetchCounts = async () => {
      try {
        const cartRes = await axios.get("http://localhost:5000/api/cart/count", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartCount(cartRes.data.count || 0);

        const wishlistRes = await axios.get("http://localhost:5000/api/wishlist/count", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlistCount(wishlistRes.data.count || 0);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, [token]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setCartCount(0);
    setWishlistCount(0);
    setOpenProfile(false);
    navigate("/login");
    window.location.reload(); // header update
  };

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo">🐶 Pet Food Shop</div>

      {/* NAV LINKS */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {/* Products dropdown */}
        {/* <div className="dropdown">
          <button className="dropdown-btn" onClick={() => setShowProducts(!showProducts)}>
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
        </div> */}

        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      {/* RIGHT ICONS */}
      <div className="header-icons">
        {/* WISHLIST */}
        <div className="icon-tooltip">
          <Link to="/wishlist">
            <FaHeart />
            {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
          </Link>
          <span className="tooltip-text">Wishlist</span>
        </div>

        {/* CART */}
        <div className="icon-tooltip">
          <Link to="/cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </Link>
          <span className="tooltip-text">Cart</span>
        </div>

        {/* LOGIN / PROFILE */}
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
