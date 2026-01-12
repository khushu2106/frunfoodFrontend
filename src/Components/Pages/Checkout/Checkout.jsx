import "./Checkout.css";
import { useState } from "react";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    console.log(form);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        {/* Address Section */}
        <div className="section">
          <h3>Delivery Address</h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            required
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            rows="3"
            required
            onChange={handleChange}
          />

          <div className="row">
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Payment Section */}
        <div className="section">
          <h3>Payment Method</h3>

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={form.payment === "cod"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="online"
              onChange={handleChange}
            />
            Online Payment
          </label>
        </div>

        {/* Order Summary */}
        <div className="section summary">
          <h3>Order Summary</h3>
          <p>Items Total: ₹1200</p>
          <p>Delivery Charge: ₹50</p>
          <hr />
          <h4>Total Amount: ₹1250</h4>
        </div>

        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
