import { useState } from "react";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Dog Food Premium",
      price: 799,
      image: "https://via.placeholder.com/120",
    },
    {
      id: 2,
      name: "Cat Toy Ball",
      price: 299,
      image: "https://via.placeholder.com/120",
    },
  ]);

  const removeFromWishlist = (id) => {
    const updatedList = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedList);
  };

  const addToCart = (item) => {
    alert(`${item.name} added to cart`);
    // TODO: Cart API / Context
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="empty">Your wishlist is empty 😔</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <h4>{item.name}</h4>
              <p className="price">₹{item.price}</p>

              <div className="actions">
                <button
                  className="btn-cart"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>

                <button
                  className="btn-remove"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
