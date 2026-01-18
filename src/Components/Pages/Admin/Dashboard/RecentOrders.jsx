import React from "react";

const orders = [
  { id: 101, customer: "Rahul", amount: "₹1200", status: "Delivered" },
  { id: 102, customer: "Anita", amount: "₹750", status: "Pending" },
  { id: 103, customer: "Suresh", amount: "₹430", status: "Shipped" },
];

const RecentOrders = () => {
  return (
    <div style={{ flex: 1, background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
      <h3>Recent Orders</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Order ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Customer</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Amount</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td style={{ padding: "8px" }}>{order.id}</td>
              <td style={{ padding: "8px" }}>{order.customer}</td>
              <td style={{ padding: "8px" }}>{order.amount}</td>
              <td style={{ padding: "8px" }}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
