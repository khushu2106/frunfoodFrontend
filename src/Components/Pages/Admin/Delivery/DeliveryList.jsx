import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryList = () => {
    const [deliveryBoys, setDeliveryBoys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Delivery boys fetch karne ka function
    const fetchDeliveryBoys = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/admin/delivery/boys", {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}` 
                }
            });
            setDeliveryBoys(res.data);
        } catch (err) {
            setError("There are some error to fetch delivery boy list.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeliveryBoys();
    }, []);

    // Inline Styles
    const styles = {
        container: { padding: "20px", fontFamily: "Arial, sans-serif" },
        table: { width: "100%", borderCollapse: "collapse", marginTop: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
        th: { backgroundColor: "#1f2937", color: "white", padding: "12px", textAlign: "left" },
        td: { padding: "12px", borderBottom: "1px solid #ddd" },
        statusActive: { color: "green", fontWeight: "bold" },
        statusInactive: { color: "red", fontWeight: "bold" }
    };

    return (
        <div style={styles.container}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Delivery boy List</h2>
                <button 
                    onClick={fetchDeliveryBoys} 
                    style={{ padding: "8px 15px", cursor: "pointer", borderRadius: "4px", border: "1px solid #007bff", background: "none", color: "#007bff" }}
                >
                    Refresh List
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? (
                <p>Loading Delivery Boys...</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Phone Number</th>
                            <th style={styles.th}>Vehicle No</th>
                            <th style={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryBoys.length > 0 ? (
                            deliveryBoys.map((boy) => (
                                <tr key={boy.delivery_id}>
                                    <td style={styles.td}>#{boy.delivery_id}</td>
                                    <td style={styles.td}><strong>{boy.fname}</strong></td>
                                    <td style={styles.td}>{boy.mobile_no|| "N/A"}</td>
                                    <td style={styles.td}>{boy.vehicle_no}</td>
                                    <td style={styles.td}>
                                        <span style={boy.status === 'active' ? styles.statusActive : styles.statusInactive}>
                                            {boy.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No delivery boys found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DeliveryList;