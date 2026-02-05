import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddPurchase = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Fetch suppliers and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supRes, prodRes] = await Promise.all([
          axios.get("http://localhost:5000/api/suppliers"),
          axios.get("http://localhost:5000/api/products")
        ]);
        setSuppliers(supRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error("Error fetching suppliers/products:", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supplierId || !productId || !quantity || !price || !date) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/purchases", {
        supplier_id: Number(supplierId),
        product_id: Number(productId),
        quantity: Number(quantity),
        price: Number(price),
        p_date: date
      });


      // Reset form
      setSupplierId("");
      setProductId("");
      setQuantity("");
      setPrice("");
      setDate("");
      setErrorMessage("");

      navigate("/admin/transaction", { state: { successMessage: "Purchase added successfully!" } });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setErrorMessage(err.response?.data?.error || "Error adding purchase");
    }

  };

  const handleViewAll = () => {
    navigate("/admin/transaction");
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "20px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h3>Add Purchase</h3>

      <button
        type="button"
        onClick={() => navigate("/admin/view-purchases")}
        style={{
          backgroundColor: "#6c757d",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        View All Purchases
      </button>

      <form onSubmit={handleSubmit}>
        <select
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          required
        >
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s.supplier_id} value={s.supplier_id}>
              {s.fname} {s.lname}
            </option>
          ))}
        </select>

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.product_id} value={p.product_id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Add Purchase
        </button>
      </form>

      {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
    </div>
  );
};

export default AddPurchase;
