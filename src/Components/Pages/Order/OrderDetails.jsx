import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // 🔴 Abhi static data (API later)
  const order = {
    id: orderId,
    date: "22 Jan 2026",
    status: "Confirmed",
    payment: "Paid",
    total: 998,
    address: "Ahmedabad, Gujarat - 382445",
    items: [
      {
        id: 1,
        name: "Dog Chew Toy",
        qty: 2,
        price: 299
      },
      {
        id: 2,
        name: "Pet Food Bowl",
        qty: 2,
        price: 200
      }
    ]
  };

  return (
    <div className="order-details-page">
      <div className="order-card">

        <h1>📦 Order Details</h1>

        <div className="order-info">
          <p><b>Order ID:</b> #{order.id}</p>
          <p><b>Order Date:</b> {order.date}</p>
          <p><b>Order Status:</b> 
            <span className="status confirmed">{order.status}</span>
          </p>
          <p><b>Payment:</b> 
            <span className="paid">{order.payment}</span>
          </p>
        </div>

        <h3>🛍 Products</h3>

        <table className="order-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="order-summary">
          <p><b>Delivery Address:</b> {order.address}</p>
          <h2>Total: ₹{order.total}</h2>
        </div>

        <div className="order-actions">
          <button onClick={() => navigate("/")}>
            Continue Shopping
          </button>

          <button
            className="track"
            onClick={() => alert("Tracking coming soon 🚚")}
          >
            Track Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;