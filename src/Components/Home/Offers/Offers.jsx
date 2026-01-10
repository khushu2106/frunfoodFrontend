import { useState } from "react";
import "./Offers.css";

const Offers = () => {
  // Dummy offer products (API se aayega)
  const [offers] = useState([
    {
      id: 1,
      name: "Premium Dog Food",
      oldPrice: 1200,
      newPrice: 899,
      discount: 25,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Cat Scratching Toy",
      oldPrice: 800,
      newPrice: 560,
      discount: 30,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Pet Shampoo",
      oldPrice: 450,
      newPrice: 349,
      discount: 22,
      image: "https://via.placeholder.com/200",
    },
  ]);

  const addToCart = (product) => {
    alert(`${product.name} added to cart`);
    // TODO: Cart logic
  };

  const addToWishlist = (product) => {
    alert(`${product.name} added to wishlist ❤️`);
    // TODO: Wishlist logic
  };

  return (
    <div className="offers-container">
      <h2>🔥 Hot Deals & Offers</h2>

      <div className="offers-grid">
        {offers.map((item) => (
          <div className="offer-card" key={item.id}>
            <div className="discount-badge">
              {item.discount}% OFF
            </div>

            <img src={item.image} alt={item.name} />

            <h4>{item.name}</h4>

            <div className="price-section">
              <span className="old-price">₹{item.oldPrice}</span>
              <span className="new-price">₹{item.newPrice}</span>
            </div>

            <div className="offer-actions">
              <button
                className="btn-cart"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>

              <button
                className="btn-wishlist"
                onClick={() => addToWishlist(item)}
              >
                ❤
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
