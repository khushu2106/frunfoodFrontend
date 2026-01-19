import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import "./AddProduct.css";

const AddProduct = () => {
  const [allSubcategories, setAllSubcategories] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    shipping_charges: "",
    weight: "",
    exp_date: "",
    sub_cat_id: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/subcategories").then(res => setAllSubcategories(res.data));
    // axios.get("http://localhost:5000/api/brands").then(res => setBrands(res.data));
  }, []);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("shipping_charges", product.shipping_charges);
    formData.append("weight", product.weight);
    formData.append("exp_date", product.exp_date);
    formData.append("sub_cat_id", product.sub_cat_id);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // try {
    //   const res = await axios.post("http://localhost:5000/api/products", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });

    //   alert(res.data.message);

    //   setProduct({ name: "", description: "", price: "", stock: "", shipping_charges: "", weight: "", exp_date: "", sub_cat_id: ""});
    //   setImages([]);
    //   e.target.reset();

    // } catch (error) {
    //   console.error("Frontend Error:", error.response?.data);
    //   alert("Error: " + (error.response?.data?.message || "Check Console"));
    // }
    try {
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: 'Success!',
        text: res.data.message || 'Product Added Successfully',
        icon: 'success',
        confirmButtonText: 'Cool'
      });

      // Form Reset
      setProduct({ name: "", description: "", price: "", stock: "", shipping_charges: "", weight: "", exp_date: "", sub_cat_id: "" });
      setImages([]);
      e.target.reset();

    } catch (error) {
      // Error Alert
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="add-product-container" style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        <input type="text" placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />

        <textarea placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />

        <div style={{ display: "flex", gap: "10px" }}>
          <input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required style={{ flex: 1 }} />
          <input type="number" placeholder="Stock" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} required style={{ flex: 1 }} />
        </div>

        <input type="number" placeholder="Shipping Charge" value={product.shipping_charges} onChange={(e) => setProduct({ ...product, shipping_charges: e.target.value })} />

        <input type="number" placeholder="Weight (kg)" value={product.weight} onChange={(e) => setProduct({ ...product, weight: e.target.value })} />

        <label>Expiry Date:</label>
        <input type="date" value={product.exp_date} onChange={(e) => setProduct({ ...product, exp_date: e.target.value })} />

        <select onChange={(e) => setProduct({ ...product, sub_cat_id: e.target.value })} required value={product.sub_cat_id}>
          <option value="">Select Subcategory</option>
          {allSubcategories.map(sub => (
            <option key={sub.sub_cat_id} value={sub.sub_cat_id}>{sub.name}</option>
          ))}
        </select>

        <label>Product Images (Max 5):</label>
        {/* <input type="file" multiple accept="image/*" onChange={handleFileChange} required /> */}

        <button type="submit" style={{ padding: "12px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}>
          Publish Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;