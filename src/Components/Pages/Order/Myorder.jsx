import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

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
        `${BASE_URL}/api/sales/${sales_id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  const returnOrder = async (sales_id, product_id) => {
    console.log("Front-end Sending:", { sales_id, product_id });
    const reason = prompt("Please enter return reason:");
    if (!reason) return;

    try {
      await axios.post(
        `${BASE_URL}/api/return/${sales_id}`,
        {
          sales_id,       // Sales ID
          product_id,     // Specific Product ID
          reason
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Return request submitted successfully");
      fetchOrders(); // List refresh karein
    } catch (err) {
      alert(err.response?.data?.message || "Return request failed");
    }
  };

  // --- Logic Helpers ---
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "active") {
      return order.order_status !== "cancelled" && order.order_status !== "delivered";
    } else if (activeTab === "cancelled") {
      return order.order_status === "cancelled";
    } else if (activeTab === "history") {
      return order.order_status === "delivered";
    }
    return true;
  });

  const getStepProgress = (status) => {
    const steps = ["placed", "confirmed", "shipped", "delivered"];
    return steps.indexOf(status);
  };

  const canCancel = (status) => status === "placed" || status === "confirmed";
  const canReturn = (status) => status === "delivered";
  const openProduct = (id) => navigate(`/product/${id}`);

  // --- Styles ---
  const styles = {
    page: { backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Segoe UI', sans-serif" },
    container: { maxWidth: "900px", margin: "0 auto" },
    header: { fontSize: "28px", fontWeight: "700", marginBottom: "30px", color: "#2d3436", textAlign: "center" },
    tabContainer: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px", backgroundColor: "#eee", padding: "5px", borderRadius: "12px" },
    tabBtn: (isActive) => ({
      padding: "10px 20px", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600",
      backgroundColor: isActive ? "#fff" : "transparent",
      color: isActive ? "#007bff" : "#636e72",
      boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
    }),
    orderCard: { backgroundColor: "#fff", borderRadius: "15px", overflow: "hidden", marginBottom: "25px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)", border: "1px solid #f1f1f1" },
    cardHeader: { padding: "15px 20px", backgroundColor: "#fcfcfc", borderBottom: "1px solid #f1f1f1", display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#636e72" },
    content: { padding: "20px", display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" },
    imgBox: { width: "100px", height: "100px", borderRadius: "10px", overflow: "hidden", border: "1px solid #eee", cursor: "pointer" },
    img: { width: "100%", height: "100%", objectFit: "cover" },
    details: { flex: 1, minWidth: "200px" },
    title: { margin: "0 0 5px 0", fontSize: "18px", color: "#2d3436", cursor: "pointer" },
    badge: (status) => {
      let bg = "#dfe6e9"; let color = "#2d3436";
      if (status === "delivered") { bg = "#e3fcef"; color = "#00b894"; }
      if (status === "cancelled") { bg = "#fff0f0"; color = "#ff7675"; }
      if (status === "placed" || status === "confirmed") { bg = "#e8f2ff"; color = "#0984e3"; }
      return { padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", backgroundColor: bg, color: color };
    },
    actions: { display: "flex", gap: "10px" },
    btn: (type) => ({
      padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "13px",
      backgroundColor: type === "cancel" ? "#ff7675" : "#0984e3", color: "#fff"
    }),
    // Tracking Bar Styles
    trackerWrap: { display: "flex", justifyContent: "space-between", padding: "20px", borderTop: "1px dashed #eee", backgroundColor: "#fafafa" }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>📦 Loading your orders...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>🛍️ My Orders</h1>

        <div style={styles.tabContainer}>
          {["active", "cancelled", "history"].map((tab) => (
            <button key={tab} style={styles.tabBtn(activeTab === tab)} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Orders
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#b2bec3" }}>No {activeTab} orders found.</div>
        ) : (
          filteredOrders.map((order) => (
            <div style={styles.orderCard} key={`${order.sales_id}-${order.product_id}`}>
              <div style={styles.cardHeader}>
                <span>📅 {new Date(order.s_date).toLocaleDateString()}</span>
                <span>Order ID: <b>#{order.sales_id}</b></span>
                <span style={{ color: "#2d3436", fontWeight: "700" }}>₹{order.price}</span>
              </div>

              <div style={styles.content}>
                <div style={styles.imgBox} onClick={() => openProduct(order.product_id)}>
                  <img style={styles.img} src={order.image_url ? `${BASE_URL}/${order.image_url}` : "/no-image.png"} alt={order.name} />
                </div>

                <div style={styles.details}>
                  <h3 style={styles.title} onClick={() => openProduct(order.product_id)}>{order.name}</h3>
                  <p style={{ color: "#636e72", fontSize: "14px", margin: "5px 0" }}>Qty: {order.qty}</p>
                  <span style={styles.badge(order.order_status)}>{order.order_status}</span>
                </div>

                <div style={styles.actions}>
                  {activeTab === "cancelled" && (
                    <button style={styles.btn("reorder")} onClick={() => openProduct(order.product_id)}>🔄 Re-order</button>
                  )}
                  {canCancel(order.order_status) && (
                    <button style={styles.btn("cancel")} onClick={() => cancelOrder(order.sales_id)}>Cancel Order</button>
                  )}
                  {canReturn(order.order_status) && (
                    <button
                      style={{
                        ...styles.btn("return"),
                        backgroundColor: order.is_returned > 0 ? "#bdc3c7" : "#0984e3", // Grey color if returned
                        cursor: order.is_returned > 0 ? "not-allowed" : "pointer",
                        opacity: order.is_returned > 0 ? 0.7 : 1
                      }}
                      onClick={() => returnOrder(order.sales_id, order.product_id)}
                      disabled={order.is_returned > 0} // Button disable ho jayega
                    >
                      {order.is_returned > 0 ? "✅ Return Requested" : "Return Order"}
                    </button>
                  )}
                </div>
              </div>

              {/* --- TRACKING PROGRESS BAR (Only for Active/History) --- */}
              {order.order_status !== "cancelled" && (
                <div style={styles.trackerWrap}>
                  {["Placed", "Confirmed", "Shipped", "Delivered"].map((step, index) => {
                    const isActive = index <= getStepProgress(order.order_status);
                    return (
                      <div key={step} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                        {/* Dot */}
                        <div style={{
                          width: '14px', height: '14px',
                          backgroundColor: isActive ? '#007bff' : '#e0e0e0',
                          borderRadius: '50%', margin: '0 auto 8px',
                          zIndex: 2, position: 'relative', border: '3px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}></div>
                        {/* Label */}
                        <span style={{ fontSize: '10px', color: isActive ? '#333' : '#aaa', fontWeight: isActive ? '700' : '400', textTransform: 'uppercase' }}>
                          {step}
                        </span>
                        {/* Connecting Line */}
                        {index < 3 && (
                          <div style={{
                            position: 'absolute', top: '7px', left: '50%', width: '100%', height: '2px',
                            backgroundColor: index < getStepProgress(order.order_status) ? '#007bff' : '#e0e0e0',
                            zIndex: 1
                          }}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;