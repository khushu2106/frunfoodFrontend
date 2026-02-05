import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignDelivery = ({ order, onClose, onAssigned }) => {
    const [deliveryBoys, setDeliveryBoys] = useState([]);
    const [selectedBoy, setSelectedBoy] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const styles = {
        overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
        modal: { background: "#fff", padding: "25px", borderRadius: "8px", width: "400px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
        select: { width: "100%", padding: "10px", marginTop: "10px", borderRadius: "4px", border: "1px solid #ccc" },
        btnContainer: { marginTop: "20px", textAlign: "right" },
        cancelBtn: { padding: "8px 15px", marginRight: "10px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
        assignBtn: { padding: "8px 15px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }
    };

    useEffect(() => {
        const fetchBoys = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/delivery/boys", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
                });
                // Ensure res.data is an array. If it's an object like {success: true, data: []}, use res.data.data
                setDeliveryBoys(Array.isArray(res.data) ? res.data : res.data.data || []);
            } catch (err) {
                setError("Failed to load delivery boys list.");
            }
        };
        fetchBoys();
    }, []);

    const handleAssign = async () => {
        if (!selectedBoy) {
            setError("Please select a delivery boy");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                "http://localhost:5000/api/admin/delivery/assign",
                { sales_id: order.sales_id, delivery_id: selectedBoy },
                { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
            );
            onAssigned(); 
            onClose();  
        } catch (err) {
            setError("Error assigning delivery. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={{ marginTop: 0 }}>Assign Delivery</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>Assigning Order: <strong>#{order.sales_id}</strong></p>

                <label>Choose Delivery Boy:</label>
                <select 
                    style={styles.select} 
                    value={selectedBoy} 
                    onChange={(e) => setSelectedBoy(e.target.value)}
                >
                    <option value="">-- Select Person --</option>
                    {deliveryBoys.map((boy) => (
                        <option key={boy.delivery_id} value={boy.delivery_id}>
                            {boy.name || boy.Delivery_id} ({boy.vehicle_no || "No Vehicle"})
                        </option>
                    ))}
                </select>

                {error && <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>{error}</p>}

                <div style={styles.btnContainer}>
                    <button type="button" onClick={onClose} style={styles.cancelBtn}>
                        Cancel
                    </button>
                    <button 
                        onClick={handleAssign} 
                        style={styles.assignBtn} 
                        disabled={loading || !selectedBoy}
                    >
                        {loading ? "Assigning..." : "Assign Order"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignDelivery;