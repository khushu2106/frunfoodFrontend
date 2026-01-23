import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const PurchaseChart = () => {
  const data = [
    { date: "2026-01-01", total: 500 },
    { date: "2026-01-02", total: 300 },
    { date: "2026-01-03", total: 450 },
    { date: "2026-01-04", total: 700 },
    { date: "2026-01-05", total: 600 },
    { date: "2026-01-06", total: 800 },
    { date: "2026-01-07", total: 400 },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", height: 300 }}>
      <h3>Total Purchases (Static)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PurchaseChart;
