import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const SalesChart = () => {
  const [type, setType] = useState("monthly");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/dashboard/sales-chart?type=${type}`)
      .then((res) => {
        // Convert total to number & month number to name
        let chartData = res.data.map((item) => ({
          ...item,
          total: Number(item.total),
          month: monthNames[item.month - 1] || `Month ${item.month}`,
        }));
        
        if (chartData.length < 5) {
          const missing = 5 - chartData.length;
          const placeholders = Array.from({ length: missing }, (_, i) => ({
            month: `N/A${i + 1}`,
            total: 0,
          }));
          chartData = [...placeholders, ...chartData];
        }

        setData(chartData);
      })
      .catch((err) => console.error("Sales chart error:", err));
  }, [type]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "6px",
          }}
        >
          <p style={{ margin: 0, fontWeight: 500 }}>{label}</p>
          <p style={{ margin: 0 }}>Total Sales: ₹{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  // return (
  //   <div style={{ marginTop: "20px" }}>
  //     {/* Dropdown selector */}
  //     <div style={{ marginBottom: "15px" }}>
  //       <label htmlFor="sales-type" style={{ marginRight: "10px", fontWeight: 500 }}>
  //         View Sales:
  //       </label>
  //       {/* <select
  //         id="sales-type"
  //         value={type}
  //         onChange={(e) => setType(e.target.value)}
  //         style={{ padding: "4px 8px", borderRadius: "4px" }}
  //       >
  //         <option value="daily">Daily</option>
  //         <option value="weekly">Weekly</option>
  //         <option value="monthly">Monthly</option>
  //       </select> */}
  //     </div>

  //     {/* Line Chart */}
  //     <ResponsiveContainer width="100%" height={300}>
  //       <LineChart
  //         data={data}
  //         margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
  //       >
  //         <defs>
  //           <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
  //             <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
  //             <stop offset="100%" stopColor="#8884d8" stopOpacity={0.2} />
  //           </linearGradient>
  //         </defs>
  //         <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
  //         <XAxis dataKey="month" />
  //         <YAxis />
  //         <Tooltip content={<CustomTooltip />} />
  //         <Legend />
  //         <Line
  //           type="monotone"
  //           dataKey="total"
  //           stroke="#8884d8"
  //           strokeWidth={3}
  //           fillOpacity={1}
  //           fill="url(#colorSales)"
  //           dot={{ r: 6 }}
  //           activeDot={{ r: 8 }}
  //           animationDuration={800}
  //         >
  //           <LabelList dataKey="total" position="top" style={{ fontSize: 12 }} />
  //         </Line>
  //       </LineChart>
  //     </ResponsiveContainer>
  //   </div>
  // );
  return (
  <div
    style={{
      padding: "30px",
      background: "#f4f6f9",
      minHeight: "100vh"
    }}
  >
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "30px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px"
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#1f2937" }}>
            📊 Sales Analytics
          </h2>
          <p style={{ margin: "5px 0 0", color: "#6b7280", fontSize: "14px" }}>
            Revenue insights based on {type} performance
          </p>
        </div>

        {/* Filter Buttons */}
        {/* <div style={{ display: "flex", gap: "10px" }}>
          {["daily", "weekly", "monthly"].map((item) => (
            <button
              key={item}
              onClick={() => setType(item)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                background:
                  type === item
                    ? "linear-gradient(135deg,#4f46e5,#6366f1)"
                    : "#e5e7eb",
                color: type === item ? "#fff" : "#374151",
                fontWeight: type === item ? "500" : "normal",
                transition: "0.3s"
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div> */}
      </div>

      {/* Chart Container */}
      <div
        style={{
          background: "#f9fafb",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                border: "none"
              }}
              formatter={(value) => [`₹${value}`, "Total Sales"]}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#4f46e5"
              strokeWidth={3}
              fill="url(#colorSales)"
              dot={{
                r: 5,
                stroke: "#4f46e5",
                strokeWidth: 2,
                fill: "#fff"
              }}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            >
              <LabelList
                dataKey="total"
                position="top"
                style={{
                  fontSize: 11,
                  fill: "#374151",
                  fontWeight: 500
                }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
};

export default SalesChart;