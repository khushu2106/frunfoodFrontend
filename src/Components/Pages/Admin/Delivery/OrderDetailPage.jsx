import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./OrderDetailPage.css";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/admin/order/${id}`);
                // Aapke JSON structure ke hisaab se:
                setOrder(res.data.order);
                setItems(res.data.items);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching order:", error);
                setLoading(false);
            }
        };

        if (id) fetchOrder();
    }, [id]);

    if (loading) return <div className="loader">Loading Order Details...</div>;
    if (!order) return <div className="error">Order not found!</div>;

    return (
        <div className="order-container">
            <h2>Order Details: #{order.sales_id}</h2>

            <div className="order-grid">
                {/* LEFT COLUMN: Items Table */}
                <div className="order-left">
                    <h3>Items Summary</h3>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td className="product-cell">
                                        <img
                                            src={`http://localhost:5000/${item.image_url}`}
                                            alt={item.name}
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/60?text=No+Img";
                                            }}
                                        />
                                        <span>{item.name}</span>
                                    </td>
                                    <td>₹{parseFloat(item.price).toLocaleString()}</td>
                                    <td>{item.qty || order.qty}</td>
                                    <td>
                                        ₹{(parseFloat(item.price) * (item.qty || order.qty)).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* RIGHT COLUMN: Order Summary & Address */}
                <div className="order-right">
                    <div className="summary-card">
                        <h3>Order Summary</h3>
                        <p><b>Payment Mode:</b> {order.payment_mode}</p>
                        {/* <p><b>Status:</b> <span style={{color: '#e67e22', fontWeight: 'bold'}}>{order.payment_status}</span></p> */}
                        <h4>Grand Total: ₹{parseFloat(order.total_amount).toLocaleString()}</h4>
                    </div>

                    <div className="address-card">
                        <h3>Shipping Address</h3>
                        <p><b>Customer:</b> {order.customer}</p>
                        <p><b>Address:</b> {order.address1}</p>
                        <p><b>Mobile:</b> {order.mobile_no}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;