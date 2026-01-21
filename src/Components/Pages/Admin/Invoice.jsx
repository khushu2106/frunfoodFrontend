import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { div } from "framer-motion/client";

const Invoice = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/invoice/${id}`)
            .then(res => setInvoice(res.data))
            .catch(err => console.error(err));
    }, [id])

    if (!invoice) return <div>Loading Invoice ... </div>;

    const { order, items } = invoice;
    return (
        <div style={{ padding: "20px", background: "#fff" }}>
            <h2>Invoice #{order.sales_id}</h2>
            <p><b>Customer:</b> {order.name}</p>
            <p><b>Date:</b> {order.s_date}</p>

            <table width="100%" border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>₹{item.price}</td>
                            <td>₹{item.total_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
<hr></hr>
            <h3>Summary</h3>
            <p>Subtotal: ₹{order.total_amount}</p>
            <p>CGST: ₹{order.cgst}</p>
            <p>SGST: ₹{order.sgst}</p>
            <p>Shipping: ₹{order.shipping_charge}</p>
            <h2>Grand Total: ₹{order.grand_total || order.total_amount}</h2>

            <button onClick={() => window.print()}>Print / Download Invoice</button>
        </div>
    )
}

export default Invoice;