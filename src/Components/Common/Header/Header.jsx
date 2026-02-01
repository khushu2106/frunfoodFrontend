// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaHeart, FaShoppingCart, FaUser, FaSignInAlt } from "react-icons/fa";
// import axios from "axios";
// import "./Header.css";
// import { AuthContext } from "../../Pages/Auth/Authcontext";

// const Header = () => {
//   const [openProfile, setOpenProfile] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   const { isLoggedIn, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("userToken");

//   // Fetch cart & wishlist counts
//   useEffect(() => {
//     if (!isLoggedIn || !token) return;

//     const fetchCounts = async () => {
//       try {
//         const cartRes = await axios.get("http://localhost:5000/api/cart/count", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCartCount(cartRes.data.count || 0);

//         const wishlistRes = await axios.get("http://localhost:5000/api/wishlist/count", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setWishlistCount(wishlistRes.data.count || 0);
//       } catch (err) {
//         console.error("Error fetching counts:", err);
//       }
//     };

//     fetchCounts();
//   }, [isLoggedIn, token]);

//   // Proper logout
//   const handleLogout = () => {
//     logout();              // AuthContext state update
//     setCartCount(0);
//     setWishlistCount(0);
//     setOpenProfile(false);
//     navigate("/logout");    // redirect
//   };

//   return (
//     <header className="header">
//       <div className="logo">🐶 Pet Food Shop</div>

//       <nav className="nav-links">
//         <Link to="/">Home</Link>
//         <div className="dropdown">
//           <span className="dropbtn">Products</span>
//           <div className="dropdown-content">
//             <Link to="/products">All</Link>
//             <Link to="/products/cat">Cat</Link>
//             <Link to="/products/kitten">Kitten</Link>
//             <Link to="/products/dog">Dog</Link>
//             <Link to="/products/puppy">Puppy</Link>
//             <Link to="/products/accessories">Accessories</Link>
//             <Link to="/products/toys">Toys</Link>
//           </div>
//         </div>

//         {/* ABOUT DROPDOWN */}
//         <div className="dropdown">
//           <span className="dropbtn">About Us</span>
//           <div className="dropdown-content">
//             <Link to="/about">About Us</Link>
//             <Link to="/faq">FAQ</Link>
//           </div>
//         </div>

//         <Link to="/contact">Contact Us</Link>
//       </nav>

//       <div className="header-icons">
//         {/* Wishlist */}
//         <div className="icon-tooltip">
//           <Link to="/wishlist">
//             <FaHeart />
//             {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
//           </Link>
//           <span className="tooltip-text">Wishlist</span>
//         </div>

//         {/* Cart */}
//         <div className="icon-tooltip">
//           <Link to="/cart">
//             <FaShoppingCart />
//             {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//           </Link>
//           <span className="tooltip-text">Cart</span>
//         </div>

//         {/* Login / Profile */}
//         {!isLoggedIn ? (
//           <div className="icon-tooltip">
//             <Link to="/login">
//               <FaSignInAlt />
//             </Link>
//             <span className="tooltip-text">Login</span>
//           </div>
//         ) : (
//           <div className="profile-dropdown">
//             <button className="profile-btn" onClick={() => setOpenProfile(!openProfile)}>
//               <FaUser />
//             </button>
//             <span className="tooltip-text profile-tip">Profile</span>

//             {openProfile && (
//               <div className="profile-menu">
//                 <Link to="/profile">My Profile</Link>
//                 <Link to="/myorders">My Orders</Link>
//                 <button className="logout-btn" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaHeart, FaShoppingCart, FaUser, FaSignInAlt } from "react-icons/fa";
// import axios from "axios";
// import "./Header.css";
// import { AuthContext } from "../../Pages/Auth/Authcontext";

// const Header = () => {
//   const [openProfile, setOpenProfile] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   const { isLoggedIn, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("userToken");

//   useEffect(() => {
//     if (!isLoggedIn || !token) return;

//     const fetchCounts = async () => {
//       try {
//         const cartRes = await axios.get("http://localhost:5000/api/cart/count", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCartCount(cartRes.data.count || 0);

//         const wishlistRes = await axios.get("http://localhost:5000/api/wishlist/count", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setWishlistCount(wishlistRes.data.count || 0);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCounts();
//   }, [isLoggedIn, token]);

//   const handleLogout = () => {
//     logout();
//     setCartCount(0);
//     setWishlistCount(0);
//     setOpenProfile(false);
//     navigate("/logout");
//   };

//   return (
//     <header className="header">
//       <div className="logo">🐶 Pet Food Shop</div>

//       {/* ===== NAV LINKS ===== */}
//       <nav className="nav-links">
//         <Link to="/">Home</Link>

//         {/* PRODUCTS DROPDOWN */}
//         <div className="dropdown">
//           <span className="dropbtn">Products</span>
//           <div className="dropdown-content">
//             <Link to="/products">All</Link>
//             <Link to="/products/cat">Cat</Link>
//             <Link to="/products/kitten">Kitten</Link>
//             <Link to="/products/dog">Dog</Link>
//             <Link to="/products/puppy">Puppy</Link>
//             <Link to="/products/accessories">Accessories</Link>
//             <Link to="/products/toys">Toys</Link>
//           </div>
//         </div>

//         {/* ABOUT DROPDOWN */}
//         <div className="dropdown">
//           <span className="dropbtn">About Us</span>
//           <div className="dropdown-content">
//             <Link to="/about">About Us</Link>
//             <Link to="/faq">FAQ</Link>
//           </div>
//         </div>

//         <Link to="/contact">Contact Us</Link>
//       </nav>

//       {/* ===== RIGHT ICONS ===== */}
//       <div className="header-icons">
//         <Link to="/wishlist" className="icon">
//           <FaHeart />
//           {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
//         </Link>

//         <Link to="/cart" className="icon">
//           <FaShoppingCart />
//           {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
//         </Link>

//         {!isLoggedIn ? (
//           <Link to="/login" className="icon">
//             <FaSignInAlt />
//           </Link>
//         ) : (
//           <div className="profile-dropdown">
//             <button className="profile-btn" onClick={() => setOpenProfile(!openProfile)}>
//               <FaUser />
//             </button>

//             {openProfile && (
//               <div className="profile-menu">
//                 <Link to="/profile">My Profile</Link>
//                 <Link to="/myorders">My Orders</Link>
//                 <button onClick={handleLogout}>Logout</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import "./Header.css";
// import { AuthContext } from "../../Pages/Auth/Authcontext";

// const Header = () => {
//   const { isLoggedIn } = useContext(AuthContext);

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [productOpen, setProductOpen] = useState(false);
//   const [aboutOpen, setAboutOpen] = useState(false);

//   return (
//     <header className="header">
//       {/* LOGO */}
//       <div className="logo">🐶 Pet Food Shop</div>

//       {/* HAMBURGER */}
//       <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </div>

//       {/* NAV */}
//       <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
//         <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

//         {/* PRODUCTS */}
//         <div
//           className="dropdown"
//           onMouseEnter={() => setProductOpen(true)}
//           onMouseLeave={() => setProductOpen(false)}
//         >
//           <button
//             className="dropdown-btn"
//             onClick={() => setProductOpen(!productOpen)}
//           >
//             Products
//           </button>

//           {productOpen && (
//             <div className="products-dropdown-menu">
//     <Link to="/products">All Products</Link>
//     <Link to="/products/category/cat">Cat</Link>
//     <Link to="/products/category/dog">Dog</Link>
//     <Link to="/products/category/puppy">Puppy</Link>
//     <Link to="/products/category/accessories">Accessories</Link>
//     <Link to="/products/category/toys">Toys</Link>
//   </div>
//           )}
//         </div>

//         {/* ABOUT */}
//         <div
//           className="dropdown"
//           onMouseEnter={() => setAboutOpen(true)}
//           onMouseLeave={() => setAboutOpen(false)}
//         >
//           <button
//             className="dropdown-btn"
//             onClick={() => setAboutOpen(!aboutOpen)}
//           >
//             About Us
//           </button>

//           {aboutOpen && (
//             <div className="products-dropdown-menu">
//               <Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link>
//               <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
//             </div>
//           )}
//         </div>

//         <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;

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

        const wishRes = await axios.get(
          "http://localhost:5000/api/wishlist/count",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCartCount(cartRes.data.count || 0);
        setWishlistCount(wishRes.data.count || 0);
      } catch (err) {
        console.error("Header count error:", err);
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

        {/* PRODUCTS DROPDOWN */}
        <div
          className="dropdown"
          onMouseEnter={() => setProductOpen(true)}
          onMouseLeave={() => setProductOpen(false)}
        >
          <button className="dropdown-btn">Products</button>

          {productOpen && (
            <div className="products-dropdown-menu">
              <Link to="/products" onClick={() => setMenuOpen(false)}>All</Link>
              <Link to="/products/category/cat">Cat</Link>
              <Link to="/products/category/dog">Dog</Link>
              <Link to="/products/category/puppy">Puppy</Link>
              <Link to="/products/category/accessories">Accessories</Link>
              <Link to="/products/category/toys">Toys</Link>
            </div>
          )}
        </div>

        {/* ABOUT DROPDOWN */}
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
        {/* WISHLIST */}
        <Link to="/wishlist" className="icon-box">
          <FaHeart />
          {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
        </Link>

        {/* CART */}
        <Link to="/cart" className="icon-box">
          <FaShoppingCart />
          {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
        </Link>

        {/* LOGIN / PROFILE */}
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
                <Link to="/profile">My Profile</Link>
                <Link to="/myorders">My Orders</Link>
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
