import React, { useEffect, useState } from "react";
import "./Offers.css";

const Offers = () => {

  // 🔹 Offers data state
  // Future me yaha API se data aayega
  const [offers, setOffers] = useState([]);

  // 🔹 Page load hone par API call
  useEffect(() => {

    // ===============================
    // 🔥 API CALL HERE
    // Example:
    // fetch("https://api.yoursite.com/offers")
    //   .then(res => res.json())
    //   .then(data => setOffers(data));
    // ===============================

    // Abhi ke liye dummy data
    setOffers([
      {
        id: 1,
        title: "Clearance Sale",
        discount: "Up to 90% OFF",
        desc: "Stock up before you miss out!",
        image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        type: "big"
      },
      {
        id: 2,
        title: "Get 10% OFF",
        desc: "To brighten a loved one's day.",
        image: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
        type: "small"
      },
      {
        id: 3,
        title: "Black Friday",
        desc: "Get 10% OFF",
        image: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
        type: "small"
      }
    ]);
  }, []);

  return (
    <div className="offers-page">

      <div className="offer-grid">

        {/* ================= BIG OFFER CARD ================= */}
        {offers
          .filter(item => item.type === "big")
          .map(item => (
            <div key={item.id} className="offer-card big yellow">

              {/* 🔹 Discount text (API se aayega) */}
              <span className="badge">{item.discount}</span>

              {/* 🔹 Offer title */}
              <h2>{item.title}</h2>

              {/* 🔹 Offer description */}
              <p>{item.desc}</p>

              {/* 🔹 Button click par product listing open hogi */}
              {/* API se category ya offer id pass kar sakte ho */}
              <button>Shop Now</button>

              {/* 🔹 Offer image */}
              <img src={item.image} alt="offer" className="offer-img left" />
            </div>
          ))}

        {/* ================= RIGHT SIDE OFFERS ================= */}
        <div className="right-offers">

          {offers
            .filter(item => item.type === "small")
            .map(item => (
              <div key={item.id} className="offer-card light">

                <div>
                  {/* 🔹 Title from API */}
                  <h3>{item.title}</h3>

                  {/* 🔹 Description from API */}
                  <p>{item.desc}</p>

                  {/* 🔹 OnClick -> redirect to offers/products */}
                  <button className="dark-btn">Shop Now</button>
                </div>

                {/* 🔹 Image from API */}
                <img src={item.image} alt="offer" />
              </div>
            ))}

        </div>
      </div>
    </div>
  );
};

export default Offers;
