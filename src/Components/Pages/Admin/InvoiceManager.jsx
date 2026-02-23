import React, { useState } from "react";
import axios from "axios";
import "./Invoice.css";

const InvoiceManager = () => {
  const [type, setType] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

const fetchInvoices = async () => {
  setError("");
  const token =  localStorage.getItem("adminToken")

  if (!token) {
    setError("No token found. Please login again.");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.get(
      `http://localhost:5000/api/invoice/${type}`,
      {
        params: { startDate, endDate },
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      }
    );
    setInvoices(res.data);
  } catch (err) {
    console.error(err);
    setError(err.response?.status === 401 ? "Unauthorized: Please Login Again" : "Failed to fetch");
  } finally {
    setLoading(false);
  }
};

  // Date format karne ke liye helper
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  return (
    <div className="invoice-container">
      <h2>Invoice Manager</h2>

      <div className="filter-box">
        <select value={type} onChange={(e) => { setType(e.target.value); setInvoices([]); }}>
          <option value="sales">Sales Invoice</option>
          <option value="purchase">Purchase Invoice</option>
        </select>

        <input type="date" max={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" max={today} value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <button onClick={fetchInvoices} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Invoices"}
        </button>
      </div>

      {error && <p className="error-text" style={{color: "red"}}>{error}</p>}

      {invoices.length > 0 && (
        <table className="invoice-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{formatDate(inv.date)}</td> {/* Readable Date */}
                <td>{inv.name}</td>
                <td>₹{inv.total_amount}</td>
                <td>
                  <a
                    href={`/admin/invoice/${type}/${inv.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-link"
                  >
                    View / Print
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceManager;