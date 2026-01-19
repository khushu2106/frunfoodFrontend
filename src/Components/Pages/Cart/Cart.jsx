import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../../Home/Products/ProductList";
import Offers from "../../Home/Offers/Offers";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user_id = 1;

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${user_id}`);
      setCartItems(res.data);
    } catch (error) {
      console.error("Cart Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQty = async (product_id, price) => {
    await axios.post("http://localhost:5000/api/cart/add", {
      user_id,
      product_id,
      qty: 1,
      price
    });
    fetchCart();
  };

  const decreaseQty = async (product_id, price) => {
    await axios.post("http://localhost:5000/api/cart/add", {
      user_id,
      product_id,
      qty: -1,
      price
    });
    fetchCart();
  };

  const removeItem = async (product_id) => {
    await axios.delete(`http://localhost:5000/api/cart/${user_id}/${product_id}`);
    fetchCart();
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <>
      <div className="cart-page">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map(item => (
                <div className="cart-item" key={item.cart_id}>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <div className="quantity">
                      <button onClick={() => decreaseQty(item.product_id, item.price)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.product_id, item.price)}>+</button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.product_id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <p>Total Items: {cartItems.length}</p>
              <p className="total">Total: ₹{totalPrice}</p>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>

      <ProductList />
      <Offers />
    </>
  );
};

export default Cart;
