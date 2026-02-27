import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeroHome.css";

const HeroHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.welcomeUser) {
      alert(`Welcome ${location.state.welcomeUser} 🎉`);
    }
  }, [location.state]);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(searchTerm)}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.slice(0, 5)))
        .catch((err) => console.error("Suggestion error:", err));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // Navigates to the correct route defined in your App.js
      navigate(`/productSearch?search=${encodeURIComponent(searchTerm)}`);
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
          <div className="search-bar-mini">

            <div className="search-input-wrapper">
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
                    <li key={item.product_id} onClick={() => {
                      navigate(`/productSearch?search=${encodeURIComponent(item.product_name)}`);
                      setSuggestions([]);
                    }}>
                      <span className="suggestion-name">{item.product_name}</span>

                      <div className="suggestion-meta">
                        {item.category_name && (
                          <span className="badge">{item.category_name}</span>
                        )}
                        {item.brand_name && (
                          <span className="badge">{item.brand_name}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

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