import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Add.css";

function AddBatches() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [formData, setFormData] = useState({
    product_id: "",
    purchase_id: "",
    batch_no: "",
    mfg_date: "",
    exp_date: "",
    qty: "",
    purchase_price: ""
  });

  useEffect(() => {
    fetchBatches();
    fetchProductsAndPurchases();
  }, []);

  const fetchBatches = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/admin/batches")
      .then(res => {
        const formatted = res.data.map(batch => ({
          ...batch,
          start_date: batch.start_date.split("T")[0],
          end_date: batch.end_date.split("T")[0]
        }));
        setBatches(formatted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchProductsAndPurchases = () => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/purchases")
      .then(res => setPurchases(res.data))
      .catch(err => console.error(err));
  };

  const validateForm = () => {
    const today = new Date().toISOString().split("T")[0];
    const { product_id, purchase_id, batch_no, mfg_date, exp_date, qty, purchase_price } = formData;

    if (!product_id || !purchase_id || !batch_no || !mfg_date || !exp_date || !qty || !purchase_price) {
      alert("All fields are required");
      return false;
    }
    if (mfg_date > today) {
      alert("Manufacturing date cannot be in the future");
      return false;
    }
    if (exp_date <= mfg_date) {
      alert("Expiry date must be after manufacturing date");
      return false;
    }
    if (qty <= 0) {
      alert("Quantity must be greater than zero");
      return false;
    }
    if (purchase_price <= 0) {
      alert("Purchase price must be greater than zero");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios.post("http://localhost:5000/api/admin/batches/add", formData)
      .then(res => {
        alert(res.data.message);
        setFormData({
          product_id: "",
          purchase_id: "",
          batch_no: "",
          mfg_date: "",
          exp_date: "",
          qty: "",
          purchase_price: ""
        });
        fetchBatches();
      })
      .catch(err => {
        console.error(err);
        alert("Failed to add batch");
      });
  };

  if (loading) return <p>Loading batches...</p>;

  return (
    <div className="add-batches-container">
      <h2>Add New Batch</h2>
      <form className="batch-form" onSubmit={handleSubmit}>
        <select
          value={formData.product_id}
          onChange={e => setFormData({ ...formData, product_id: e.target.value })}
          required
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.product_id} value={p.product_id}>{p.product_name}</option>
          ))}
        </select>

        <select
          value={formData.purchase_id}
          onChange={e => setFormData({ ...formData, purchase_id: e.target.value })}
          required
        >
          <option value="">Select Purchase</option>
          {purchases.map(p => (
            <option key={p.purchase_id} value={p.purchase_id}>
              {p.purchase_id} - {p.supplier_name || p.fname}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Batch No"
          value={formData.batch_no}
          onChange={e => setFormData({ ...formData, batch_no: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.mfg_date}
          onChange={e => setFormData({ ...formData, mfg_date: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.exp_date}
          onChange={e => setFormData({ ...formData, exp_date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formData.qty}
          onChange={e => setFormData({ ...formData, qty: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={formData.purchase_price}
          onChange={e => setFormData({ ...formData, purchase_price: e.target.value })}
          required
        />
        <button type="submit">Add Batch</button>
      </form>

      <button className="view-old-btn" onClick={() => navigate("/admin/old-batches")}>
        View Old Batches
      </button>

      <h2>Batches List</h2>
      <div className="batches-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Batch Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {batches.map(batch => (
              <tr key={batch.batch_id}>
                <td>{batch.batch_id}</td>
                <td>{batch.batch_name}</td>
                <td>{batch.start_date}</td>
                <td>{batch.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddBatches;