import React from "react";

const products = [
  { id: 1, name: "Dog Food", stock: 3 },
  { id: 2, name: "Cat Toy", stock: 2 },
  { id: 3, name: "Bird Cage", stock: 5 },
];

const LowStock = () => {
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
              <td style={{ padding: "8px" }}>{product.id}</td>
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
