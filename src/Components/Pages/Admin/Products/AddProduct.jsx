import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css'; 

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false); // Form toggle karne ke liye
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', badge: '', description: ''
  });
  const [file, setFile] = useState(null);

  // 1. Products Load karna
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("image", file); // File upload
    data.append("badge", formData.badge);

    try {
      await axios.post("http://localhost:5000/api/products", data);
      alert("Product Add ho gaya!");
      setShowForm(false); 
      fetchProducts(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Products</h2>
        <button className="add-icon-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✖ Close" : "➕ Add New Product"}
        </button>
      </div>

      {showForm && (
        <div className="add-product-modal">
          <form onSubmit={handleSubmit} className="add-form">
            <h3>Add New Product</h3>
            <input type="text" placeholder="Product Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="text" placeholder="Category" onChange={(e) => setFormData({...formData, category: e.target.value})} />
            <input type="number" placeholder="Price" onChange={(e) => setFormData({...formData, price: e.target.value})} />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            <input type="text" placeholder="Badge (e.g. New, Sale)" onChange={(e) => setFormData({...formData, badge: e.target.value})} />
            <button type="submit" className="submit-btn">Save Product</button>
          </form>
        </div>
      )}

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.product_id} className="product-card">
            <img src={`http://localhost:5000${item.image}`} alt={item.name} />
            <h4>{item.name}</h4>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDashboard;