import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { toast, Toaster } from "sonner";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  let user_id = null;

  if(token){
    try{
      const payload = JSON.parse(atob(token.split(".")[1]));
      user_id = payload.user_id || payload.id;
    }catch(e){
      console.error("Token error",e);
    }
  }

  const fetchCart = async () => {
    if (!user_id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${user_id}`);
      setCartItems(res.data);
    } catch (error) {
      console.error("Cart Fetch Error:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (product_id, price, change) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        user_id, product_id, qty: change, price
      });
      fetchCart();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const removeItem = async (product_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${user_id}/${product_id}`);
      toast.success("Item removed");
      fetchCart();
    } catch (err) {
      toast.error("Could not remove item");
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="empty-cart-state">
          <ShoppingCart size={80} strokeWidth={1} />
          <p>Your cart feels a bit light...</p>
          <button onClick={() => navigate("/")}>Browse Products</button>
        </motion.div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  layout
                  key={item.cart_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="cart-card"
                >
                  <div className="item-info">
                    <div className="item-img-placeholder">🛍️</div>
                    <div>
                      <h4>{item.name}</h4>
                      <p className="price-tag">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="item-actions">
                    <div className="qty-control">
                      <button onClick={() => updateQty(item.product_id, item.price, -1)} disabled={item.qty <= 1}>
                        <Minus size={16} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.product_id, item.price, 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="delete-icon" onClick={() => removeItem(item.product_id)}>
                      <Trash2 size={20} />
                    </button>
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
              onClick={() => navigate("/checkout", { state: { totalAmount: totalPrice, cartItems: cartItems } })}
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