import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Invoice.css";

const InvoiceView = () => {
  const { type, id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/invoices/${type}/${id}`)
      .then((res) => {
        setInvoice(res.data.invoice);
        setItems(res.data.items);
      });
  }, []);

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="invoice-box">
      <div className="invoice-header">
        <h1>PetShop Pvt Ltd</h1>
        <p>GST: 24ABCDE1234F1Z5</p>
      </div>

      <h3>Invoice #{id}</h3>
      <p>Date: {invoice.s_date || invoice.p_date}</p>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total: ₹{invoice.total_amount}</h2>

      <button onClick={printInvoice}>Print</button>
    </div>
  );
};

export default InvoiceView;