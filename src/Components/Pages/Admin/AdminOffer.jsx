import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOffers.css";

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    offer_name: "",
    discount_type: "percentage",
    discount_value: "",
    start_date: "",
    end_date: "",
    status: 1
  });

  useEffect(() => {
    fetchOffers();
    fetchProducts();
  }, []);

  // 1. Fetch function mein date formatting fix
  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/offers");
      const formattedOffers = res.data.map(o => ({
        ...o,
        // ISO date se sirf YYYY-MM-DD nikalne ke liye
        start_date: o.start_date ? o.start_date.split('T')[0] : "",
        end_date: o.end_date ? o.end_date.split('T')[0] : ""
      }));
      setOffers(formattedOffers);
    } catch (err) {
      console.error("Error fetching offers", err);
    }
  };

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/offers/products/list");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.offer_name.trim()) return "Offer name required";
    if (!form.discount_value || form.discount_value <= 0) return "Discount must be greater than 0";
    if (!form.start_date || !form.end_date) return "Start and end date required";
    if (new Date(form.end_date) < new Date(form.start_date)) return "End date cannot be before start date";
    return null;
  };

  const createOffer = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setError(err);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/offers", form);
      setForm({
        offer_name: "",
        discount_type: "percentage",
        discount_value: "",
        start_date: "",
        end_date: "",
        status: 1
      });
      setError("");
      fetchOffers();
    } catch (err) {
      setError("Failed to create offer");
    }
  };

  const deleteOffer = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    await axios.delete(`http://localhost:5000/api/offers/${id}`);
    fetchOffers();
  };

  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const assignProducts = async () => {
    if (!selectedOffer) {
      alert("Select an offer first");
      return;
    }
    await axios.post("http://localhost:5000/api/offers/assign", {
      offer_id: selectedOffer,
      product_ids: selectedProducts
    });
    alert("Products assigned successfully");
    setSelectedOffer(null);
    setSelectedProducts([]);
  };

  // Date readable banane ka helper function
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
  };

  return (
    <div className="offer-admin-container">
      <h2>Admin Offer Management</h2>

      <form className="offer-form" onSubmit={createOffer}>
        <h3>Create New Offer</h3>
        {error && <p className="error">{error}</p>}
        <input name="offer_name" placeholder="Offer Name" value={form.offer_name} onChange={handleChange} />
        <select name="discount_type" value={form.discount_type} onChange={handleChange}>
          <option value="percentage">Percentage (%)</option>
          <option value="flat">Flat (₹)</option>
        </select>
        <input name="discount_value" type="number" placeholder="Discount Value" value={form.discount_value} onChange={handleChange} />
        <div className="date-row">
          <input type="date" name="start_date" value={form.start_date} onChange={handleChange} />
          <input type="date" name="end_date" value={form.end_date} onChange={handleChange} />
        </div>
        <button type="submit">Create Offer</button>
      </form>

      <h3>Existing Offers</h3>
      <table className="offer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Discount</th>
            <th>Dates (DD/MM/YYYY)</th>
            <th>Assign</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.offer_id}>
              <td>{o.offer_name}</td>
              <td>{o.discount_value}{o.discount_type === "percentage" ? "%" : "₹"}</td>
              <td>
                {/* 2. Format function yahan use ho rahi hai */}
                {formatDate(o.start_date)} — {formatDate(o.end_date)}
              </td>
              <td>
                <button
                  className="assign-btn"
                  onClick={async () => {
                    setSelectedOffer(o.offer_id);
                    const res = await axios.get(`http://localhost:5000/api/offers/${o.offer_id}/products`);
                    // 3. IDs nikalna zaroori hai checkboxes ke liye
                    const assignedIds = res.data.map(p => p.product_id);
                    setSelectedProducts(assignedIds);
                  }}
                >
                  Assign Products
                </button>
              </td>
              <td><button className="delete-btn" onClick={() => deleteOffer(o.offer_id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOffer && (
        <div className="assign-box">
          <h3>Select Products</h3>
          <div className="product-list-scroll">
            {products.map((p) => (
              <label key={p.product_id} className="product-item">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(p.product_id)}
                  onChange={() => toggleProduct(p.product_id)}
                />
                {p.name}
              </label>
            ))}
          </div>
          <button className="save-btn" onClick={assignProducts}>Save Products</button>
          <button className="cancel-btn" onClick={() => setSelectedOffer(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;