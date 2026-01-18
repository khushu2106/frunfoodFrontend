import React from "react";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import RecentOrders from "./RecentOrders";
import LowStock from "./LowStock";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* Top Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <StatCard title="Total Sales" value="₹1,25,000" />
        <StatCard title="Total Orders" value="350" />
        <StatCard title="Total Customers" value="120" />
        <StatCard title="Total Products" value="80" />
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
