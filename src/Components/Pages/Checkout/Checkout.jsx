import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get data from Cart; fallback to 0 if state is missing
  const totalAmount = location.state?.totalAmount || 0;
  const cartItems = location.state?.cartItems || []; // Assuming you pass items from cart
  
  const cgst = +(totalAmount * 0.09).toFixed(2);
  const sgst = +(totalAmount * 0.09).toFixed(2);
  const grandTotal = +(totalAmount + cgst + sgst).toFixed(2);

  const token = localStorage.getItem("userToken");
  let userId = null;
  let userEmail = "customer@gmail.com";

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id;
      userEmail = payload.email || userEmail;
    } catch (e) {
      console.error("Token parsing error", e);
    }
  }

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "Gujarat",
    pincode: "380001",
    payment: "COD",
    transaction_id: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- FINAL ORDER SUBMISSION ---
  const submitFinalOrder = async (transactionId = null) => {
    setIsSubmitting(true);

    const orderData = {
      user_id: userId,
      total_amount: totalAmount,
      SGST: sgst,
      CGST: cgst,
      shipping_charge: 0,
      S_date: new Date().toISOString().split("T")[0],
      delivery_add1: form.address,
      delivery_add2: `${form.city}, ${form.pincode}`,
      Area_id: 1,
      IsCancel: 0,
      Payment_mode: form.payment,
      payment_status: form.payment === "COD" ? "pending" : "paid",
      transaction_id: transactionId,

      // INVOICE DATA
      customer: {
        name: form.name,
        email: userEmail,
        phone: form.mobile,
        address: `${form.address}, ${form.city} - ${form.pincode}`
      },
      items: cartItems.length > 0 ? cartItems : [{ name: "General Items", quantity: 1, price: totalAmount }],
      tax: cgst + sgst,
      total: grandTotal
    };

    try {
      const res = await axios.post("http://localhost:5000/api/sales", orderData);
      alert("Order placed successfully!");

      if (res.data.invoice) {
        window.open(`http://localhost:5000/api/sales/invoice/${res.data.invoice}`);
      }
      navigate("/");
    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      alert("Order Failed: " + (err.response?.data?.error || "Unknown error"));
      setIsSubmitting(false);
    }
  };

  // --- HANDLER FOR FORM SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (form.payment === "UPI") {
      handleRazorpayPayment();
    } else {
      submitFinalOrder(null);
    }
  };

  // --- RAZORPAY LOGIC ---
  const handleRazorpayPayment = async () => {
    try {
      // 1. Create order on backend
      const response = await fetch('http://localhost:5000/api/payment/add-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal }) 
      });
      
      const order = await response.json();

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: "rzp_test_S9ljGtWRbBKAdB", 
        amount: order.amount,
        currency: "INR",
        name: "Pet Food Shop",
        description: "Order Payment",
        order_id: order.id, 
        handler: function (response) {
          submitFinalOrder(response.razorpay_payment_id);
        },
        prefill: {
          name: form.name,
          email: userEmail,
          contact: form.mobile
        },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Could not initiate payment.");
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
            <input type="text" name="city" value={form.city} readOnly />
            <input type="text" name="pincode" value={form.pincode} readOnly />
          </div>
        </div>

        <div className="section">
          <h3>Payment Method</h3>
          <label>
            <input type="radio" name="payment" value="COD" checked={form.payment === "COD"} onChange={handleChange} />
            Cash on Delivery
          </label>

          <label>
            <input type="radio" name="payment" value="UPI" checked={form.payment === "UPI"} onChange={handleChange} />
            Online Payment (Razorpay)
          </label>
        </div>

        <div className="section summary">
          <h3>Order Summary</h3>
          <p>Items Total: ₹{totalAmount}</p>
          <p>CGST (9%): ₹{cgst}</p>
          <p>SGST (9%): ₹{sgst}</p>
          <hr />
          <h4>Grand Total: ₹{grandTotal}</h4>
        </div>

        <button 
          type="submit" 
          className={`place-order-btn ${isSubmitting ? "disabled" : ""}`} 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : form.payment === "UPI" ? "Pay Now" : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;