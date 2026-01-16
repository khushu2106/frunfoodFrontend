import axios from "axios";
import React, { useState, useEffect } from "react";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);
  const [brands, setBrands] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    categoryId: "",
    subcategoryId: "",
    brandId: "",
    description: "",
    image: null
  });

  useEffect(() => {
  axios.get("http://localhost:5000/api/categories")
    .then(res => setCategories(res.data));

  axios.get("http://localhost:5000/api/subcategories")
    .then(res => setAllSubcategories(res.data));

  axios.get("http://localhost:5000/api/brands")
    .then(res => setBrands(res.data));
}, []);

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setProduct({ ...product, categoryId: catId, subcategoryId: "" });

    const filtered = allSubcategories.filter(
      sub => sub.category_id === parseInt(catId)
    );
    setFilteredSubs(filtered);
  };

  const handleBrandChange = (e) => {
    setProduct({ ...product, brandId: e.target.value });
  };

   console.log(product);
   console.log(categories);
   console.log(allSubcategories);
   console.log(brands);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.categoryId);
    formData.append("price", product.price);
    formData.append("badge", "New");
    formData.append("image", product.image);
    formData.append("subcategory", product.subcategoryId);
    formData.append("brand", product.brandId);
    formData.append("description", product.description);


    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Product add failed");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />

        <select value={product.categoryId} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={product.subcategoryId}
          onChange={(e) => setProduct({ ...product, subcategoryId: e.target.value })}
          disabled={!product.categoryId}
          required
        >
          <option value="">Select Subcategory</option>
          {filteredSubs.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>

        <select onChange={(e) => setProduct({ ...product, brandId: e.target.value })} required>
          <option value="">Select Brand</option>
          {brands.map(brand => (
            <option key={brand.brand_id} value={brand.brand_id}>{brand.name}</option>
          ))}
        </select>

        <label>Product Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
          required
        />

        <textarea
          placeholder="Description"
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />

        <button type="submit" style={{ padding: "10px", background: "#28a745", color: "#fff" }}>
          Publish Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;
