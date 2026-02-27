import React, { useState, useEffect } from "react";
import { getAssignedOrders, getDashboardData, updateOrderStatus } from "../../../Services/Api";
import "./DashBoardD.css";

function Dashboard() {

  const deliveryBoyId = 1;

  const [data, setData] = useState({
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0
  });

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // 🔥 Common fetch function
  const fetchDashboard = () => {
    setLoading(true);

    Promise.all([
      getDashboardData(deliveryBoyId),
      getAssignedOrders(deliveryBoyId)
    ])
      .then(([resDashboard, resOrders]) => {

        if (resDashboard?.data?.success) {
          setData(resDashboard.data.dashboard || {});
        }

        if (resOrders?.data?.success) {
          setOrders(resOrders.data.data || []);   // 🔥 SAFE
        } else {
          setOrders([]);  // 🔥 fallback
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setOrders([]);   // 🔥 avoid crash
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // 🔥 Status update without reload
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
      .then(res => {
        alert("Status updated!");
        fetchDashboard();   // ✔ live refresh
      })
      .catch(err => console.log(err));
  }

  if (loading) return <div className="dashboard">Loading...</div>;

  return (
    <div className="dashboard">
      <h2>Delivery Dashboard</h2>

      <div className="stats">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{data?.totalOrders || 0}</p>
        </div>

        <div className="card pending">
          <h3>Pending</h3>
          <p>{data?.pendingOrders || 0}</p>
        </div>

        <div className="card delivered">
          <h3>Delivered</h3>
          <p>{data?.deliveredOrders || 0}</p>
        </div>
      </div>

      <div className="today-orders">
        <h3>Assigned Orders</h3>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.sales_id}>
                  <td>#{order.sales_id}</td>
                  <td>{order.fname || "N/A"}</td>
                  <td>₹{order.total_amount}</td>
                  <td>
                    <span className={`status-badge ${order.order_status}`}>
                      {order.order_status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No active orders found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Dashboard;