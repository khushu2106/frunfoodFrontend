import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/purchases");
        setPurchases(res.data);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const handleBack = () => {
    navigate("/admin/transaction");
  };

  if (loading) return <p>Loading purchases...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px" }}>
      <h2>All Purchases</h2>

      <button
        onClick={handleBack}
        style={{
          backgroundColor: "#6c757d",
          color: "#fff",
          padding: "8px 12px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        Back
      </button>

      {purchases.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Supplier ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p.purchase_id}>
                <td>{p.purchase_id}</td>
                <td>{p.supplier_id}</td>
                <td>{p.product_id}</td>
                <td>{p.quantity}</td>
                <td>₹{p.price}</td>
                <td>{p.p_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewPurchases;
