// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { div } from "framer-motion/client";

// const Invoice = () => {
//     const { id } = useParams();
//     const [invoice, setInvoice] = useState(null);

//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/admin/invoice/${id}`)
//             .then(res => setInvoice(res.data))
//             .catch(err => console.error(err));
//     }, [id])

//     if (!invoice) return <div>Loading Invoice ... </div>;

//     const { order, items } = invoice;
//     return (
//         <div style={{ padding: "20px", background: "#fff" }}>
//             <h2>Invoice #{order.sales_id}</h2>
//             <p><b>Customer:</b> {order.name}</p>
//             <p><b>Date:</b> {order.s_date}</p>

//             <table width="100%" border="1" cellPadding="8">
//                 <thead>
//                     <tr>
//                         <th>Product</th>
//                         <th>Qty</th>
//                         <th>Price</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {items.map((item, i) => (
//                         <tr key={i}>
//                             <td>{item.name}</td>
//                             <td>{item.qty}</td>
//                             <td>₹{item.price}</td>
//                             <td>₹{item.total_amount}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
// <hr></hr>
//             <h3>Summary</h3>
//             <p>Subtotal: ₹{order.total_amount}</p>
//             <p>CGST: ₹{order.cgst}</p>
//             <p>SGST: ₹{order.sgst}</p>
//             <p>Shipping: ₹{order.shipping_charge}</p>
//             <h2>Grand Total: ₹{order.grand_total || order.total_amount}</h2>

//             <button onClick={() => window.print()}>Print / Download Invoice</button>
//         </div>
//     )
// }

// export default Invoice;

import React, { useState } from "react";

const Invoice = () => {
  const [invoices] = useState([
    { id: "INV001", orderId: 101, customer: "Riya Patel", amount: 1200, date: "2026-01-10", status: "Paid" },
    { id: "INV002", orderId: 102, customer: "Amit Shah", amount: 850, date: "2026-01-12", status: "Pending" },
    { id: "INV003", orderId: 103, customer: "Neha Joshi", amount: 2100, date: "2026-01-15", status: "Paid" }
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoice Management</h2>

      <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "8px", marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Invoice No</th>
              <th style={th}>Order ID</th>
              <th style={th}>Customer</th>
              <th style={th}>Amount</th>
              <th style={th}>Date</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td style={td}>{inv.id}</td>
                <td style={td}>{inv.orderId}</td>
                <td style={td}>{inv.customer}</td>
                <td style={td}>₹{inv.amount}</td>
                <td style={td}>{inv.date}</td>
                <td style={td}>{inv.status}</td>
                <td style={td}>
                  <button style={btn}>View</button>
                  <button style={btn}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const th = { borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" };
const td = { padding: "8px" };
const btn = { marginRight: "5px", padding: "5px 10px", cursor: "pointer" };

export default Invoice;
