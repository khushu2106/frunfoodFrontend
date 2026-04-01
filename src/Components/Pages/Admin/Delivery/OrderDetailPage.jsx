import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./OrderDetailPage.css";

const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchOrder();
    }, [])

    const fetchOrder = async () => {
        const res = await axios.get(`http://localhost:5000/api/admin/order/${id}`);
        setOrder(res.data.order);
        setItems(res.data.items);
    }

    return (

        <div className="order-container">

            <h2>Order #{id}</h2>

            <div className="order-grid">

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

                            {items.map((item) => (
                                <tr key={item.id}>

                                    <td className="product-cell">

                                        <img
                                            src={`http://localhost:5000/uploads/${item.image}`}
                                            alt=""
                                        />

                                        <span>{item.product_name}</span>

                                    </td>

                                    <td>₹{item.price}</td>

                                    <td>{item.qty}</td>

                                    <td>₹{item.total}</td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="order-right">

                    <div className="summary-card">

                        <h3>Order Summary</h3>

                        <p>Subtotal : ₹{order.subtotal}</p>
                        <p>Shipping : ₹{order.shipping}</p>

                        <h4>Grand Total : ₹{order.grand_total}</h4>

                    </div>

                    <div className="address-card">

                        <h3>Shipping Address</h3>

                        <p>{order.customer_name}</p>
                        <p>{order.address1}</p>
                        <p><b>Mobile no: </b>{order.mobile_no}</p>

                    </div>

                    <div className="status-card">

                        <h3>Manage Progress</h3>

                        <select>

                            <option>Pending</option>
                            <option>Assigned</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>

                        </select>

                        <button className="update-btn">
                            Update Status
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default OrderDetails;