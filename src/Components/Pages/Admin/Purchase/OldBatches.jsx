import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Batches.css"; // CSS file for styling

function OldBatches() {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [productFilter, setProductFilter] = useState("");
  const [purchaseFilter, setPurchaseFilter] = useState("");

  const fetchOldBatches = (params = {}) => {
    setLoading(true);
    let url = "http://localhost:5000/api/admin/batches";
    const query = new URLSearchParams(params).toString();
    if (query) url += `?${query}`;

    axios.get(url)
      .then(res => {
        const formatted = res.data.map(b => ({
          ...b,
          start_date: b.start_date.split("T")[0],
          end_date: b.end_date.split("T")[0]
        }));
        setBatches(formatted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchFilters = () => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/purchases")
      .then(res => setPurchases(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOldBatches();
    fetchFilters();
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Start and End dates are required.");
      return;
    }
    if (endDate < startDate) {
      alert("End date cannot be before start date.");
      return;
    }

    fetchOldBatches({
      start: startDate,
      end: endDate,
      product_id: productFilter,
      purchase_id: purchaseFilter
    });
  };

  if (loading) return <p>Loading old batches...</p>;

  return (
    <div className="batches-container">
      <h2>Old / Expired Batches</h2>

      <div className="filters">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>

        <label>
          Product:
          <select value={productFilter} onChange={e => setProductFilter(e.target.value)}>
            <option value="">All Products</option>
            {products.map(p => (
              <option key={p.product_id} value={p.product_id}>{p.product_name}</option>
            ))}
          </select>
        </label>

        <label>
          Purchase:
          <select value={purchaseFilter} onChange={e => setPurchaseFilter(e.target.value)}>
            <option value="">All Purchases</option>
            {purchases.map(p => (
              <option key={p.purchase_id} value={p.purchase_id}>
                {p.purchase_id} - {p.supplier_name || p.fname}
              </option>
            ))}
          </select>
        </label>

        <button onClick={handleFilter}>Filter</button>
        <button onClick={() => navigate("/admin/batches")}>Back to Add Batches</button>
      </div>

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
            {batches.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No batches found</td>
              </tr>
            ) : (
              batches.map(batch => (
                <tr key={batch.batch_id}>
                  <td>{batch.batch_id}</td>
                  <td>{batch.batch_name}</td>
                  <td>{batch.start_date}</td>
                  <td>{batch.end_date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OldBatches;