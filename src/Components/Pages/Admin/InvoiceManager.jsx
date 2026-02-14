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
    setInvoices([]);

    // 🔴 VALIDATIONS
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    if (startDate > endDate) {
      setError("Start date cannot be greater than End date");
      return;
    }

    if (startDate > today || endDate > today) {
      setError("Future dates are not allowed");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/invoices`,
        {
          params: {
            type,
            startDate,
            endDate
          }
        }
      );

      if (res.data.length === 0) {
        setError("No invoices found for selected dates");
      }

      setInvoices(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice-container">
      <h2>Invoice Manager</h2>

      {/* FILTER BOX */}
      <div className="filter-box">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setInvoices([]);
          }}
        >
          <option value="sales">Sales Invoice</option>
          <option value="purchase">Purchase Invoice</option>
        </select>

        <input
          type="date"
          max={today}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          max={today}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={fetchInvoices} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Invoices"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="error-text">{error}</p>}

      {/* TABLE */}
      {invoices.length > 0 && (
        <table className="invoice-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Total</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.name}</td>
                <td>₹{inv.total_amount}</td>
                <td>
                  <a
                    href={`/admin/invoice/${type}/${inv.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
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