import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.successMessage || "";

  const fetchSuppliers = async () => {
    const res = await axios.get("http://localhost:5000/api/suppliers");
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
    fetchSuppliers();
  };

  return (
    <div style={containerStyle}>
      <h3>Suppliers</h3>

      <button
        onClick={() => navigate("/admin/add-supplier")}
        style={primaryBtn}
      >
        + Add Supplier
      </button>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.supplier_id}>
              <td>{s.fname} {s.lname}</td>
              <td>{s.mobile_no}</td>
              <td>{s.email}</td>
              <td>
                <button
                  onClick={() => deleteSupplier(s.supplier_id)}
                  style={deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const containerStyle = {
  padding: "20px",
  background: "#fff",
  borderRadius: "8px"
};

const primaryBtn = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "10px"
};

const deleteBtn = {
  backgroundColor: "red",
  color: "#fff",
  padding: "5px 10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

export default ViewSuppliers;