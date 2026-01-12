import React from "react";
import "./DashBoardD.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Delivery Dashboard</h2>

      {/* Summary Cards */}
      <div className="stats">
        <div className="card">
          <h3>Total Orders</h3>
          <p>25</p>
        </div>

        <div className="card pending">
          <h3>Pending</h3>
          <p>5</p>
        </div>

        <div className="card delivered">
          <h3>Delivered</h3>
          <p>20</p>
        </div>
      </div>

      {/* Today's Orders */}
      <div className="today-orders">
        <h3>Today's Assigned Orders</h3>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#201</td>
              <td>Riya</td>
              <td>Lake View</td>
              <td>Out for Delivery</td>
            </tr>
            <tr>
              <td>#202</td>
              <td>Karan</td>
              <td>Hill Road</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button onClick={() => window.location.href = "/orders"}>
            View Orders
          </button>
          <button onClick={() => window.location.href = "/update-status"}>
            Update Status
          </button>
          <button onClick={() => window.location.href = "/profile"}>
            My Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
