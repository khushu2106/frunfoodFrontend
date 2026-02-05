import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Offers.css";
import FAQ from "../FAQ/FAQ";


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

  const goToProducts = () => {
    navigate("/products"); // ProductList.jsx ka route
  };

  return (
    <>
    <div className="offers-page">
      <div className="offer-grid">

        {offers.filter(i => i.type === "big").map(item => (
          <div key={item.id} className="offer-card big yellow">
            <span className="badge">{item.discount}</span>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>

            <button onClick={goToProducts}>Shop Now</button>

            <img src={item.image} alt="offer" className="offer-img left" />
          </div>
        ))}

        <div className="right-offers">
          {offers.filter(i => i.type === "small").map(item => (
            <div key={item.id} className="offer-card light">
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <button className="dark-btn" onClick={goToProducts}>
                  Shop Now
                </button>
              </div>
              <img src={item.image} alt="offer" />
            </div>
          ))}
        </div>

      </div>
    
    </div>
          <FAQ />

    </>
  );
};

export default Offers;
