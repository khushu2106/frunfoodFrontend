import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Offers.css";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setOffers([
      {
        id: 1,
        title: "Clearance Sale",
        discount: "Up to 90% OFF",
        desc: "Stock up before you miss out!",
        image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        type: 1,   // 🔥 offer type
        size: "big"
      },
      {
        id: 2,
        title: "Festival Offer",
        desc: "To brighten a loved one's day.",
        image: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
        type: 2,
        size: "small"
      },
      {
        id: 3,
        title: "Black Friday",
        desc: "Get exciting discounts",
        image: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
        type: 3,
        size: "small"
      }
    ]);
  }, []);

  // ✅ Redirect to OfferProducts page
  const goToOfferProducts = (offerType) => {
    navigate(`/offers/${offerType}`);
  };

  return (
    <div className="offers-page">
      <div className="offer-grid">

        {/* 🔥 BIG OFFER */}
        {offers
          .filter(o => o.size === "big")
          .map(item => (
            <div key={item.id} className="offer-card big yellow">
              <span className="badge">{item.discount}</span>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>

              <button onClick={() => goToOfferProducts(item.type)}>
                Shop Now
              </button>

              <img
                src={item.image}
                alt={item.title}
                className="offer-img left"
              />
            </div>
          ))}

        {/* 🔹 SMALL OFFERS */}
        <div className="right-offers">
          {offers
            .filter(o => o.size === "small")
            .map(item => (
              <div key={item.id} className="offer-card light">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>

                  <button
                    className="dark-btn"
                    onClick={() => goToOfferProducts(item.type)}
                  >
                    Shop Now
                  </button>
                </div>

                <img src={item.image} alt={item.title} />
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Offers;