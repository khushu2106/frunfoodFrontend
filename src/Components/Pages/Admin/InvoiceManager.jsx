import React, { useState } from "react";
import axios from "axios";
import "./Invoice.css";

const InvoiceManager = () => {

  const [type, setType] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const token = localStorage.getItem("adminToken");

  const fetchInvoices = async () => {

    if (!startDate || !endDate) {
      setError("Please select date range");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/invoice/${type}`,
        {
          params: { startDate, endDate },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setInvoices(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch invoices");
    }
  };

  const viewAll = () => {
    window.open(
      `http://localhost:5000/api/invoice/${type}-range/all?startDate=${startDate}&endDate=${endDate}&token=${token}`,
      "_blank"
    );
  };

  const printAll = () => {
    window.open(
      `http://localhost:5000/api/invoice/${type}-range/all?startDate=${startDate}&endDate=${endDate}&print=true&token=${token}`,
      "_blank"
    );
  };

  return (
    <div className="invoice-container">
      <h2>Invoice Manager</h2>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="sales">Sales</option>
        <option value="purchase">Purchase</option>
      </select>

      <input type="date" max={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" max={today} value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <button onClick={fetchInvoices}>Fetch</button>
      <button onClick={viewAll}>View All</button>
      <button onClick={printAll}>Print All</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{new Date(inv.date).toLocaleDateString("en-GB")}</td>
              <td>{inv.name}</td>
              <td>₹{inv.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceManager;