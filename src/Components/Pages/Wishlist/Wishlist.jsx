import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(res.data);
    } catch (err) {
      console.error("Wishlist fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          product_id: item.product_id,
          qty: 1,
          price: item.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Added to cart 🛒");
    } catch {
      alert("Add to cart failed");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(wishlist.filter(w => w.wishlist_id !== id));
    } catch {
      alert("Remove failed");
    }
  };

  if (loading) return <p>Loading wishlist...</p>;

  return (
    <div className="wishlist-container">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div className="wishlist-card" key={item.wishlist_id}>
              <img
                src={`http://localhost:5000/${item.image_url}`}
                alt={item.name}
                onClick={() => navigate(`/product/${item.product_id}`)}
              />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
              <button onClick={() => removeFromWishlist(item.wishlist_id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;