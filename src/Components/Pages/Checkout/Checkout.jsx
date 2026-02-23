import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {

  const nameRegex = /^[A-Za-z ]{3,40}$/;
  const mobileRegex = /^[6-9]\d{9}$/;
  const pincodeRegex = /^[1-9][0-9]{5}$/;

  const location = useLocation();
  const navigate = useNavigate();

  /* ================= CHECKOUT TYPE ================= */

  const isDirectBuy = location.state?.directBuy || false;

  const cartItems =
    location.state?.cartItems ||
    (location.state?.directProduct ? [location.state.directProduct] : []);

  if (!cartItems.length && !isDirectBuy) {
    alert("Your cart is empty!");
    navigate("/cart");
  }

  /* ================= DISCOUNT CALCULATION ================= */

  const calculatedItems = cartItems.map((item) => {
    return {
      ...item,
      discountedPrice: item.price,
      itemTotal: item.price * item.qty,
      originalTotal: item.originalPrice
        ? item.originalPrice * item.qty
        : item.price * item.qty,
      discountAmount:
        item.originalPrice
          ? (item.originalPrice - item.price) * item.qty
          : 0
    };
  });

  const subtotal = calculatedItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const cgst = +(subtotal * 0.09).toFixed(2);
  const sgst = +(subtotal * 0.09).toFixed(2);
  const grandTotal = +(subtotal + cgst + sgst).toFixed(2);

  /* ================= USER AUTH ================= */

  const token = localStorage.getItem("userToken");

  if (!token) {
    alert("Please login to continue");
    navigate("/login");
  }

  let userId = null;
  let userEmail = null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    userId = payload.id || payload.userId;
    userEmail = payload.email;

    if (!userId || !userEmail) {
      throw new Error("Invalid token");
    }

  } catch {
    alert("Session expired. Please login again.");
    navigate("/login");
  }


  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "Ahmedabad",
    pincode: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trimStart() });
  };

  const validateForm = () => {
    if (!nameRegex.test(form.name.trim()))
      return "Enter valid Full Name";

    if (!mobileRegex.test(form.mobile))
      return "Enter valid Mobile Number";

    if (!pincodeRegex.test(form.pincode))
      return "Enter valid Pincode";

    if (form.address.trim().length < 10)
      return "Enter complete Address";

    return "";
  };

  /* ================= FINAL ORDER ================= */

  const submitFinalOrder = async (transactionId = "") => {

    setIsSubmitting(true);

    const orderData = {
      user_id: userId,
      total_amount: subtotal,
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
      customer: {
        name: form.name,
        email: userEmail,
        phone: form.mobile,
      },
      items: calculatedItems,
      is_cart_checkout: !isDirectBuy
    };

    try {
      await axios.post(
        "http://localhost:5000/api/sales",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully 🎉");

      if (!isDirectBuy) {
        localStorage.removeItem("cartItems");
      }

      navigate(isDirectBuy ? "/orders" : "/", { replace: true });
      window.location.reload();

    } catch (err) {
      alert("Order failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm();

    if (error) {
      alert(error);
      return;
    }

    if (form.payment === "UPI") {
      handleRazorpayPayment();
    } else {
      submitFinalOrder();
    }
  };

  /* ================= RAZORPAY ================= */

  const handleRazorpayPayment = async () => {
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
        name: "Pet Shop",
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
        theme: { color: "#583217" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch {
      alert("Payment failed");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>

        <div className="section">
          <h3>Delivery Address</h3>

          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile Number" maxLength="10" onChange={handleChange} required />
          <textarea name="address" placeholder="Full Address" rows="3" onChange={handleChange} required />

          <div className="row">
            <input value={form.city} readOnly />
            <input name="pincode" placeholder="Pincode" maxLength="6" onChange={handleChange} required />
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
            Online Payment
          </label>
        </div>

        <button type="submit" className="place-order-btn" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : (form.payment === "UPI" ? "Pay Now" : "Place Order")}
        </button>

      </form>
    </div>
  );
}

export default Checkout;