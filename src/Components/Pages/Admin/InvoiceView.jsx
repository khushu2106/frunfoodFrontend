import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Invoice.css";

const InvoiceView = () => {
  const { type, id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!token) {
        setError("Admin not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/invoice/${type}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setInvoice(res.data);
      } catch (err) {
        setError("Invoice fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [type, id]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p>Loading invoice...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!invoice) return <p>No invoice found</p>;

  return (
    <div className="invoice-wrapper">
      <div className="invoice-box">

        {/* 🔥 COMPANY NAME */}
        <div className="invoice-company">
          <h1>Fur and Food</h1>
          <p>Ahmedabad, Gujarat</p>
          <p>Email: furandfood@gmail.com</p>
        </div>

        <h2>{type === "sales" ? "Sales Invoice" : "Purchase Invoice"}</h2>

        <div className="invoice-header">
          <p><b>Invoice ID:</b> {invoice.id}</p>
          <p><b>Date:</b> {formatDate(invoice.date)}</p>
          <p><b>{type === "sales" ? "Customer" : "Supplier"}:</b> {invoice.name}</p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
                <td>₹{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <h3>Total: ₹{invoice.total_amount}</h3>
        </div>

        <button onClick={handlePrint} className="print-btn">
          Print Invoice
        </button>

      </div>
    </div>
  );
};

export default InvoiceView;