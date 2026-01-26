import "./Checkout.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.totalAmount || 0;

  const cgst = totalAmount * 0.09;
  const sgst = totalAmount * 0.09;
  // const shipping = 50;
  const grandTotal = totalAmount + cgst + sgst;

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      user_id: 1,
      total_amount: totalAmount,
      cgst,
      sgst,
      // shipping_charge: shipping,
      payment_mode: form.payment,
      payment_status: form.payment === "COD" ? "pending" : "paid",
      transaction_id: form.payment === "COD" ? null : form.transaction_id,
      grand_total: grandTotal
    };


    try {
      const res = await axios.post("http://localhost:5000/api/sales", orderData);
      console.log(res.data.sales_id)
      alert("Order Placed Succesfull and email send ");
      navigate("/")
    } catch (err) {
      console.log("Axios Error:", err.response?.data || err.message);
      alert("Order Failed");
    }
};

return (
  <div className="checkout-container">
    <h2>Checkout</h2>

    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="section">
        <h3>Delivery Address</h3>

        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
        <textarea name="address" placeholder="Full Address" rows="3" required onChange={handleChange} />

        <div className="row">
          <input type="text" name="city" placeholder="City" required onChange={handleChange} />
          <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} />
        </div>
      </div>

      <div className="section">
        <h3>Payment Method</h3>

        <label>
          <input type="radio" name="payment" value="COD" checked={form.payment === "COD"} onChange={handleChange} />
          Cash on Delivery
        </label>

        <label>
          <input type="radio" name="payment" value="UPI" onChange={handleChange} />
          Online Payment
        </label>
        {form.payment !== "COD" && (
          <div className="online-payment-section">
            <input
              type="text"
              name="transaction_id"
              placeholder="Transaction ID"
              required
              onChange={handleChange}
            />
          </div>
        )}

      </div>

      <div className="section summary">
        <h3>Order Summary</h3>
        <p>Items Total: ₹{totalAmount}</p>
        <p>CGST (9%): ₹{cgst.toFixed(2)}</p>
        <p>SGST (9%): ₹{sgst.toFixed(2)}</p>
        {/* <p>Shipping: ₹{shipping}</p> */}
        <hr />
        <h4>Grand Total: ₹{grandTotal.toFixed(2)}</h4>
      </div>

      <button type="submit" className="place-order-btn">
        Place Order
      </button>
    </form>
  </div>
);
}

export default Checkout;
