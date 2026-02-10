import React, { useState } from "react";
import axios from "axios";

const InvoiceManager = () => {
  const [type, setType] = useState("sales"); // sales or purchase
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const fetchInvoices = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    if (startDate > endDate) {
      alert("Start date cannot be after End date");
      return;
    }

    if (startDate > today || endDate > today) {
      alert("Future dates are not allowed");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/invoice/${type}?startDate=${startDate}&endDate=${endDate}`
      );
      setInvoices(res.data);
    } catch (err) {
      console.error("Invoice fetch error:", err);
      alert("Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  const viewInvoice = (id) => {
    window.open(`/admin/invoice/${type}/${id}`, "_blank");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoice Manager</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="sales">Sales Invoice</option>
          <option value="purchase">Purchase Invoice</option>
        </select>

        <input
          type="date"
          value={startDate}
          max={today}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          max={today}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={fetchInvoices}>Fetch Invoices</button>
      </div>

      {/* Invoice List */}
      {loading ? (
        <p>Loading invoices...</p>
      ) : invoices.length === 0 ? (
        <p>No invoices found for selected criteria</p>
      ) : (
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Customer / Supplier</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.sales_id || inv.purchase_id}>
                <td>{inv.sales_id || inv.purchase_id}</td>
                <td>{inv.s_date || inv.p_date}</td>
                <td>{inv.name || inv.supplier_name}</td>
                <td>₹{inv.total_amount}</td>
                <td>
                  <button
                    onClick={() =>
                      viewInvoice(inv.sales_id || inv.purchase_id)
                    }
                  >
                    View / Print
                  </button>
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
