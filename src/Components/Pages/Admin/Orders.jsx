import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("userToken");
  const [searchTerm, setSearchTerm] = useState("");
const { orderId } = useParams();
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();

    return (
      order.sales_id.toString().includes(term) ||
      (order.fname && order.fname.toLowerCase().includes(term)) ||
      (order.order_status && order.order_status.toLowerCase().includes(term))
    );
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sales", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (order, newStatus) => {
    const { sales_id, payment_mode, order_status } = order;

    if (newStatus === "cancelled") {
      let confirmMsg = "Are you sure you want to cancel this order?";

      if (payment_mode === "Online" || payment_mode === "UPI") {
        confirmMsg =
          "Warning: This is an ONLINE PAID order. Cancelling will require a manual/automatic refund. Proceed?";
      }

      if (!window.confirm(confirmMsg)) return;
    }

    if (newStatus === "cancelled" && order_status === "shipped") {
      alert(
        "This order is already shipped. Please coordinate with the delivery partner before cancelling."
      );
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/sales/status`,
        {
          sales_id,
          status: newStatus,
          payment_mode: payment_mode
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(
        `Order #${sales_id} cancelled. ${
          payment_mode !== "COD" ? "Refund initiated." : ""
        }`
      );
      fetchOrders();
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Update failed"));
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return { color: "#28a745", fontWeight: "bold" };
      case "cancelled":
        return { color: "#dc3545", fontWeight: "bold" };
      case "shipped":
        return { color: "#fd7e14", fontWeight: "bold" };
      case "confirmed":
        return { color: "#007bff", fontWeight: "bold" };
      default:
        return { color: "#666" };
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          color: "#333",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        📦 Order Management
      </h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-start"
        }}
      >
        <label style={{ marginRight: "10px" }}>
          Search by order id, customer :
        </label>

        <input
          type="text"
          placeholder="🔍 Search by Order ID, Customer or Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 14px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none"
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px"
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f8f9fa",
              borderBottom: "2px solid #eee",
              textAlign: "left"
            }}
          >
            <th style={{ padding: "15px" }}>Order ID</th>
            <th style={{ padding: "15px" }}>Customer</th>
            <th style={{ padding: "15px" }}>Date</th>
            <th style={{ padding: "15px" }}>Amount</th>
            <th style={{ padding: "15px" }}>Payment Mode</th>
            <th style={{ padding: "15px" }}>Current Status</th>
            <th style={{ padding: "15px" }}>Update Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((order) => (
            <tr
              key={order.sales_id}
              style={{
                borderBottom: "1px solid #f1f1f1",
                transition: "0.3s"
              }}
            >
              <td style={{ padding: "15px", fontWeight: "600" }}>
                #{order.sales_id}
              </td>

              <td style={{ padding: "15px" }}>
                {order.fname || "Guest User"}
              </td>

              <td style={{ padding: "15px" }}>
                {new Date(order.s_date).toLocaleDateString()}
              </td>

              <td style={{ padding: "15px", fontWeight: "bold" }}>
                ₹{order.total_amount}
              </td>

              <td style={{ padding: "15px" }}>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    background:
                      order.payment_mode === "COD" ? "#eee" : "#e3f2fd",
                    color:
                      order.payment_mode === "COD" ? "#666" : "#0d47a1"
                  }}
                >
                  {order.payment_mode}
                </span>
              </td>

              <td style={{ padding: "15px" }}>
                <span style={getStatusStyle(order.order_status)}>
                  {order.order_status?.toUpperCase() || "N/A"}
                </span>
              </td>

              <td style={{ padding: "15px" }}>
                <select
  value={order.order_status || ""}
  onChange={(e) => {
    const value = e.target.value;

    if (value === "assigned") {
      window.location.href = `/admin/pending`;
    } else {
      handleStatusChange(order, value);
    }
  }}
>
  <option value="confirmed">Confirmed</option>
  <option value="shipped">Shipped</option>
  <option value="assigned">Assigned</option>
  <option value="cancelled">Cancelled</option>
</select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredOrders.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#999"
          }}
        >
          No orders found in the database.
        </div>
      )}
    </div>
  );
};

export default Orders;