import React, { useState } from "react";
import axios from "axios";
import "./Profile.css";

// ----------------- Helper functions -----------------
const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const formatCurrency = (num) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num || 0);
};

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sales, setSales] = useState(null);
  const [purchase, setPurchase] = useState(null);
  const [profit, setProfit] = useState(null);
  const [loading, setLoading] = useState(false);

  // ----------------- Fetch Reports -----------------
  const fetchReports = async () => {
    if (!startDate || !endDate) {
      alert("Select date range");
      return;
    }

    setLoading(true);
    try {
      const [salesRes, purchaseRes, profitRes] = await Promise.all([
        axios.get(
          `http://localhost:5000/api/reports/sales?startDate=${startDate}&endDate=${endDate}`
        ),
        axios.get(
          `http://localhost:5000/api/reports/purchase?startDate=${startDate}&endDate=${endDate}`
        ),
        axios.get(
          `http://localhost:5000/api/reports/profit?startDate=${startDate}&endDate=${endDate}`
        ),
      ]);

      setSales(salesRes.data);
      setPurchase(purchaseRes.data);
      setProfit(profitRes.data);
    } catch (err) {
      alert("Failed to fetch reports");
      console.error(err);
    }
    setLoading(false);
  };

  // ----------------- Download PDF -----------------
  const downloadPDF = () => {
    if (!startDate || !endDate) {
      alert("Select date range before downloading PDF");
      return;
    }

    const url = `http://localhost:5000/api/reports/pdf?startDate=${startDate}&endDate=${endDate}`;
    window.open(url, "_blank");
  };

  return (
    <div className="report-container">
      <h2>Reports</h2>

      {/* ----------------- Date Filter ----------------- */}
      <div className="filter">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={fetchReports}>Generate</button>
      </div>

      {startDate && endDate && (
        <p className="date-range">
          Date Range: {formatDate(startDate)} - {formatDate(endDate)}
        </p>
      )}

      {/* ----------------- Report Cards ----------------- */}
      <div className="cards">
        <div className="card">
          <h4>Sales</h4>
          <p>Orders: {loading ? "Loading..." : sales?.total_orders || 0}</p>
          <p>Total: {loading ? "Loading..." : formatCurrency(sales?.total_sales)}</p>
        </div>

        <div className="card">
          <h4>Purchase</h4>
          <p>
            Total Purchase:{" "}
            {loading ? "Loading..." : formatCurrency(purchase?.total_purchase)}
          </p>
        </div>

        <div className="card profit">
          <h4>Profit</h4>
          <p>{loading ? "Loading..." : formatCurrency(profit?.profit)}</p>
        </div>
      </div>

      {/* ----------------- Download Button ----------------- */}
      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default Reports;