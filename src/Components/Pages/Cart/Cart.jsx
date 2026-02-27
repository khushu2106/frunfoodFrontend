import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { toast, Toaster } from "sonner";
import "./Cart.css";

const BASE_URL = "http://localhost:5000";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    setLoading(true);

    if (token) {
      try {
        const res = await axios.get(`${BASE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ VALIDATE STOCK AFTER FETCH
        const validatedCart = res.data.map(item => {
          if (item.qty > item.stock) {
            return { ...item, qty: item.stock };
          }
          return item;
        });

        setCartItems(validatedCart);

      } catch (error) {
        console.error("Cart Fetch Error:", error);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

      // ✅ Guest validation also needed
      const validatedCart = guestCart.map(item => {
        if (item.qty > item.stock) {
          return { ...item, qty: item.stock };
        }
        return item;
      });

      setCartItems(validatedCart);
      setLoading(false);
    }
  };

  // 🔄 Load cart on mount and when token changes
  useEffect(() => {
    fetchCart();
  }, [token]);

  /* ================= UPDATE QTY ================= */
  const updateQty = async (product_id, price, change) => {
    const item = cartItems.find(i => i.product_id === product_id);
    if (!item) return;

    const newQty = item.qty + change;

    if (newQty < 1) return;

    if (newQty > item.stock) {
      // toast.warning(`Only ${item.stock} items available`);
      alert(`Only ${item.stock} items available`);
      return;
    }

    // ✅ Instant UI update (NO reload feel)
    const updatedCart = cartItems.map(i =>
      i.product_id === product_id ? { ...i, qty: newQty } : i
    );
    setCartItems(updatedCart);

    // 🔄 Sync backend silently
    if (token) {
      try {
        await axios.post(`${BASE_URL}/api/cart/add`,
          { product_id, qty: change, price },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        toast.error("Sync failed");
      }
    } else {
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (product_id) => {
    try {
      if (token) {
        await axios.delete(`${BASE_URL}/api/cart/${product_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Guest remove logic
        let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        guestCart = guestCart.filter(item => item.product_id !== product_id);
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
      }

      setCartItems(prev => prev.filter(item => item.product_id !== product_id));
      alert("Item removed");
      window.location.reload();
    } catch (err) {
      alert("Could not remove item");
    }
  };

  /* ================= TOTAL ================= */
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.qty,
    0
  );

  if (loading) return <div className="loader">Loading your cart...</div>;

  return (
    <div className="cart-page-wrapper">
      <Toaster position="bottom-right" richColors />

      <div className="cart-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={20} /> Continue Shopping
        </button>
        <h2>Shopping Cart ({cartItems.length})</h2>
      </div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="empty-cart-state"
        >
          <ShoppingCart size={80} strokeWidth={1} />
          <p>Your cart feels a bit light...</p>
          <button onClick={() => navigate("/")}>Browse Products</button>
        </motion.div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  layout
                  key={item.product_id} // ✅ Changed from cart_id to product_id
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="cart-card"
                >
                  <div className="item-info">
                    <div
                      className="item-img"
                      onClick={() => navigate(`/product/${item.product_id}`)}
                    >
                      <img
                        className="image"
                        src={item.image_url?.startsWith('http') ? item.image_url : `${BASE_URL}/${item.image_url}`}
                        alt={item.name}
                        onError={(e) => { e.target.src = "/no-image.png"; }}
                      />
                    </div>

                    <div>
                      <h4>{item.name}</h4>
                      <p className="price-tag">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="item-actions">
                    <div className="qty-delete-row">
                      <div className="qty-control">
                        <button
                          onClick={() => updateQty(item.product_id, item.price, -1)}
                          disabled={item.qty <= 1}
                        >
                          <Minus size={16} />
                        </button>

                        <span>{item.qty}</span>

                        <button
                          onClick={() => updateQty(item.product_id, item.price, 1)}
                          disabled={item.qty >= item.stock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        className="delete-icon"
                        onClick={() => removeItem(item.product_id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free">FREE</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Grand Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <button
              className="checkout-now"
              onClick={() =>
                navigate("/checkout", {
                  state: { totalAmount: totalPrice, cartItems },
                })
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;