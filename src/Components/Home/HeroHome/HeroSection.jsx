import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="pet-hero">
      <div className="hero-container">
        {/* Left Side: Content */}
        <div className="hero-content">
          <div className="badge">Naye Products Aa Gaye Hain! 🐾</div>
          <h1 className="hero-title">
            Aapke <span className="highlight">Best Friend</span> Ke Liye Sabse Behtareen.
          </h1>
          <p className="hero-subtitle">
            Premium khana, mazboot khilone aur aaramdayak bistar—kyunki aapka pet sirf ek janwar nahi, ghar ka sadasya hai.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary">Shop Now →</button>
            <button className="btn-secondary">Explore Categories</button>
          </div>

          <div className="trust-badges">
            <div className="rating">⭐⭐⭐⭐⭐ 4.9/5 Rating</div>
            <div className="divider"></div>
            <div className="vet-approved">✅ Vet-Approved Products</div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hero-image-wrapper">
          <div className="image-card">
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop" 
              alt="Happy Dog" 
            />
          </div>
          {/* Floating Badge */}
          <div className="floating-badge">
            <div className="badge-icon">❤️</div>
            <div>
              <p className="badge-text-top">Loved by</p>
              <p className="badge-text-bottom">12k+ Pets</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;