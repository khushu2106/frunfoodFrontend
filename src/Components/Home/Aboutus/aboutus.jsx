import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <section className="about-header">
        <h1>Dedicated to Your <span className="text-orange">Pet's Happiness</span></h1>
        <p>Hum sirf products nahi bechte, hum ek aisi duniya bana rahe hain jahan har pet khush aur swasth rahe.</p>
      </section>

      {/* Story Section */}
      <section className="about-story-container">
        <div className="story-content">
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800" 
              alt="Owner with pets" 
            />
          </div>
          <div className="story-text">
            <span className="subtitle">Hamaari Kahani</span>
            <h2>Founded by Pet Lovers, <br /> For Pet Lovers.</h2>
            <p>
              Paws & Play ki shuruat 2015 mein hui thi ek chhote se sapne ke saath—ki har pet owner ko behtareen quality ke products ek hi jagah mil sakein. 
            </p>
            <p>
              Aaj hum hazaron families ka hissa hain, aur hamara maksad wahi hai: Aapke best friend ko woh sab dena jo unke liye sabse behtar ho.
            </p>
            <div className="about-stats">
              <div className="stat-box">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-box">
                <h3>50k+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <h2 className="values-title">Why Choose Us?</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3>Pet-First Approach</h3>
            <p>Hum wahi bechte hain jo hum apne khud ke pets ke liye use karte hain.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">✅</div>
            <h3>Quality Verified</h3>
            <p>Hamara har product vetenarians aur experts dwara test kiya gaya hai.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🚚</div>
            <h3>Fast & Care</h3>
            <p>Aapka order surakshit aur jaldi aap tak pahunchane ki zimmedari hamari.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;