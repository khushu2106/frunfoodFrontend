import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import axios from "axios";

const MyOrders = () => {
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
      setOrders(res.data || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (sales_id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.put(
        `${BASE_URL}/api/sales/cancel/${sales_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      alert("Unable to cancel order");
    }
  };

  const openProduct = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  const canCancel = (status) => {
    return ["placed", "confirmed", "shipped"].includes(status);
  };


  if (loading) return <div className="loading">📦 Loading your orders...</div>;

  return (
    <div className="my-orders-page">
      <div className="container">
        <h1>🛍️ My Orders</h1>

        {orders.map((order) => (
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
                    alt={order.product_name}
                  />
                </div>

                <div
                  className="product-details clickable"
                  onClick={() => openProduct(order.product_id)}
                >
                  <h3>{order.name}</h3>
                  <p>
                    Qty: {order.qty} |total_amout :  ₹{order.total_amount}
                  </p>
                  <span className={`status-badge ${order.order_status}`}>
                    {order.order_status}
                  </span>
                </div>

                <div className="order-actions">
                  <button
                    className="btn-view"
                    onClick={() =>
                      navigate(`/myorders/${order.sales_id}`)
                    }
                  >
                    Track
                  </button>

                  {canCancel(order.order_status) && (
                    <button
                      className="btn-cancel"
                      onClick={() => cancelOrder(order.sales_id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
