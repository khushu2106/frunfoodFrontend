import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import RecentOrders from "./RecentOrders";
import LowStock from "./LowStock";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    Total_Sales: 0,
    Total_Orders: 0,
    Total_Customers: 0,
    Total_Products: 0
  });

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
          value={`₹${Number(stats.Total_Sales).toLocaleString("en-IN")}`}
        />

        <StatCard title="Total Orders" value={stats.Total_Orders} />
        <StatCard title="Total Customers" value={stats.Total_Customer} />
        <StatCard title="Total Products" value={stats.Total_Products || 0} />
      </div>

      {/* Sales Chart */}
      <div style={{ marginTop: "40px" }}>
        <h2>Sales Graph</h2>
        <SalesChart />
      </div>

      {/* Tables */}
      <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
        <RecentOrders />
        <LowStock />
      </div>
    </div>
  );
};

export default Dashboard;
