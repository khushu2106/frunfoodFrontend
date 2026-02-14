import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  /* ================= DISCOUNT CALCULATION ================= */

  const calculatedItems = cartItems.map((item) => {
    const discountPercent = item.discount || 0;

    const discountedPrice =
      item.price - (item.price * discountPercent) / 100;

    return {
      ...item,
      discountedPrice: +discountedPrice.toFixed(2),
      itemTotal: discountedPrice * item.qty,
      originalTotal: item.price * item.qty,
      discountAmount:
        (item.price - discountedPrice) * item.qty,
    };
  });

  const originalTotal = calculatedItems.reduce(
    (sum, item) => sum + item.originalTotal,
    0
  );

  const totalDiscount = calculatedItems.reduce(
    (sum, item) => sum + item.discountAmount,
    0
  );

  const subtotal = calculatedItems.reduce(
    (sum, item) => sum + item.itemTotal,
    0
  );

  const cgst = +(subtotal * 0.09).toFixed(2);
  const sgst = +(subtotal * 0.09).toFixed(2);
  const grandTotal = +(subtotal + cgst + sgst).toFixed(2);

  /* ================= USER AUTH ================= */

  const token = localStorage.getItem("userToken");
  let userId = null;
  let userEmail = "customer@gmail.com";

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id || payload.userId;
      if (payload.email) userEmail = payload.email;
    } catch {
      navigate("/login");
    }
  } else {
    navigate("/login");
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "Gujarat",
    pincode: "380001",
    payment: "COD",
    transaction_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= FINAL ORDER SUBMIT ================= */

  const submitFinalOrder = async (transactionId = "") => {
    setIsSubmitting(true);
    setError("");

    const orderData = {
      user_id: userId,
      total_amount: subtotal,
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
      customer: {
        name: form.name,
        email: userEmail,
        phone: form.mobile,
        address: `${form.address}, ${form.city} - ${form.pincode}`,
      },
      items: calculatedItems,
      tax: +(cgst + sgst).toFixed(2),
      total: grandTotal,
      discount: totalDiscount,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/sales",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully 🎉");

      if (res.data.invoice) {
        window.open(
          `http://localhost:5000/api/sales/invoice/${res.data.invoice}`
        );
      }

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error || "Order failed. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  /* ================= FORM SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.mobile || !form.address) {
      setError("Please fill all delivery details");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setError("Enter valid 10 digit mobile number");
      return;
    }

    if (form.payment === "UPI") handleRazorpayPayment();
    else submitFinalOrder();
  };

  /* ================= RAZORPAY ================= */

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      setError("Payment service unavailable");
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
        handler: (response) => {
          submitFinalOrder(response.razorpay_payment_id);
        },
        prefill: {
          name: form.name,
          email: userEmail,
          contact: form.mobile,
        },
        theme: { color: "#583217" },
      };

      new window.Razorpay(options).open();
    } catch {
      setError("Payment failed. Try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {error && <div className="checkout-error">{error}</div>}

      <form className="checkout-form" onSubmit={handleSubmit}>
        {/* DELIVERY */}
        <div className="section">
          <h3>Delivery Address</h3>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
          <textarea
            name="address"
            placeholder="Full Address"
            rows="3"
            onChange={handleChange}
          />
          <div className="row">
            <input value={form.city} readOnly />
            <input value={form.pincode} readOnly />
          </div>
        </div>

        {/* PAYMENT */}
        <div className="section">
          <h3>Payment Method</h3>
          <label className="radio-box">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={form.payment === "COD"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
          <label className="radio-box">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={form.payment === "UPI"}
              onChange={handleChange}
            />
            Online Payment (UPI / Card)
          </label>
        </div>

        {/* ORDER SUMMARY */}
        
       {/* ORDER SUMMARY */}
<div className="section summary">
  <h3>Order Summary</h3>

  {calculatedItems.length === 0 ? (
    <p>No items found</p>
  ) : (
    <div className="order-items">
      {calculatedItems.map((item, index) => (
        <div className="order-item" key={index}>
          
          {/* PRODUCT IMAGE */}
          <img
            className="order-img"
            src={`http://localhost:5000/${item.image || item.image_url}`}
            alt={item.name}
          />

          <div className="order-item-details">
            {/* PRODUCT NAME */}
            <h4>{item.name}</h4>

            {/* DESCRIPTION */}
            <p className="desc">
              {item.description || "Premium quality pet product"}
            </p>

            {/* OFFER BADGE */}
            {item.discount > 0 && (
              <span className="offer-badge">
                {item.discount}% OFF
              </span>
            )}

            {/* PRICE SECTION */}
            <div className="price-row">
              <div className="price-left">
                {item.discount > 0 && (
                  <span className="original-price">
                    ₹{item.price}
                  </span>
                )}
                <span className="discounted-price">
                  ₹{item.discountedPrice}
                </span>

                <span className="qty">
                  × {item.qty}
                </span>
              </div>

              {/* ITEM TOTAL */}
              <strong className="item-total">
                ₹{item.itemTotal.toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* PRICE SUMMARY */}
  <div className="price-summary">
    <div>
      <span>Original Total</span>
      <span className="original-price">
        ₹{originalTotal.toFixed(2)}
      </span>
    </div>

    <div className="discount-row">
      <span>You Saved</span>
      <span>₹{totalDiscount.toFixed(2)}</span>
    </div>

    <div>
      <span>Subtotal</span>
      <span>₹{subtotal.toFixed(2)}</span>
    </div>

    <div>
      <span>CGST (9%)</span>
      <span>₹{cgst}</span>
    </div>

    <div>
      <span>SGST (9%)</span>
      <span>₹{sgst}</span>
    </div>

    <hr />

    <div className="grand-total">
      <strong>Grand Total</strong>
      <strong>₹{grandTotal}</strong>
    </div>
  </div>
</div>

        <button
          type="submit"
          className={`place-order-btn ${isSubmitting ? "disabled" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Processing..."
            : form.payment === "UPI"
            ? "Pay Now"
            : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;