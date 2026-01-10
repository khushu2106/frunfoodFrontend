import React from 'react';
import './HeroHome.css';

const HeroHome = () => {
  return (
    <div className="hero-home-wrapper">
      <div className="hero-home-container">
        {/* Left Side: Content */}
        <div className="hero-home-left">
          <div className="welcome-tag">
            <span className="sparkle">✨</span> Welcome to Pet Paradise
          </div>
          <h1 className="main-display-title">
            The Best Care For Your <br />
            <span className="accent-text">Furry Family</span>
          </h1>
          <p className="main-subtext">
            Premium supplies, expert grooming, and a community that loves pets 
            as much as you do. Everything you need, all in one place.
          </p>
          
          <div className="search-bar-mini">
            <input type="text" placeholder="Search for food, toys, or beds..." />
            <button className="search-btn">Search</button>
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

        {/* Right Side: Visual Section */}
        <div className="hero-home-right">
          <div className="main-image-circle">
            <img 
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop" 
              alt="Pet owner with dog" 
              className="floating-img"
            />
          </div>
          {/* Floating Element 1 */}
          <div className="floating-card-home pet-count">
            <span className="icon">🐶</span>
            <div>
              <p className="card-num">2k+</p>
              <p className="card-label">Pets Adopted</p>
            </div>
          </div>
          {/* Floating Element 2 */}
          <div className="floating-card-home discount-tag">
            <span className="icon">🏷️</span>
            <p>Flat 20% Off</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHome;