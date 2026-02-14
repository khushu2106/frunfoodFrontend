import React, { useState } from "react";
import axios from "axios";
import "./Profile.css";

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sales, setSales] = useState(null);
  const [purchase, setPurchase] = useState(null);
  const [profit, setProfit] = useState(null);

  const fetchReports = async () => {
    if (!startDate || !endDate) {
      alert("Select date range");
      return;
    }

    const salesRes = await axios.get(
      `http://localhost:5000/api/reports/sales?startDate=${startDate}&endDate=${endDate}`
    );
    const purchaseRes = await axios.get(
      `http://localhost:5000/api/reports/purchase?startDate=${startDate}&endDate=${endDate}`
    );
    const profitRes = await axios.get(
      `http://localhost:5000/api/reports/profit?startDate=${startDate}&endDate=${endDate}`
    );

    setSales(salesRes.data);
    setPurchase(purchaseRes.data);
    setProfit(profitRes.data);
  };
  const downloadPDF = () => {
  if (!startDate || !endDate) {
    alert("Select date range");
    return;
  }

  window.open(
    `http://localhost:5000/api/reports/pdf?startDate=${startDate}&endDate=${endDate}`,
    "_blank"
  );
};

  return (
    <div className="report-container">
      <h2>Reports</h2>

      <div className="filter">
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchReports}>Generate</button>
      </div>

      <div className="cards">
        <div className="card">
          <h4>Sales</h4>
          <p>Orders: {sales?.total_orders || 0}</p>
          <p>Total: ₹{sales?.total_sales || 0}</p>
        </div>

        <div className="card">
          <h4>Purchase</h4>
          <p>Total Purchase: ₹{purchase?.total_purchase || 0}</p>
        </div>

        <div className="card profit">
          <h4>Profit</h4>
          <p>₹{profit?.profit || 0}</p>
        </div>
        <button onClick={downloadPDF}>Download PDF</button>
        
      </div>
    </div>
    
  );
};

export default Reports;