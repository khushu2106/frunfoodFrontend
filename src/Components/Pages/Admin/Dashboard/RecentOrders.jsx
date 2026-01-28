import axios from "axios";
import React, { useEffect, useState } from "react";


const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/admin/dashboard/recent-orders").then(res=>setOrders(res.data))
    .catch(err => console.error("Recent orders error ",err));
  },[])
  return (
    <div style={{ flex: 1, background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
      <h3>Recent Orders</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Order ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Customer</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Amount</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td style={{ padding: "8px" }}>{order.sales_id}</td>
              <td style={{ padding: "8px" }}>{order.fname}</td>
              <td style={{ padding: "8px" }}>{order.grand_total}</td>
              <td style={{ padding: "8px" }}>{order.Order_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
