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

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Dropdown selector */}
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="sales-type" style={{ marginRight: "10px", fontWeight: 500 }}>
          View Sales:
        </label>
        <select
          id="sales-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: "4px 8px", borderRadius: "4px" }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSales)"
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
            animationDuration={800}
          >
            <LabelList dataKey="total" position="top" style={{ fontSize: 12 }} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
