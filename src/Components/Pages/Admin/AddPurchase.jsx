import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPurchase = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  
  const navigate = useNavigate();

  // 1. Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supRes, prodRes] = await Promise.all([
          axios.get("http://localhost:5000/api/suppliers"),
          axios.get("http://localhost:5000/api/products")
        ]);
        setSuppliers(supRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        alert("Server connection failed. Could not load data.");
      }
    };
    fetchData();
  }, []);

  // 2. Auto-calculate Total (Optional but helpful for UI)
  const totalAmount = (Number(quantity) * Number(price)).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!supplierId || !productId || !quantity || !price || !date) {
      alert("⚠️ Please fill all fields correctly.");
      return;
    }

    if (Number(quantity) <= 0 || Number(price) <= 0) {
      alert("❌ Quantity and Price must be greater than zero.");
      return;
    }

    const selectedDate = new Date(date);
    if (selectedDate > new Date()) {
      alert("📅 Future date is not allowed.");
      return;
    }

    // Double confirmation with total amount
    const isConfirmed = window.confirm(`Confirm Purchase?\nTotal Amount: ₹${totalAmount}`);
    if (!isConfirmed) return;

    try {
      await axios.post("http://localhost:5000/api/purchases", {
        supplier_id: Number(supplierId),
        product_id: Number(productId),
        quantity: Number(quantity),
        price: Number(price),
        p_date: date
      });

      alert("✅ Success! Purchase record saved.");
      navigate("/admin/view-purchases");
    } catch (err) {
      alert("🛑 Error: " + (err.response?.data?.error || "Database saving failed"));
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ textAlign: "center", color: "#333" }}>Add Purchase Entry</h3>

      <button onClick={() => navigate("/admin/view-purchases")} style={secondaryBtn}>
        ← Back to List
      </button>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroup}>
          <label style={labelStyle}>Supplier *</label>
          <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} style={inputStyle}>
            <option value="">-- Select Supplier --</option>
            {suppliers.map((s) => (
              <option key={s.supplier_id} value={s.supplier_id}>{s.fname} {s.lname}</option>
            ))}
          </select>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Product *</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} style={inputStyle}>
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p.product_id} value={p.product_id}>{p.product_name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Quantity</label>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={inputStyle} placeholder="0" />
          </div>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Price (Unit)</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} placeholder="0.00" />
          </div>
        </div>

        {/* Total Amount Display Area */}
        <div style={totalDisplayBox}>
          <span>Total Payable:</span>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}> ₹{totalAmount}</span>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Purchase Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        </div>

        <button type="submit" style={primaryBtn}>
          Add Purchase Record
        </button>
      </form>
    </div>
  );
};

// --- Updated Styles ---
const containerStyle = {
  maxWidth: "480px",
  margin: "40px auto",
  padding: "30px",
  background: "#fff",
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const formStyle = { display: "flex", flexDirection: "column", gap: "18px" };
const inputGroup = { display: "flex", flexDirection: "column", gap: "6px" };
const labelStyle = { fontSize: "13px", fontWeight: "600", color: "#555" };

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outlineColor: "#007bff"
};

const totalDisplayBox = {
  padding: "15px",
  background: "#e9ecef",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#495057",
  borderLeft: "5px solid #007bff"
};

const primaryBtn = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "14px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  boxShadow: "0 4px 6px rgba(0, 123, 255, 0.2)"
};

const secondaryBtn = {
  background: "none",
  border: "none",
  color: "#6c757d",
  cursor: "pointer",
  textDecoration: "underline",
  marginBottom: "15px",
  fontSize: "14px"
};

export default AddPurchase;