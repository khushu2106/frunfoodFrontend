import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HeroHome.css";

const HeroHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(
        `http://localhost:5000/api/products/search?q=${searchTerm}`
      )
        .then((res) => res.json())
        .then((data) => setSuggestions(data.slice(0, 5)))
        .catch((err) => console.error(err));
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);


  // 🔎 Search button / Enter key
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
          <div className="welcome-tag">✨ Welcome to Pet Paradise</div>
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
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((item) => (
                  <li
                    key={item.product_id}
                    onClick={() => {
                      navigate(`/products?search=${item.product_name}`);
                      setSearchTerm(item.product_name);
                      setSuggestions([]);
                    }}
                  >
                    <span className="suggestion-name">{item.product_name}</span>
                    <span className="badge">{item.category_name}</span>
                  </li>
                ))}
              </ul>
            )}

            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="hero-home-right">
          <div className="main-image-circle">
            <img
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop"
              alt="Pet owner with dog"
              className="floating-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
