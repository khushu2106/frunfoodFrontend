import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import { useNavigate } from "react-router-dom";
// import RecentOrders from "./RecentOrders";
// import LowStock from "./LowStock";
import "./AdminFooter.css";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    Total_sales: 0,
    Total_Orders: 0,
    Total_Customers: 0,
    Total_Products: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/dashboard/stats")
      .then(res => {
        setStats(res.data);
      })
      .catch(err => {
        console.log("Error fetching dashboard stats ", err);
      });
  }, [])
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* Top Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <StatCard
          title="Total Sales"
          value={`₹${stats.Total_sales}`}
          // onClick={() => navigate("/admin/balance")}
        />

        <StatCard
          title="Total Orders"
          value={stats.Total_Orders}
          onClick={() => navigate("/admin/orders")}
        />

        <StatCard
          title="Total Customers"
          value={stats.Total_Customers}
          onClick={() => navigate("/admin/users")}
        />

        <StatCard
          title="Total Products"
          value={stats.Total_Products || 0}
          onClick={() => navigate("/admin/manage-products")}
        />
      </div>

      {/* Sales Chart */}
      <div style={{ marginTop: "40px" }}>
        <h2>Sales Graph</h2>
        <SalesChart />
      </div>

      {/* Tables */}
      <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
        {/* <RecentOrders /> */}
        {/* <LowStock /> */}
      </div>
      <footer className="admin-footer">
        <div className="admin-footer-container">

          {/* LEFT */}
          <div className="admin-footer-left">
            <h4>Fur & Food Admin Panel</h4>
            <p>Manage products, categories, brands & orders easily.</p>
          </div>

          {/* CENTER */}
          <div className="admin-footer-center">
            <p>© {new Date().getFullYear()} Fur & Food</p>
            <p>All rights reserved.</p>
          </div>

          {/* RIGHT */}
          <div className="admin-footer-right">
            <span>Admin Dashboard</span>
            <span className="dot">•</span>
            <span>v1.0</span>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
