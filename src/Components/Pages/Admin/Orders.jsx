import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sales");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

//   // Update order status
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/order/${orderId}/status`, { status: newStatus });
//       fetchOrders(); // refresh orders after status update
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

  return (
    <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
      <h2>Order Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            {/* <th>Status</th> */}
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.sale_id}>
              <td>{order.sales_id}</td>
              <td>{order.fname}</td>
              <td>{new Date(order.s_date).toLocaleDateString()}</td>
              <td>₹{order.total_amount}</td>
              {/* <td>{order.Order_status}</td> */}
              {/* <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.sales_id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
