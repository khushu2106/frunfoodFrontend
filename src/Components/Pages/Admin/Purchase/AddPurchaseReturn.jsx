import React, { useState } from "react";
import axios from "axios";

const AddPurchaseReturn = () => {
  const [purchaseId, setPurchaseId] = useState("");
  const [reason, setReason] = useState("");
  const [items, setItems] = useState([
    { product_id: "", qty: "", price: "" }
  ]);
  const [error, setError] = useState("");

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([...items, { product_id: "", qty: "", price: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!purchaseId || !reason) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/purchase-returns", {
        purchase_id: Number(purchaseId),
        reason,
        items
      });

      alert("Purchase Return Added Successfully");
      setPurchaseId("");
      setReason("");
      setItems([{ product_id: "", qty: "", price: "" }]);
      setError("");
    } catch (err) {
      setError("Failed to add purchase return");
    }
  };

  return (
    <div style={container}>
      <h3>Purchase Return</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          style={input}
          placeholder="Purchase ID"
          value={purchaseId}
          onChange={(e) => setPurchaseId(e.target.value)}
        />

        <textarea
          style={input}
          placeholder="Return Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <h4>Return Items</h4>

        {items.map((item, index) => (
          <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              style={input}
              placeholder="Product ID"
              value={item.product_id}
              onChange={(e) =>
                handleItemChange(index, "product_id", e.target.value)
              }
            />
            <input
              style={input}
              placeholder="Qty"
              value={item.qty}
              onChange={(e) =>
                handleItemChange(index, "qty", e.target.value)
              }
            />
            <input
              style={input}
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", e.target.value)
              }
            />
          </div>
        ))}

        <button type="button" onClick={addRow} style={secondaryBtn}>
          + Add Item
        </button>

        <button type="submit" style={primaryBtn}>
          Submit Purchase Return
        </button>
      </form>
    </div>
  );
};

const container = {
  maxWidth: "600px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const primaryBtn = {
  marginTop: "15px",
  padding: "10px",
  width: "100%",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const secondaryBtn = {
  marginBottom: "10px",
  padding: "8px 12px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default AddPurchaseReturn;