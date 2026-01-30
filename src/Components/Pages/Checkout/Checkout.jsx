// import "./Checkout.css";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./checkout.css"
// import { Currency } from "lucide-react";

// function Checkout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const totalAmount = location.state?.totalAmount || 0;
//   const cgst = +(totalAmount * 0.09).toFixed(2);
//   const sgst = +(totalAmount * 0.09).toFixed(2);
//   const grandTotal = +(totalAmount + cgst + sgst).toFixed(2);

//   const token = localStorage.getItem("userToken");

//   let userId = null;
//   if (token) {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       userId = payload.id;
//     } catch (e) {
//       console.error("Token parsing error", e);
//     }
//   }

//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     address: "",
//     city: "Gujarat",
//     pincode: "380001",
//     payment: "COD",
//     transaction_id: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       alert("Please login first!");
//       navigate("/login");
//       return;
//     }

//     setIsSubmitting(true);

//     const orderData = {
//       user_id: userId,
//       total_amount: totalAmount,
//       SGST: sgst,
//       CGST: cgst,
//       shipping_charge: 0,
//       S_date: new Date().toISOString().split("T")[0],
//       delivery_add1: form.address,
//       delivery_add2: `${form.city}, ${form.pincode}`,
//       Area_id: 1,
//       IsCancel: 0,
//       Payment_mode: form.payment,
//       payment_status: form.payment === "COD" ? "pending" : "paid",
//       transaction_id: form.payment === "COD" ? null : form.transaction_id,

//       // ===== INVOICE DATA =====
//       paymentMethod: form.payment,
//       paymentStatus: form.payment === "COD" ? "Pending" : "Paid",

//       customer: {
//         name: form.name,
//         email: "customer@gmail.com",
//         phone: form.mobile,
//         address: `${form.address}, ${form.city} - ${form.pincode}`
//       },

//       items: [
//         { name: "Sample Item", quantity: 1, price: totalAmount }
//       ],

//       tax: cgst + sgst,
//       discount: 0,
//       total: grandTotal
//     };

//     try {
//       const res = await axios.post("http://localhost:5000/api/sales", orderData);

//       alert("Order placed successfully! Check your email for invoice.");

//       if (res.data.invoice) {
//         window.open(`http://localhost:5000/api/sales/invoice/${res.data.invoice}`);
//       }

//       navigate("/");
//     } catch (err) {
//       console.error("Axios Error:", err.response?.data || err.message);
//       alert("Order Failed: " + (err.response?.data?.error || "Unknown error"));
//       setIsSubmitting(false);
//     }
//   };

//   const handleOrder = async() =>{
//     if(paymentMethod === 'COD'){
//       handleSubmit();
//     }else{
//       const orderDetails = await fetch('http://loacalhost:5000//add-payment',{
//         method: 'POST',
//         headers: {'content-Type': 'application/json'},
//         body: JSON.stringify({amount: total})
//       }).then(res => res.json());

//       const options = {
//         key: "rzp_test_S9kwaroWgidHqG",
//         amount: orderDetails.amount,
//         Currency: "INR",
//         name: "Pet Food Shop",
//         sales_id:orderDetails.id,
//         handler : function (response) {
//           console.log("Payment Success!", response);
//           handleSubmit();
//         },
//         prefill:{
//           email: userEmail,
//           contact: mobile
//         }
//       };
//       const rzp = new window.Razorpay(options)
//     }
//   }

//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>

//       <form className="checkout-form" onSubmit={handleSubmit}>
//         <div className="section">
//           <h3>Delivery Address</h3>
//           <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
//           <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
//           <textarea name="address" placeholder="Full Address" rows="3" required onChange={handleChange} />

//           <div className="row">
//             <input type="text" name="city" value={form.city} readOnly />
//             <input type="text" name="pincode" value={form.pincode} readOnly />
//           </div>
//         </div>

//         <div className="section">
//           <h3>Payment Method</h3>
//           <label>
//             <input type="radio" name="payment" value="COD" checked={form.payment === "COD"} onChange={handleChange} />
//             Cash on Delivery
//           </label>

//           <label>
//             <input type="radio" name="payment" value="UPI" onChange={handleChange} />
//             Online Payment
//           </label>

//           {form.payment !== "COD" && (
//             <input
//               type="text"
//               name="transaction_id"
//               placeholder="Transaction ID"
//               required
//               onChange={handleChange}
//             />
//           )}
//         </div>

//         <div className="section summary">
//           <h3>Order Summary</h3>
//           <p>Items Total: ₹{totalAmount}</p>
//           <p>CGST (9%): ₹{cgst}</p>
//           <p>SGST (9%): ₹{sgst}</p>
//           <hr />
//           <h4>Grand Total: ₹{grandTotal}</h4>
//         </div>

//         <button 
//           type="submit" 
//           className={`place-order-btn ${isSubmitting ? "disabled" : ""}`} 
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Processing Order..." : "Place Order"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Checkout;


import React, { useState } from 'react';

const Checkout = () => {
  const [amount, setAmount] = useState(500); // Default amount

  const payNow = async () => {
    if(!window.Razorpay){
      alert("Razorpay SDK failed to load. Are you online ? ")
    }
    try {
      const response = await fetch('http://localhost:5000/api/payment/add-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }) 
      });
      
      const order = await response.json();
      const options = {
        key: "rzp_test_S9ljGtWRbBKAdB", 
        amount: order.amount,
        currency: "INR",
        name: "Pet Food Shop",
        description: "Project Test Payment",
        order_id: order.id, 
        handler: function (response) {
          alert("Payment Successful! ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Khushbu",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed to initialize");
    }
  };

  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Checkout Page</h2>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Enter Amount"
      />
      <br /><br />
      <button onClick={payNow}>Pay with Razorpay</button>
    </main>
  );
};

export default Checkout;