import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminReturns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("userToken"); // Token key check karein (userToken ya token)

  const BASE_URL = "http://localhost:5000";

  const fetchReturns = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/return`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReturns(res.data);
    } catch (err) {
      console.error("Error fetching returns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleAction = async (id, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this return?`)) return;
    try {
      await axios.put(
        `${BASE_URL}/api/return/${id}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Return ${action}ed successfully!`);
      fetchReturns();
    } catch (err) {
      alert(err.response?.data?.error || "Action failed");
    }
  };

  const filteredReturns = returns.filter(item =>
    item.return_id?.toString().includes(searchTerm) ||
    item.sales_id?.toString().includes(searchTerm) ||
    item.fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.return_status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ padding: "20px" }}>Loading returns...</div>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>📦 Manage Customer Returns</h2>

      <input
        type="text"
        placeholder="Search by ID, Order, Customer, Product or Status..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchStyle}
      />

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={theadStyle}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReturns.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>No return requests found.</td></tr>
            ) : (
              filteredReturns.map((item) => (
                <tr key={item.return_id} style={trStyle}>
                  <td style={tdStyle}>#{item.return_id}</td>
                  <td style={tdStyle}>#{item.sales_id}</td>
                  <td style={tdStyle}>{item.fname || "Guest"}</td>
                  <td style={tdStyle}>
                    <strong>{item.name}</strong>
                  </td>
                  <td style={tdStyle}>{item.return_reason}</td>
                  <td style={tdStyle}>
                    <span style={statusBadge(item.return_status)}>
                      {item.return_status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {item.return_status === "requested" ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={() => handleAction(item.return_id, "approve")}
                          style={btnStyle("#28a745")}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(item.return_id, "reject")}
                          style={btnStyle("#dc3545")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: "#7f8c8d", fontSize: "12px" }}>Processed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = { padding: "30px", backgroundColor: "#f4f7f6", minHeight: "100vh" };
const headerStyle = { marginBottom: "20px", color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: "10px" };
const tableContainerStyle = { backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", overflowX: "auto" };
const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "900px" };
const thStyle = { padding: "15px", textAlign: "left", backgroundColor: "#34495e", color: "#fff", fontWeight: "600" };
const tdStyle = { padding: "15px", borderBottom: "1px solid #eee" };
const trStyle = { transition: "background 0.3s" };
const theadStyle = { position: "sticky", top: 0 };

const statusBadge = (status) => ({
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase",
  backgroundColor: status === "requested" ? "#fff3cd" : status === "approved" ? "#d4edda" : "#f8d7da",
  color: status === "requested" ? "#856404" : status === "approved" ? "#155724" : "#721c24",
});

const btnStyle = (bg) => ({
  backgroundColor: bg,
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "13px"
});

const searchStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

export default AdminReturns;