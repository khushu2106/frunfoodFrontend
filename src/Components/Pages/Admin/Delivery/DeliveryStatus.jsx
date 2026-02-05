import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Delivery.css"; 

const DeliveryStatus = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                // Ye API aapke backend mein honi chahiye jo sales aur delivery_partners ko join kare
                const res = await axios.get("http://localhost:5000/api/admin/delivery-status", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
                });
                setDeliveries(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching delivery status:", err);
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    if (loading) return <div className="loader">Loading Delivery Status...</div>;

    return (
        <div className="delivery-status-container">
            <h2>Track All Deliveries</h2>
            
            <div className="status-table-wrapper">
                <table className="status-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Delivery Partner</th>
                            <th>Vehicle No.</th>
                            <th>Current Status</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.length > 0 ? (
                            deliveries.map((item) => (
                                <tr key={item.sales_id}>
                                    <td>#{item.sales_id}</td>
                                    <td>{item.customer_name || 'N/A'}</td>
                                    <td>
                                        <div className="boy-info">
                                            <strong>{item.delivery_boy_name}</strong>
                                            <span>{item.phone}</span>
                                        </div>
                                    </td>
                                    <td>{item.vehicle_no}</td>
                                    <td>
                                        <span className={`status-pill ${item.order_status?.toLowerCase().replace(/ /g, '_')}`}>
                                            {item.order_status}
                                        </span>
                                    </td>
                                    <td>{new Date(item.updated_at || item.s_date).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{textAlign: 'center'}}>No delivery data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryStatus;