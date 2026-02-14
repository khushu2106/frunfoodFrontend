import React, { useState, useEffect } from "react";
import { getAssignedOrders, getDashboardData, updateOrderStatus } from "../../../Services/Api";
import "./DashBoardD.css";

function Dashboard() {
  const [data, setData] = useState({
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const deliveryBoyId = 1;

    Promise.all([
      getDashboardData(deliveryBoyId),
      getAssignedOrders(deliveryBoyId)
    ]).then(([resDashboard, resOrders]) => {
      if (resDashboard.data.success) setData(resDashboard.data.Dashboard);
      if (resDashboard.data.success) setOrders(resOrders.data.orders);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = (orderId, newStatus) =>{
    updateOrderStatus(orderId, newStatus).then(res => {
      alert("status updated !");
      window.location.reload();
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

      {/* Today's Orders (Table content abhi static hai) */}
      <div className="today-orders">
        <h3>Today's Assigned Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer(ID)</th>
              <th>Amount</th>
              <th>Status</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.sales_id}</td>
                  <td>{order.customer_name || order.user_id || "N/A"}</td>
                  <td>₹{order.total_amount}</td>
                  <td>
                    <span className={`status-badge ${order.order_status}`}>
                      {order.Order_status}
                    </span>
                  </td>
                  {/* <td>
                    <select value={order.Order_status} onChange={(e) => {
                      handleStatusChange(order.sales_id, e.target.value)
                    }}>
                      <option value="pending">Pending</option>
                      <option value="picked_up">Picked_up</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No active orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      {/* <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button onClick={() => window.location.href = "/orders"}>View Orders</button>
          <button onClick={() => window.location.href = "/update-status"}>Update Status</button>
          <button onClick={() => window.location.href = "/profile"}>My Profile</button>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;