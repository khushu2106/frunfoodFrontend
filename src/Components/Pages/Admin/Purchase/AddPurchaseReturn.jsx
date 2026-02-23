import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPurchaseReturn = () => {
  const [purchaseList, setPurchaseList] = useState([]); // List of available purchases
  const [purchaseId, setPurchaseId] = useState("");
  const [reason, setReason] = useState("");
  const [items, setItems] = useState([{ product_id: "", qty: "", price: "" }]);
  const [loading, setLoading] = useState(false);

  // 1. Load all purchases for the dropdown
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/purchases");
        setPurchaseList(res.data);
      } catch (err) {
        console.error("Purchases load nahi ho paye");
      }
    };
    fetchPurchases();
  }, []);

  // 2. Handle Purchase Selection
  const handlePurchaseSelect = async (id) => {
    setPurchaseId(id);
    if (!id) return;

    // Optional: Yahan aap backend se us Purchase ke items fetch kar sakte hain
    // try {
    //   const res = await axios.get(`http://localhost:5000/api/purchases/${id}`);
    //   setItems(res.data.items); // Auto-fill items from original purchase
    // } catch (err) { alert("Items fetch karne mein error"); }
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const calculateGrandTotal = () => {
    return items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price)), 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!purchaseId || !reason || items[0].product_id === "") {
      alert("❌ Please select a Purchase and add items.");
      return;
    }

    const confirmSubmit = window.confirm(`Confirm Return for Total: ₹${calculateGrandTotal()}?`);
    if (!confirmSubmit) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/purchase-returns", {
        purchase_id: Number(purchaseId),
        reason,
        items,
        total_amount: calculateGrandTotal()
      });

      alert("✅ Return Successful!");
      setPurchaseId("");
      setReason("");
      setItems([{ product_id: "", qty: "", price: "" }]);
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || "Submission failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ textAlign: "center" }}>New Purchase Return</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={inputGroup}>
          <label style={labelStyle}>Select Purchase Order (ID & Date) *</label>
          <select 
            style={inputStyle} 
            value={purchaseId} 
            onChange={(e) => handlePurchaseSelect(e.target.value)}
          >
            <option value="">-- Select Bill --</option>
            {purchaseList.map((p) => (
              <option key={p.purchase_id} value={p.purchase_id}>
                ID: {p.purchase_id} | Date: {new Date(p.p_date).toLocaleDateString()} | Total: ₹{p.total_price || p.price}
              </option>
            ))}
          </select>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Reason for Return *</label>
          <textarea
            style={{ ...inputStyle, minHeight: "50px" }}
            placeholder="Why are you returning this?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* ... Rest of the Items Mapping (Same as previous code) ... */}
        <h4>Return Items</h4>
        {items.map((item, index) => (
          <div key={index} style={itemRowStyle}>
            <input
              style={{...inputStyle, marginBottom: 0, flex: 2}}
              placeholder="Product ID"
              value={item.product_id}
              onChange={(e) => handleItemChange(index, "product_id", e.target.value)}
            />
            <input
              style={{...inputStyle, marginBottom: 0, flex: 1}}
              placeholder="Qty"
              type="number"
              value={item.qty}
              onChange={(e) => handleItemChange(index, "qty", e.target.value)}
            />
            <button type="button" onClick={() => setItems(items.filter((_, i) => i !== index))} style={delBtn}>✕</button>
          </div>
        ))}

        <button type="button" onClick={() => setItems([...items, { product_id: "", qty: "", price: "" }])} style={addBtn}>
          + Add More Items
        </button>

        <div style={summaryBox}>
          Total Refund Value: <strong>₹{calculateGrandTotal()}</strong>
        </div>

        <button type="submit" disabled={loading} style={primaryBtn}>
          {loading ? "Processing..." : "Complete Return"}
        </button>
      </form>
    </div>
  );
};

// Styles (Brief)
const containerStyle = { maxWidth: "550px", margin: "20px auto", padding: "25px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" };
const inputGroup = { marginBottom: "15px" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "5px" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", boxSizing: "border-box" };
const itemRowStyle = { display: "flex", gap: "10px", marginBottom: "10px" };
const summaryBox = { padding: "15px", background: "#f8f9fa", borderRadius: "5px", marginTop: "15px", display: "flex", justifyContent: "space-between" };
const primaryBtn = { width: "100%", padding: "12px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", marginTop: "15px" };
const addBtn = { padding: "5px 10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };
const delBtn = { background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "18px" };

export default AddPurchaseReturn;