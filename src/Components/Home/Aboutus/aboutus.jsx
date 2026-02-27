import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* Header Section */}
      <section className="about-header">
        <h1>Committed to Your Pet’s <span className="text-orange">Health & Happiness</span></h1>
        <p>
          We are more than just a pet product platform — we are dedicated to creating
          a trusted space where pets receive the care, comfort, and quality they deserve.
        </p>
      </section>

      {/* Story Section */}
      <section className="about-story-container">
        <div className="story-content">

          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800" 
              alt="Pet Care" 
            />
          </div>

          <div className="story-text">
            <span className="subtitle">Our Story</span>
            <h2>Built by Pet Lovers, For Pet Families</h2>

            <p>
              Our journey began with a simple vision — to provide pet owners with
              reliable and high-quality products through a single, convenient platform.
            </p>

            <p>
              Today, we are growing into a trusted pet-care destination that focuses
              on improving the daily lives of pets through safe, innovative, and
              carefully selected products.
            </p>

            {/* <div className="about-stats">
              <div className="stat-box">
                <h3>500+</h3>
                <p>Products Available</p>
              </div>
              <div className="stat-box">
                <h3>1000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat-box">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
            </div> */}

          </div>
        </div>
      </section>

      {/* Mission Section */}
      {/* <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify pet care by offering a reliable platform where
          pet owners can easily access essential products such as food, accessories,
          toys, and health-related items — without compromising on quality.
        </p>
      </section> */}

      {/* Values Section */}
      <section className="about-values">
        <h2 className="values-title">Why Choose Us?</h2>

        <div className="values-grid">

          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3>Pet-Centric Approach</h3>
            <p>
              Every product is selected with the well-being and safety of pets in mind.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">✔️</div>
            <h3>Quality Assurance</h3>
            <p>
              We ensure that only trusted and verified products are made available.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">🚚</div>
            <h3>Reliable Delivery</h3>
            <p>
              We are committed to delivering orders safely and on time.
            </p>
          </div>

          {/* <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Customer Commitment</h3>
            <p>
              We focus on building long-term trust through consistent support and service.
            </p>
          </div> */}

        </div>
      </section>

    </div>
  );
};

export default AboutUs;