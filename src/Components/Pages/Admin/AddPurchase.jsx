import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPurchase = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/purchases", {
        product,
        quantity,
        price,
        date,
      });

      // Reset form fields
      setProduct("");
      setQuantity(1);
      setPrice(0);
      setDate("");

      // Redirect to Transaction page with success message
      navigate("/admin/transaction", { state: { successMessage: "Purchase added successfully!" } });
    } catch (err) {
      console.error(err);
      setErrorMessage("Error adding purchase");
    }
  };

  const handleBack = () => {
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
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
            marginTop: "10px",
            marginRight: "10px"
          }}
        >
          Add Purchase
        </button>

        <button
          type="button"
          onClick={handleBack}
          style={{
            backgroundColor: "#6c757d",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Back
        </button>
      </form>

      {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
    </div>
  );
};

export default AddPurchase;
