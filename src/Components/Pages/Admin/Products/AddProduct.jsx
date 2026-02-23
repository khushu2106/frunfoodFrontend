import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const BASE_URL = "http://localhost:5000";

  // Category, Subcategory, Brand States
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [showNewSubInput, setShowNewSubInput] = useState(false);

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

  // Dates & Discount
  const [mfgDate, setMfgDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Images & System States
  const [images, setImages] = useState([]); // Array for multiple images
  const [existingProducts, setExistingProducts] = useState([]); // For duplicate check
  const [error, setError] = useState("");

  const showDiscountDates = Number(discount) > 0;

  const removeImage = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  // Fetch initial data (Categories, Brands, and existing Products for check)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes, brandRes, prodRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/categories`),
          axios.get(`${BASE_URL}/api/subcategories`),
          axios.get(`${BASE_URL}/api/brands`),
          axios.get(`${BASE_URL}/api/products`) 
        ]);
        setCategories(catRes.data);
        setSubcategories(subRes.data);
        setBrands(brandRes.data);
        setExistingProducts(prodRes.data);
      } catch (err) {
        console.error("Data fetching error:", err);
      }
    };
    fetchData();
  }, []);

  // MULTIPLE Image Handler with Validation
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    if (files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const validFiles = [];

    // Basic filters
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, JPEG, PNG, WEBP images are allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Each image must be less than 2MB");
        return;
      }
      validFiles.push(file);
    }

    // Dimension validation
    let processed = 0;
    const finalImages = [];

    validFiles.forEach((file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 300 || img.height < 300 || img.width > 800 || img.height > 800) {
          setError(`Image ${file.name} dimensions must be between 300x300 and 800x800 px`);
        } else {
          finalImages.push(file);
        }
        processed++;
        if (processed === validFiles.length) {
          setImages(finalImages);
        }
      };
    });
  };

  // Dropdown Handlers
  const handleCategoryChange = (e) => {
    const val = e.target.value;
    if (val === "other") {
      setShowNewCategoryInput(true);
      setCategory("");
    } else {
      setShowNewCategoryInput(false);
      setCategory(val);
    }
    setSubcategory("");
    setShowNewSubInput(false);
  };

  const handleSubcategoryChange = (e) => {
    if (e.target.value === "other") {
      setShowNewSubInput(true);
      setSubcategory("");
    } else {
      setShowNewSubInput(false);
      setSubcategory(e.target.value);
    }
  };

  const handleBrandChange = (e) => {
    if (e.target.value === "other") {
      setShowNewBrandInput(true);
      setBrand("");
    } else {
      setShowNewBrandInput(false);
      setBrand(e.target.value);
    }
  };

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.pro_cat_id?.toString() === category.toString()
  );

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. DUPLICATE CHECK (Check Name and Brand combination)
    // 1. DUPLICATE CHECK (Safe handling of null/undefined names)
    const isDuplicate = existingProducts.some((p) => {
      if (!p || !p.name) return false;

      return (
        p.name.toLowerCase().trim() === productName.toLowerCase().trim() &&
        p.brand_id?.toString() === brand.toString()
      );
    });

    if (isDuplicate) {
      alert("This product already exists in this brand!");
      return;
    }

    // 2. VALIDATIONS
    if (images.length === 0) {
      alert("Please upload at least one valid image");
      return;
    }

    if (Number(price) < 0 || Number(stock) < 0 || Number(weight) < 0) {
      alert("Price, Stock and Weight cannot be negative!");
      return;
    }

    if (new Date(expiryDate) <= new Date(mfgDate)) {
      alert("Expiry date must be after MFG date");
      return;
    }

    // 3. PREPARE FORM DATA
    const formData = new FormData();
    formData.append(showNewCategoryInput ? "new_category_name" : "category_id", showNewCategoryInput ? newCategory : category);
    formData.append(showNewSubInput ? "new_subcategory_name" : "subcategory_id", showNewSubInput ? newSubcategory : subcategory);
    formData.append(showNewBrandInput ? "new_brand_name" : "brand_id", showNewBrandInput ? newBrand : brand);

    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("shipping_charge", shippingCharge);
    formData.append("weight", weight);
    formData.append("discount", discount);
    formData.append("mfg_date", mfgDate);
    formData.append("expiry_date", expiryDate);

    if (showDiscountDates) {
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
    }

    // Multiple Images Append
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post(`${BASE_URL}/api/products/full-product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully");

      // Reset Form & Update local product list
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error uploading product");
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="title">Add Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        {/* Category */}
        <select value={category} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.pro_cat_id} value={c.pro_cat_id}>{c.category_name}</option>
          ))}
          {/* <option value="other">+ Add New Category</option> */}
        </select>
        {showNewCategoryInput && (
          <input placeholder="New Category Name" value={newCategory}
            onChange={e => setNewCategory(e.target.value)} required />
        )}

        {/* Subcategory */}
        <select value={subcategory} onChange={handleSubcategoryChange} disabled={!category} required>
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map(s => (
            <option key={s.sub_cat_id} value={s.sub_cat_id}>{s.name}</option>
          ))}
          {/* <option value="other">+ Add New Subcategory</option> */}
        </select>
        {showNewSubInput && (
          <input placeholder="New Subcategory Name" value={newSubcategory}
            onChange={e => setNewSubcategory(e.target.value)} required />
        )}

        {/* Brand */}
        <select value={brand} onChange={handleBrandChange} required>
          <option value="">Select Brand</option>
          {brands.map(b => (
            <option key={b.brand_id} value={b.brand_id}>{b.name}</option>
          ))}
          {/* <option value="other">+ Add New Brand</option> */}
        </select>
        {showNewBrandInput && (
          <input placeholder="New Brand Name" value={newBrand}
            onChange={e => setNewBrand(e.target.value)} required />
        )}

        {/* Details */}
        <input placeholder="Product Name" value={productName}
          onChange={e => setProductName(e.target.value)} required />
        <textarea placeholder="Description" value={description}
          onChange={e => setDescription(e.target.value)} required />

        <div className="form-row">
          <input type="number" placeholder="Price" value={price} min="1" onChange={e => setPrice(e.target.value)} required />
          <input type="number" placeholder="Stock" value={stock} min="1" onChange={e => setStock(e.target.value)} required />
        </div>

        <div className="form-row">
          <input type="number" placeholder="Shipping Charge" value={shippingCharge} min="0" onChange={e => setShippingCharge(e.target.value)} required />
          <input type="number" placeholder="Weight (gm)" value={weight} min="1" onChange={e => setWeight(e.target.value)} required />
        </div>

        {/* <label>MFG Date</label>
        <input type="date" value={mfgDate} onChange={e => setMfgDate(e.target.value)} required /> */}

        <label>Expiry Date</label>
        <input type="date" value={expiryDate} min={mfgDate}
          onChange={e => setExpiryDate(e.target.value)} required />

        <input type="number" placeholder="Discount %" value={discount} min="0" max="100"
          onChange={e => setDiscount(e.target.value)} required />

        {showDiscountDates && (
          <div className="discount-dates">
            <label>Discount Start</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            <label>Discount End</label>
            <input type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} required />
          </div>
        )}

        {/* Multiple Image Input */}
        <div className="image-section">
          <label>Upload Images (Multiple)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />

          {/* Image Previews with Remove Option */}
          <div className="preview-gallery">
            {images.map((img, index) => (
              <div key={index} className="image-item">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${index}`}
                  className="img-preview"
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="error-text" style={{ color: 'red' }}>❌ {error}</p>}

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;