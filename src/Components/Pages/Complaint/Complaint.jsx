import "./Complaint.css";
import { useState } from "react";

function Complaint() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderId: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Complaint submitted successfully!");
    console.log(form);
  };

  return (
    
      

      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="complaint-container"></div>
        <h2>Customer Complaint</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          required
          onChange={handleChange}
        />

        <select name="issue" required onChange={handleChange}>
          <option value="">Select Issue</option>
          <option>Late Delivery</option>
          <option>Wrong Item</option>
          <option>Payment Issue</option>
          <option>Quality Issue</option>
          <option>Other</option>
        </select>

        <textarea
          name="message"
          placeholder="Describe your issue"
          rows="4"
          required
          onChange={handleChange}
        />

        <button type="submit">Submit Complaint</button>
        
      </form>
    
  );
}

export default Complaint;
