import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";
import "./Wishlist.css";

const BASE_URL = "http://localhost:5000";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = useCallback(async () => {
    if (!token) {
      setLoading(false);
      toast.error("Please login to view your wishlist");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data);
    } catch (error) {
      console.error("Wishlist fetch error", error);
      toast.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  /* ================= ADD TO CART ================= */
  const addToCart = async (item) => {
    if (!token) {
      toast.error("Please login to add products to cart");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          product_id: item.product_id,
          qty: 1,
          price: item.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Added to cart!");
      // window.location.reload() ki jagah bina page reload kiye notify kar rahe hain
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Error adding product to cart");
    }
  };

  /* ================= REMOVE FROM WISHLIST ================= */
  const removeFromWishlist = async (wishlist_id) => {
    if (!token) return;

    try {
      await axios.delete(`${BASE_URL}/api/wishlist/${wishlist_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Page reload hone ki bajaye local state update karke UI se turant item hata do
      setWishlist((prev) =>
        prev.filter((item) => item.wishlist_id !== wishlist_id)
      );

      toast.success("Product removed successfully!");
    } catch (error) {
      console.error("Remove wishlist error:", error);
      toast.error("Error deleting the product");
    }
  };

  if (loading) return <div className="loader">Loading Wishlist...</div>;

  return (
    <div className="wishlist-container">
      <Toaster position="top-center" richColors />
      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <p className="empty">Your wishlist is empty 😔</p>
          <button onClick={() => navigate("/")}>Shop Now</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.wishlist_id}>
              <div
                className="img-container"
                onClick={() => navigate(`/product/${item.product_id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    item.image_url
                      ? `${BASE_URL}/${item.image_url}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.name}
                  title="View Details"
                />
              </div>

              <h4
                onClick={() => navigate(`/product/${item.product_id}`)}
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </h4>

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
                  onClick={() => removeFromWishlist(item.wishlist_id)}
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