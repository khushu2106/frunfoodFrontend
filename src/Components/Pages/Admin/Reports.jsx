import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./Reports.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Reports() {

  const [type, setType] = useState("sales");
  const [period, setPeriod] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const noPeriodReports = ["stock", "low_stock", "out_of_stock"];

  const fetchReport = async () => {
    try {
      let url = `http://localhost:5000/api/reports?type=${type}`;

      // if (!noPeriodReports.includes(type)) {
      //   url += `&period=${period}`;
      // }
      if (!noPeriodReports.includes(type)) {
        url += `&period=${period}`;
        if (startDate && endDate) {
          url += `&start_date=${startDate}&end_date=${endDate}`;
        }
      }

      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "No data found");
      }

      setData(result);
      setError("");

    } catch (err) {
      setError(err.message);
      setData([]);
    }
  };

  const downloadPDF = () => {
    let url = `http://localhost:5000/api/reports/pdf?type=${type}`;

    if (!noPeriodReports.includes(type)) {
      url += `&period=${period}`;
      if (startDate && endDate) {
        url += `&start_date=${startDate}&end_date=${endDate}`;
      }
    }

    window.open(url, "_blank");
  };

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);

    // Reset custom dates when switching to predefined periods
    if (newPeriod !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  };

  // ================= CHART DATA =================
  const generateChartData = () => {
    if (!data || data.length === 0) return null;

    const keys = Object.keys(data[0]);
    let labelKey = "";
    let valueKey = "";

    switch (type) {
      case "sales":
        labelKey = "name";
        valueKey = "total_Revenue";
        break;
      case "orders":
      case "cancelled_orders":
      case "returned_orders":
      case "delivery":
        labelKey = "customer";
        valueKey = keys.includes("grand_total") ? "grand_total" : "total_amount";
        break;
      case "customers":
        labelKey = "name";
        valueKey = "total_Orders";
        break;
      case "products":
        labelKey = "name";
        valueKey = "revenue";
        break;
      case "payments":
        labelKey = "payment_mode";
        valueKey = "total_Amount";
        break;
      case "feedback":
        labelKey = "product";
        valueKey = "rate";
        break;
      case "offers":
        labelKey = "name"; // Product Name
        valueKey = "discount_value";
        break;
      case "stock":
      case "low_stock":
      case "out_of_stock":
        labelKey = "name";
        valueKey = keys.includes("stock") ? "stock" : "price";
        break;
      case "category_report":
        labelKey = "category_name";
        valueKey = "revenue";
        break;
      case "brand_report":
        labelKey = "name";
        valueKey = "revenue";
        break;
      case "subcategory_report":
        labelKey = "name";
        valueKey = "revenue";
        break;
      default:
        labelKey = keys[0];
        valueKey = keys[1];
    }

    const chartLimit = data.slice(0, 10);
    const chartLabels = chartLimit.map(item => item[labelKey]?.toString() || "N/A");
    const chartValues = chartLimit.map(item => {
      const val = parseFloat(item[valueKey]);
      return isNaN(val) ? 0 : val;
    });

    return {
      labels: chartLabels,
      datasets: [
        {
          label: `${type.toUpperCase()} (${valueKey.replace(/_/g, ' ')})`,
          data: chartValues,
          backgroundColor: [
            "rgba(99, 102, 241, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(139, 92, 246, 0.7)",
          ],
          borderColor: "#ffffff",
          borderWidth: 1.5,
        },
      ],
    };
  };
  // ================= CHART OPTIONS (Visual Fix) =================
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Isse chart container ke hisaab se fit hoga
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount / Count' }
      }
    }
  };

  const chartData = generateChartData();

  return (
    <div className="reports-wrapper">

      <div className="reports-header">
        <h1>📊 Reports Dashboard</h1>
        <p>Business Insights & Analytics</p>
      </div>

      <div className="filter-bar">

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="sales">Sales</option>
          {/* <option value="orders">Orders</option> */}
          <option value="customers">Customers</option>
          <option value="products">Products</option>
          <option value="payments">Payments</option>
          <option value="feedback">Feedback</option>
          <option value="cancelled_orders">Cancelled Orders</option>
          <option value="offers">Offers</option>
          <option value="stock">Stock</option>
          <option value="category_report">Category </option>
          <option value="brand_report">Brand</option>
          <option value="subcategory_report">Subcategory</option>
          {/* <option value="delivery">Delivery</option> */}
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out Of Stock</option>
          <option value="returned_orders">Returned Orders</option>
        </select>

        {!noPeriodReports.includes(type) && (
          <>
            <select value={period} onChange={handlePeriodChange}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Range</option>
            </select>

            {period === "custom" && (
              <div className="date-range-container">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  max={endDate || new Date().toISOString().split('T')[0]}
                />
                <span>to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
          </>
        )}

        <button className="btn-generate" onClick={fetchReport}>
          Generate
        </button>

        <button className="btn-pdf" onClick={downloadPDF}>
          Download PDF
        </button>

      </div>

      {error && <div className="error-box">{error}</div>}

      {/* ================= CHART SECTION ================= */}

      {chartData && (
        <div className="chart-section">

          <div className="chart-card">
            <Bar data={chartData} />
          </div>

          <div className="chart-card">
            <Pie data={chartData} />
          </div>

        </div>
      )}

      {/* ================= TABLE ================= */}

      {data.length > 0 && (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value?.toString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default Reports;