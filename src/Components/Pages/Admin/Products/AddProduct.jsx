import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const BASE_URL = "http://localhost:5000";

  // Category
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  // Subcategory
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [showNewSubInput, setShowNewSubInput] = useState(false);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  // Brand
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [showNewBrandInput, setShowNewBrandInput] = useState(false);

  // Product details
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  const [weight, setWeight] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      const res = await axios.get(`${BASE_URL}/api/subcategories`);
      setSubcategories(res.data);
    };
    fetchSubcategories();
  }, []);

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      const res = await axios.get(`${BASE_URL}/api/brands`);
      setBrands(res.data);
    };
    fetchBrands();
  }, []);

  // Handlers
  const handleCategoryChange =async (e) => {
      const value = e.target.value;

      if(value === 'other'){
        setShowNewCategoryInput(true);
        setCategory("");
        setFilteredSubcategories([]);
      }
      else{
        setCategory(value);
        setShowNewCategoryInput(false);
      }

      const res = await axios.get(`http://localhost:5000/api/subcategories/by-category/${value}`);
      setFilteredSubcategories(res.data)
  };

  const handleSubcategoryChange = (e) => {
    if (e.target.value === "other") {
      setShowNewSubInput(true);
      setSubcategory("");
    } else {
      setSubcategory(e.target.value);
      setShowNewSubInput(false);
    }
  };

  const handleBrandChange = (e) => {
    if (e.target.value === "other") {
      setShowNewBrandInput(true);
      setBrand("");
    } else {
      setBrand(e.target.value);
      setShowNewBrandInput(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // formData.append("category_name", showNewCategoryInput ? newCategory : category);
    // formData.append("subcategory_name", showNewSubInput ? newSubcategory : subcategory);
    if (showNewCategoryInput) {
      formData.append("new_category_name", newCategory);
    } else {
      formData.append("category_id", category);
    }

    if (showNewSubInput) {
      formData.append("new_subcategory_name", newSubcategory);
    } else {
      formData.append("subcategory_id", subcategory);
    }

    if (showNewBrandInput) {
      formData.append("new_brand_name", newBrand);
    } else {
      formData.append("brand_id", brand);
    }

    // formData.append("brand_name", showNewBrandInput ? newBrand : brand);

    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("shipping_charge", shippingCharge);
    formData.append("weight", weight);
    formData.append("discount_percentage", discount);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/full-product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);

      // Reset form
      setCategory(""); setNewCategory(""); setShowNewCategoryInput(false);
      setSubcategory(""); setNewSubcategory(""); setShowNewSubInput(false);
      setBrand(""); setNewBrand(""); setShowNewBrandInput(false);
      setProductName(""); setDescription(""); setPrice(""); setStock("");
      setShippingCharge(""); setWeight(""); setDiscount(""); setStartDate(""); setEndDate(""); setImages([]);

      // Refresh dropdowns in case new values added
      const [catRes, subRes, brandRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/categories`),
        axios.get(`${BASE_URL}/api/subcategories`),
        axios.get(`${BASE_URL}/api/brands`)
      ]);
      setCategories(catRes.data);
      setSubcategories(subRes.data);
      setBrands(brandRes.data);

    } catch (err) {
      console.log(err);
      setMessage("Error uploading product");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Add Full Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* Category */}
        <label>Category:</label>
        <select value={category} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.pro_cat_id} value={cat.pro_cat_id}>{cat.category_name}</option>
          ))}
          <option value="other">Other</option>
        </select>
        {showNewCategoryInput && (
          <input type="text" placeholder="Enter New Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} required />
        )}

        {/* Subcategory */}
        <label>Subcategory:</label>
        <select value={subcategory} onChange={handleSubcategoryChange} required>
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map(sub => (
            <option key={sub.sub_cat_id} value={sub.sub_cat_id}>{sub.subcategory_name}</option>
          ))}
          <option value="other">Other</option>
        </select>
        {showNewSubInput && (
          <input type="text" placeholder="Enter New Subcategory" value={newSubcategory} onChange={e => setNewSubcategory(e.target.value)} required />
        )}

        {/* Brand */}
        <label>Brand:</label>
        <select value={brand} onChange={handleBrandChange} required>
          <option value="">Select Brand</option>
          {brands.map(b => (
            <option key={b.brand_id} value={b.brand_id}>{b.brand_name}</option>
          ))}
          <option value="other">Other</option>
        </select>
        {showNewBrandInput && (
          <input type="text" placeholder="Enter New Brand" value={newBrand} onChange={e => setNewBrand(e.target.value)} required />
        )}

        {/* Product Details */}
        <input placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required />
        <input type="number" placeholder="Shipping Charge" value={shippingCharge} onChange={e => setShippingCharge(e.target.value)} required />
        <input type="number" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} required />
        <input type="number" placeholder="Discount %" value={discount} onChange={e => setDiscount(e.target.value)} required />
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
        <input type="file" multiple onChange={e => setImages(e.target.files)} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
