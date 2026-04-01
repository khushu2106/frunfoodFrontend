import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import OrderStatusChart from "../OrderStatusChart";
import TopProductsChart from "../TopProductsChart";
import StockReportChart from "../StockReportChart";
import { useNavigate } from "react-router-dom";
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
    axios
      .get("http://localhost:5000/api/admin/dashboard/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log("Error fetching dashboard stats ", err);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* ✅ Summary Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Sales"
          value={`₹${stats.Total_sales}`}
          index={0}
          onClick={() => navigate("/admin/SalesChart")}
        />

        <StatCard
          title="Total Orders"
          value={stats.Total_Orders}
          index={1}
          onClick={() => navigate("/admin/orders")}
        />

        <StatCard
          title="Total Customers"
          value={stats.Total_Customers}
          index={2}
          onClick={() => navigate("/admin/users")}
        />

        <StatCard
          title="Total Products"
          value={stats.Total_Products || 0}
          index={3}
          onClick={() => navigate("/admin/manage-products")}
        />
      </div>

      {/* ✅ Sales Graph */}
      <div className="chart-card" style={{ marginTop: "40px" }}>
        <h3>Sales Overview</h3>
        <SalesChart />
      </div>

      {/* ✅ Analytics Grid */}
      <div className="chart-grid">
        <div className="chart-card">
          <h3>Order Status</h3>
          <OrderStatusChart />
        </div>

        <div className="chart-card">
          <h3>Top Selling Products</h3>
          <TopProductsChart />
        </div>

        <div className="chart-card full-width">
          <h3>Stock Report</h3>
          <StockReportChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;