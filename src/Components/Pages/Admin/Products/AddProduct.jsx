import React, { useState } from "react";
import "./AddProduct.css";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/products", product);
      alert(response.data.message);
      setProduct({ name: "", category: "", price: "", image: "", badge: "" });

    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />

        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Dog Food">Dog Food</option>
          <option value="Cat Food">Cat Food</option>
          <option value="Accessories">Accessories</option>
        </select>

        <textarea name="description" placeholder="Product Description" onChange={handleChange}></textarea>

        <input type="file" name="image" />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
