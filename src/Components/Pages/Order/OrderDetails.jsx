import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    axios.get(`http://localhost:5000/api/sales/details/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrder(res.data))
    .catch(err => console.error(err));
  }, [id]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="order-details-page">

      <div className="order-header">
        <h2>Order #{order.sales_id}</h2>
        <p><b>Status:</b> {order.order_status}</p>
        <p><b>Date:</b> {new Date(order.S_date).toLocaleDateString()}</p>
      </div>

      <div className="order-products">
        {order.items.map(item => (
          <div className="order-product-card" key={item.product_id}>
            <img
              src={`http://localhost:5000/${item.image_url}`}
              alt={item.name}
            />

            <div className="order-product-info">
              <h4>{item.name}</h4>
              <p>{item.description}</p>

              <div className="order-product-meta">
                <span>Qty: {item.qty}</span>
                <span>₹{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-total">
        Grand Total: ₹{order.total_amount}
      </div>

    </div>
  );
};

export default OrderDetails;
