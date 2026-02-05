// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HeroHome.css';
// import axios from 'axios';

// const HeroHome = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = async (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     if (value.length > 0) {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/suggestions?q=${value}`);
//         setSuggestions(res.data);
//       }
//       catch (err) {
//         console.error(err);
//       }
//     }
//     else {
//       setSuggestions()
//     }
//   }
//   const handleSearch = () => {
//     if (searchTerm.trim() !== "") {
//       navigate(`/products?search=${searchTerm}`);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   }
//   return (
//     <div className="hero-home-wrapper">
//       <div className="hero-home-container">
//         {/* Left Side: Content */}
//         <div className="hero-home-left">
//           <div className="welcome-tag">
//             <span className="sparkle">✨</span> Welcome to Pet Paradise
//           </div>
//           <h1 className="main-display-title">
//             The Best Care For Your <br />
//             <span className="accent-text">Furry Family</span>
//           </h1>
//           <p className="main-subtext">
//             Premium supplies, expert grooming, and a community that loves pets
//             as much as you do. Everything you need, all in one place.
//           </p>

//           <div className="search-bar-mini">
//             <input
//               type="text"
//               placeholder="Search ..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//             {suggestions.length > 0 && (
//               <ul className='suggestions-list'>
//                 {suggestions.map((item, index) =>(
//                   <li key={index} onClick={() =>{
//                     setSearchTerm(item.category_name);
//                     setSuggestions();
//                     navigate(`/products?search=${item.category_name}`);
//                   }}>
//                       {item.category_name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <button className="search-btn" onClick={handleSearch}>Search</button>
//           </div>

//           <div className="quick-stats">
//             <div className="stat-item">
//               <strong>500+</strong>
//               <span>Products</span>
//             </div>
//             <div className="stat-line"></div>
//             <div className="stat-item">
//               <strong>24/7</strong>
//               <span>Support</span>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Visual Section */}
//         <div className="hero-home-right">
//           <div className="main-image-circle">
//             <img
//               src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop"
//               alt="Pet owner with dog"
//               className="floating-img"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroHome;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroHome.css";
import axios from "axios";

const HeroHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000";

  /* 🔍 SEARCH WHILE TYPING */
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/search?q=${value}`
        );
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSuggestions([]);
    }
  };

  /* 🔎 SEARCH BUTTON / ENTER */
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${searchTerm}`);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="hero-home-wrapper">
      <div className="hero-home-container">
        <div className="hero-home-left">
          <div className="welcome-tag">
            ✨ Welcome to Pet Paradise
          </div>

          <h1 className="main-display-title">
            The Best Care For Your <br />
            <span className="accent-text">Furry Family</span>
          </h1>

          <p className="main-subtext">
            Premium supplies, expert grooming, and a community that loves pets.
          </p>

          {/* 🔍 SEARCH BAR */}
          <div className="search-bar-mini">
            <input
              type="text"
              placeholder="Search products, categories..."
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(`/products?search=${item.name}`);
                      setSearchTerm(item.name);
                      setSuggestions([]);
                    }}
                  >
                    <span className="suggestion-name">
                      {item.name}
                    </span>
                    <span className={`badge ${item.type}`}>
                      {item.type}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="quick-stats">
            <div className="stat-item">
              <strong>500+</strong>
              <span>Products</span>
            </div>
            <div className="stat-line"></div>
            <div className="stat-item">
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>

        <div className="hero-home-right">
          <div className="main-image-circle">
            <img
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7"
              alt="Pet owner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
