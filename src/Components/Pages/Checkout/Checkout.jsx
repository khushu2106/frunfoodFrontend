import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = location.state?.totalAmount || 0;
  const cartItems = location.state?.cartItems || [];
  const isFromCart = cartItems && cartItems.length > 0;

  const cgst = +(totalAmount * 0.09).toFixed(2);
  const sgst = +(totalAmount * 0.09).toFixed(2);
  const grandTotal = +(totalAmount + cgst + sgst).toFixed(2);

  const token = localStorage.getItem("userToken");
  let userId = null;
  let userEmail = "customer@gmail.com";

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id || payload.userId;
      if (payload.email) userEmail = payload.email;
    } catch (e) {
      console.error("Token parsing error", e);
      navigate("/login");
    }
  } else {
    navigate("/login");
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

  const submitFinalOrder = async (transactionId = "") => {
    setIsSubmitting(true);

    // ✅ Yeh logic check karega ki Cart se items aaye hain ya Direct Purchase se
    let finalItems = [];

    if (cartItems && cartItems.length > 0) {
      // Agar Cart se aaye hain
      finalItems = cartItems.map(item => ({
        product_id: item.product_id || item.id,
        qty: item.quantity || item.qty || 1,
        price: item.price
      }));
    } else if (location.state?.product) {
      // ✅ AGAR DIRECT PURCHASE HAI (Single Product)
      const p = location.state.product;
      finalItems = [{
        product_id: p.product_id || p.id,
        qty: location.state.qty || 1,
        price: p.price
      }];
    }

    // Validation: Agar phir bhi items nahi mile
    if (finalItems.length === 0) {
      alert("No products found to checkout!");
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      user_id: userId,
      total_amount: totalAmount,
      CGST: cgst,
      SGST: sgst,
      shipping_charge: 0,
      S_date: new Date().toISOString().split("T")[0],
      delivery_add1: form.address,
      delivery_add2: `${form.city}, ${form.pincode}`,
      Area_id: 1,
      IsCancel: 0,
      Payment_mode: form.payment,
      payment_status: form.payment === "COD" ? "pending" : "paid",
      transaction_id: transactionId,
      is_cart_checkout: isFromCart,
      customer: {
        name: form.name,
        email: userEmail,
        phone: form.mobile,
        address: `${form.address}, ${form.city} - ${form.pincode}`
      },
      items: finalItems, 
      tax: +(cgst + sgst).toFixed(2),
      total: grandTotal
    };

    try {
      const res = await axios.post("http://localhost:5000/api/sales", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Order placed successfully!");
      // if (res.data.invoice) window.open(`http://localhost:5000/api/sales/invoice/${res.data.invoice}`);
      navigate("/");
    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      alert("Order Failed: " + (err.response?.data?.error || "Unknown error"));
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (form.payment === "UPI") handleRazorpayPayment();
    else submitFinalOrder();
  };

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Check your internet connection.");
      return;
    }

    try {
      const orderResponse = await axios.post(
        "http://localhost:5000/api/payment/add-payment",
        { amount: Math.round(grandTotal) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = orderResponse.data;

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
      console.error("Payment Error:", err.response?.data || err.message);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="section">
          <h3>Delivery Address</h3>
          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            maxLength="10"
            pattern="[0-9]{10}"
            inputMode="numeric"
            onChange={handleChange}
            required
          />
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

        <button type="submit" className={`place-order-btn ${isSubmitting ? "disabled" : ""}`} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : form.payment === "UPI" ? "Pay Now" : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;