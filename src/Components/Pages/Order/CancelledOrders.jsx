import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Order.css";

const CancelledOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = "http://localhost:5000";
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/sales/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const CancelledOrders = res.data.filter(
                (order) => order.order_status === "cancelled"
            );
            setOrders(CancelledOrders);
        } catch (err) {
            console.log("Fetch cancelled orders error :", err);
        } finally {
            setLoading(false);
        }
    };

    const openProduct = (product_id) => {
        navigate(`/product/${product_id}`);
    };

    if (loading) return <div className="loading">Loading cancelled orders...</div>;

    <div className="my-orders-page">
        <div className="container">
            <h1>❌ Cancelled Orders</h1>

            {orders.length === 0 ? (
                <p className="no-orders">No cancelled orders found.</p>
            ) : (
                orders.map((order) => (
                    <div className="order-main-card" key={order.sales_id}>

                        <div className="order-header">
                            <div>
                                <strong>
                                    {new Date(order.s_date).toLocaleDateString()}
                                </strong>
                            </div>
                            <div>
                                <strong>₹{order.total_amount}</strong>
                            </div>
                            <div className="order-id-label">
                                Order #{order.sales_id}
                            </div>
                        </div>

                        <div className="order-content">
                            <div className="product-row">

                                <div
                                    className="product-img-box clickable"
                                    onClick={() => openProduct(order.product_id)}
                                >
                                    <img
                                        src={
                                            order.image_url
                                                ? `${BASE_URL}/${order.image_url}`
                                                : "/no-image.png"
                                        }
                                        alt={order.name}
                                    />
                                </div>

                                <div
                                    className="product-details clickable"
                                    onClick={() => openProduct(order.product_id)}
                                >
                                    <h3>{order.name}</h3>
                                    <p>
                                        Qty: {order.qty} | Total: ₹{order.total_amount}
                                    </p>

                                    <span className="status-badge cancelled">
                                        Cancelled
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                ))
            )}
        </div>
    </div>
}

export default CancelledOrders;