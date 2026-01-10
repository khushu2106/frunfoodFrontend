import { useState } from "react";
import "./Payment.css";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePlaceOrder = () => {
    alert(`Payment Method Selected: ${paymentMethod}`);
    // TODO: API call / Payment Gateway integration
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Checkout 💳</h2>

        {/* Order Summary */}
        <div className="order-summary">
          <h4>Order Summary</h4>
          <p>Items Total: ₹1,200</p>
          <p>Delivery Charges: ₹50</p>
          <hr />
          <p className="total">Total: ₹1,250</p>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <h4>Select Payment Method</h4>

          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit / Debit Card
          </label>

          {paymentMethod === "card" && (
            <div className="card-details">
              <input type="text" placeholder="Card Number" />
              <div className="row">
                <input type="text" placeholder="MM/YY" />
                <input type="text" placeholder="CVV" />
              </div>
            </div>
          )}

          <label>
            <input
              type="radio"
              name="payment"
              value="upi"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI (GPay / PhonePe / Paytm)
          </label>

          {paymentMethod === "upi" && (
            <input type="text" placeholder="Enter UPI ID" />
          )}

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        <button className="btn-pay" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
