import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { toast, Toaster } from "sonner"; 
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const token = localStorage.getItem("userToken");


  const fetchWishlist = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(res.data);
    } catch (error) {
      console.error("Wishlist fetch error", error);
      toast.error("Wishlist load nahi ho saki");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToCart = async (item) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        product_id: item.product_id,
        qty: 1,
        price: item.price
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(res.data.message || "Cart mein add ho gaya!");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Cart mein add nahi ho paya");
    }
  };

  const removeFromWishlist = async (wishlist_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${wishlist_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(wishlist.filter(item => item.id !== wishlist_id));
      toast.success("Wishlist se remove kar diya gaya");
    } catch (error) {
      console.error("Remove wishlist error:", error);
      toast.error("Remove karne mein error aayi");
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
            <div className="wishlist-card" key={item.id}>
              <div 
                className="img-container" 
                onClick={() => navigate(`/product/${item.product_id}`)} 
                style={{ cursor: "pointer" }}
              >
                 <img src={`http://localhost:5000/${item.image_url}`} alt={item.name} title="View Details" />
              </div>

              <h4 
                onClick={() => navigate(`/product/${item.product_id}`)} 
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </h4>

              <p className="price">₹{item.price}</p>

              <div className="actions">
                <button className="btn-cart" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
                <button className="btn-remove" onClick={() => removeFromWishlist(item.id)}>
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