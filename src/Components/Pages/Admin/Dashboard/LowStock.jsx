import axios from "axios";
import React, { useEffect, useState } from "react";


const LowStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/stats", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

      .then(res => setProducts(res.data))
      .catch(err => console.error("Low stock error ", err));
  }, []);

  return (
    <div style={{ flex: 1, background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
      <h3>Low Stock Products</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Product ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ padding: "8px" }}>{product.product_id}</td>
              <td style={{ padding: "8px" }}>{product.name}</td>
              <td style={{ padding: "8px" }}>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStock;
