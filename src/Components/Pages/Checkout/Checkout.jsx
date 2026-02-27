import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const nameRegex = /^[A-Za-z ]{3,40}$/;
const mobileRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

function Checkout() {

  const location = useLocation();
  const navigate = useNavigate();

  const totalAmount = location.state?.totalAmount || 0;
  const cartItems = location.state?.cartItems || [];

  const cgst = +(totalAmount * 0.09).toFixed(2);
  const sgst = +(totalAmount * 0.09).toFixed(2);
  const grandTotal = +(totalAmount + cgst + sgst).toFixed(2);

  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= TOKEN VALIDATION ================= */

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      if (payload.exp && payload.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }

      const id = payload.id || payload.userId;
      if (!id) throw new Error();

      setUserId(id);

      // ✅ FIXED EMAIL FETCH
      if (payload.email) {
        setUserEmail(payload.email);
      }

    } catch (err) {
      console.error("Token error:", err);
      alert("Session expired. Please login again.");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      navigate("/login");
    }

  }, [navigate]);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data;

        setForm(prev => ({
          ...prev,
          name: `${data.fname || ""} ${data.lname || ""}`.trim(),
          mobile: data.mobile_no || "",
          address: data.address1 || ""
        }));

        setProfileLoaded(true);

      } catch (err) {
        console.log("Profile prefill failed");
      }
    };

    fetchProfile();
  }, []);

  /* ================= EMPTY CART ================= */

  useEffect(() => {
    if (!cartItems.length && !location.state?.directBuy) {
      alert("Your cart is empty!");
      navigate("/cart");
    }
  }, [cartItems, totalAmount, navigate]);

  /* ================= FORM ================= */

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "Ahmedabad",
    pincode: "380001",
    payment: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    if (!nameRegex.test(form.name.trim()))
      return "Enter valid full name (min 3 letters)";

    if (!mobileRegex.test(form.mobile))
      return "Enter valid 10-digit mobile number";

    if (form.address.trim().length < 10)
      return "Address must be at least 10 characters";

    if (!pincodeRegex.test(form.pincode))
      return "Enter valid pincode";

    return "";
  };

  /* ================= ORDER ================= */

  const submitFinalOrder = async (transactionId = "") => {

    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("userToken");
    console.log("Email being sent in order:", userEmail);
    const orderData = {
      user_id: userId,
      is_cart_checkout: location.state?.directBuy ? false : true, // ✅ IMPORTANT

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

      customer: {
        name: form.name,
        email: userEmail,
        phone: form.mobile,
        address: `${form.address}, ${form.city} - ${form.pincode}`
      },

      items: cartItems.map(item => ({
        product_id: item.product_id,
        name: item.product_name || item.name,
        price: item.product_price || item.price,
        qty: item.qty
      })),

      tax: +(cgst + sgst).toFixed(2),
      total: grandTotal
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/sales",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");

      if (res.data.invoice) {
        window.open(`http://localhost:5000/api/sales/invoice/${res.data.invoice}`);
      }

      localStorage.removeItem("cartItems");
      setIsSubmitting(false);
      navigate("/");

    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      alert("Order Failed: " + (err.response?.data?.error || "Unknown error"));
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

    if (isSubmitting) return;

    if (form.payment === "UPI")
      handleRazorpayPayment();
    else
      submitFinalOrder();
  };

  /* ================= RAZORPAY ================= */

  const handleRazorpayPayment = async () => {

    if (!window.Razorpay) {
      alert("Payment system not loaded.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");

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
          if (!response.razorpay_payment_id) {
            alert("Payment verification failed");
            return;
          }
          submitFinalOrder(response.razorpay_payment_id);
        },
        prefill: {
          name: form.name,
          email: userEmail,
          contact: form.mobile
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      alert("Payment failed.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="section">
          <h3>Delivery Address</h3>

          {/* <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} /> */}
          <div>
            <label htmlFor="">Name :</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          {/* <input type="tel" name="mobile" placeholder="Mobile Number" maxLength="10" required onChange={handleChange} /> */}
          <div>
            <label htmlFor="">Mobile No. : </label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>

          {/* <textarea name="address" placeholder="Full Address" rows="3" required onChange={handleChange} /> */}
          <div>
            <label htmlFor="">Address : </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="row">
            <div><label htmlFor="">City</label>
              <input type="text" name="city" value={form.city} readOnly /></div>
              <div><label htmlFor="">City</label>
              <input type="text" name="pincode" value={form.pincode} readOnly /></div>
          </div>
        </div>

        <div className="section">
          <h3>Payment Method</h3>

          <label>
            <input type="radio" name="payment" value="COD"
              checked={form.payment === "COD"}
              onChange={handleChange} />
            Cash on Delivery
          </label>

          <label>
            <input type="radio" name="payment" value="UPI"
              checked={form.payment === "UPI"}
              onChange={handleChange} />
            Online Payment
          </label>
        </div>

        <div className="section summary">
          <h3>Order Summary</h3>
          <p>Items Total: ₹{totalAmount}</p>
          <p>CGST (9%): ₹{cgst}</p>
          <p>SGST (9%): ₹{sgst}</p>
          <p>Payment Mode: {form.payment}</p>
          <hr />
          <h4>Grand Total: ₹{grandTotal}</h4>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : form.payment === "UPI" ? "Pay Now" : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;