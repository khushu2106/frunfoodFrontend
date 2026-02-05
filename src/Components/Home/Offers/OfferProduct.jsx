import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductList from "../Products/ProductList";
import "./Offers.css";

const OFFER_CONFIG = {
  clearance: {
    title: "Clearance Sale 🔥",
    subtitle: "Grab the best deals before they’re gone!",
    badge: "Up to 90% OFF",
    color: "#ff6b00",
  },
  festival: {
    title: "Festival Specials 🎉",
    subtitle: "Celebrate with exclusive pet deals",
    badge: "Limited Time",
    color: "#7b61ff",
  },
  "black-friday": {
    title: "Black Friday Deals 🖤",
    subtitle: "Crazy discounts you can’t ignore",
    badge: "Hot Deals",
    color: "#111",
  },
};

const OfferProducts = () => {
  const { offerType } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const offer = OFFER_CONFIG[offerType];

  useEffect(() => {
    setLoading(false); // backend ke time yahan API call aayega
  }, [offerType]);

  if (!offer) {
    return (
      <div className="offer-not-found">
        <h2>Offer not found 😕</h2>
        <button onClick={() => navigate("/offers")}>
          Back to Offers
        </button>
      </div>
    );
  }

  return (
    <div className="offer-products-page">
      {/* 🔥 Offer Header */}
      <div
        className="offer-header"
        style={{ background: offer.color }}
      >
        <span className="offer-badge">{offer.badge}</span>
        <h1>{offer.title}</h1>
        <p>{offer.subtitle}</p>

        <button
          className="back-btn"
          onClick={() => navigate("/offers")}
        >
          ← Back to Offers
        </button>
      </div>

      {/* 🛍️ Product List */}
      {loading ? (
        <p className="loading-text">Loading amazing deals...</p>
      ) : (
        <ProductList offerType={offerType} />
      )}
    </div>
  );
};

export default OfferProducts;
