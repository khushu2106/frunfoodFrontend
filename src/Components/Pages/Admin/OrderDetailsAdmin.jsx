import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetailsAdmin = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/admin/orders/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrder(res.data.order);
      setItems(res.data.items);

    } catch (error) {
      console.log(error);
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: "25px" }}>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          border: "none",
          background: "transparent",
          cursor: "pointer"
        }}
      >
        ← Back To Orders
      </button>

      <h2>Order #{order.sales_id}</h2>
      <p>Placed on {order.s_date}</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        {/* LEFT SIDE */}
        <div style={{ flex: 3, background: "#fff", padding: "20px", borderRadius: "10px" }}>

          <h3>Items Summary</h3>

          <table style={{ width: "100%", marginTop: "15px" }}>
            <thead>
              <tr>
                <th align="left">Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (

                <tr key={item.id}>

                  <td>{item.product_name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.total}</td>

                </tr>

              ))}
            </tbody>
          </table>

          <hr />

          <h4>Subtotal : ₹{order.total_amount}</h4>
          <h3>Grand Total : ₹{order.total_amount}</h3>

        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 1 }}>

          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}>

            <h4>Manage Progress</h4>

            <select style={{ width: "100%", padding: "8px", marginTop: "10px" }}>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="out_for_delivery">Out For Delivery</option>
              <option value="delivered">Delivered</option>
            </select>

            <button
              style={{
                marginTop: "10px",
                width: "100%",
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius: "5px"
              }}
            >
              Update Status
            </button>

          </div>

          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px"
          }}>

            <h4>Customer Detail</h4>

            <p>{order.fname}</p>
            <p>{order.email}</p>
            <p>{order.mobile_no}</p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetailsAdmin;