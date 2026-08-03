import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAssignedOrders, getDashboardData, updateOrderStatus } from "../../../Services/Api";
import "./DashBoardD.css";

function Dashboard() {

  const deliveryBoyId = 5; // ✅ FIXED

  const [data, setData] = useState({
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0
  });

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  // 🔥 Fetch Dashboard + Orders
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
          setOrders(resOrders.data.data || []);
        } else {
          setOrders([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setOrders([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // 🔥 Update Status
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
      .then(() => {
        alert("Status updated!");
        fetchDashboard(); // refresh
      })
      .catch(err => console.log(err));
  };

  if (loading) return <div className="dashboard">Loading...</div>;

  return (
    <div className="dashboard">
      <h2>Delivery Dashboard</h2>

      <div className="stats">

        <div 
          className="card" 
          onClick={() => navigate("/delivery/assigned-orders")}
          style={{ cursor: "pointer" }}
        >
          <h3>Total Orders</h3>
          <p>{data?.totalOrders || 0}</p>
        </div>

        <div 
          className="card pending" 
          onClick={() => navigate("/delivery/assigned-orders")}
          style={{ cursor: "pointer" }}
        >
          <h3>Pending</h3>
          <p>{data?.pendingOrders || 0}</p>
        </div>

        <div 
          className="card delivered" 
          onClick={() => navigate("/delivery/history")}
          style={{ cursor: "pointer" }}
        >
          <h3>Delivered</h3>
          <p>{data?.deliveredOrders || 0}</p> {/* ✅ FIXED */}
        </div>

      </div>

      <div className="today-orders">
         <div className="info-banner">
        <h3>💡 Quick Tips</h3>
        <ul>
          <li>Always call the customer before arriving.</li>
          <li>Upload a photo of the bill for quick payment.</li>
          <li>Report issues within 1 hour.</li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;