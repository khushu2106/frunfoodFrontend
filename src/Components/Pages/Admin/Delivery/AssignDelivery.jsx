import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Delivery.css";

const AssignOrder = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState({});

  // Fetch Pending Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/pending-orders"
      );
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch Delivery Boys
  const fetchDeliveryBoys = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/delivery-boys"
      );
      setDeliveryBoys(res.data.data);
    } catch (error) {
      console.error("Error fetching delivery boys:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchDeliveryBoys();
  }, []);

  // Handle Assign
  const handleAssign = async (orderId) => {
    const deliveryBoyId = selectedDelivery[orderId];

    if (!deliveryBoyId) {
      alert("Please select delivery boy");
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/admin/assign-order", {
        orderId,
        deliveryBoyId,
      });

      alert("Order Assigned Successfully");
      fetchOrders(); 
    } catch (error) {
      console.error("Assignment error:", error);
    }
  };

  return (
    <div className="assign-container">
      <h2>Assign Orders</h2>

      <div className="table-wrapper">
        <table className="assign-table">
          <thead>
            <tr>
              <th>Order ID</th>
              {/* <th>Invoice</th> */}
              <th>Amount</th>
              <th>Date</th>
              <th>Select Delivery Boy</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  {/* <td>{order.invoice_no}</td> */}
                  <td>₹ {order.grand_total}</td>
                  <td>
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                  <td>
                    <select
                      onChange={(e) =>
                        setSelectedDelivery({
                          ...selectedDelivery,
                          [order.order_id]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      {deliveryBoys.map((boy) => (
                        <option key={boy.id} value={boy.id}>
                          {boy.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <button
                      className="assign-btn"
                      onClick={() => handleAssign(order.order_id)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No Pending Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignOrder;