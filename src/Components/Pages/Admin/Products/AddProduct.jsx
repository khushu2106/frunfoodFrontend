// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddProduct = () => {
//   const BASE_URL = "http://localhost:5000";

//   // Category
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("");
//   const [newCategory, setNewCategory] = useState("");
//   const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

//   // Subcategory
//   const [subcategories, setSubcategories] = useState([]);
//   const [subcategory, setSubcategory] = useState("");
//   const [newSubcategory, setNewSubcategory] = useState("");
//   const [showNewSubInput, setShowNewSubInput] = useState(false);

//   // Brand
//   const [brands, setBrands] = useState([]);
//   const [brand, setBrand] = useState("");
//   const [newBrand, setNewBrand] = useState("");
//   const [showNewBrandInput, setShowNewBrandInput] = useState(false);

//   // Product details
//   const [productName, setProductName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [shippingCharge, setShippingCharge] = useState("");
//   const [weight, setWeight] = useState("");
//   const [discount, setDiscount] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch categories, subcategories, brands
//   useEffect(() => {
//     const fetchData = async () => {
//       const [catRes, subRes, brandRes] = await Promise.all([
//         axios.get(`${BASE_URL}/api/categories`),
//         axios.get(`${BASE_URL}/api/subcategories`),
//         axios.get(`${BASE_URL}/api/brands`)
//       ]);
//       setCategories(catRes.data);
//       setSubcategories(subRes.data);
//       setBrands(brandRes.data);
//     };
//     fetchData();
//   }, []);

//   // Handlers
//   const handleCategoryChange = (e) => {
//     const value = e.target.value;
//     if (value === "other") {
//       setShowNewCategoryInput(true);
//       setCategory("");
//       setSubcategory("");
//       setShowNewSubInput(false);
//     } else {
//       setShowNewCategoryInput(false);
//       setCategory(value);
//       setSubcategory("");
//       setShowNewSubInput(false);
//     }
//   };

//   const handleSubcategoryChange = (e) => {
//     if (e.target.value === "other") {
//       setShowNewSubInput(true);
//       setSubcategory("");
//     } else {
//       setShowNewSubInput(false);
//       setSubcategory(e.target.value);
//     }
//   };

//   const handleBrandChange = (e) => {
//     if (e.target.value === "other") {
//       setShowNewBrandInput(true);
//       setBrand("");
//     } else {
//       setShowNewBrandInput(false);
//       setBrand(e.target.value);
//     }
//   };

//   // Filter subcategories for selected category
//   const filteredSubcategories = subcategories.filter(
//     (sub) => sub.pro_cat_id.toString() === category.toString()
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     if (showNewCategoryInput) formData.append("new_category_name", newCategory);
//     else formData.append("category_id", category);

//     if (showNewSubInput) formData.append("new_subcategory_name", newSubcategory);
//     else formData.append("subcategory_id", subcategory);

//     if (showNewBrandInput) formData.append("new_brand_name", newBrand);
//     else formData.append("brand_id", brand);

//     formData.append("name", productName);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("stock", stock);
//     formData.append("shipping_charge", shippingCharge);
//     formData.append("weight", weight);
//     formData.append("discount", discount);
//     formData.append("start_date", startDate);
//     formData.append("end_date", endDate);

//     for (let i = 0; i < images.length; i++) formData.append("images", images[i]);

//     try {
//       const res = await axios.post(`${BASE_URL}/api/products/full-product`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage(res.data.message);
//       alert("product and image upload succesfull")

//       // Reset form
//       setCategory(""); setNewCategory(""); setShowNewCategoryInput(false);
//       setSubcategory(""); setNewSubcategory(""); setShowNewSubInput(false);
//       setBrand(""); setNewBrand(""); setShowNewBrandInput(false);
//       setProductName(""); setDescription(""); setPrice(""); setStock("");
//       setShippingCharge(""); setWeight(""); setDiscount(""); setStartDate(""); setEndDate(""); setImages([]);
//     } catch (err) {
//       console.log(err);
//       alert("Error uploading product");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Add Full Product</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//         {/* Category */}
//         <label>Category:</label>
//         <select value={category} onChange={handleCategoryChange} required>
//           <option value="">Select Category</option>
//           {categories.map(cat => <option key={cat.pro_cat_id} value={cat.pro_cat_id}>{cat.category_name}</option>)}
//           <option value="other">Other</option>
//         </select>
//         {showNewCategoryInput && <input type="text" placeholder="Enter New Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} required />}

//         {/* Subcategory */}
//         <label>Subcategory:</label>
//         <select value={subcategory} onChange={handleSubcategoryChange} required disabled={!category}>
//           <option value="">Select Subcategory</option>
//           {filteredSubcategories.map(sub => <option key={sub.sub_cat_id} value={sub.sub_cat_id}>{sub.name}</option>)}
//           <option value="other">Other</option>
//         </select>
//         {showNewSubInput && <input type="text" placeholder="Enter New Subcategory" value={newSubcategory} onChange={e => setNewSubcategory(e.target.value)} required />}

//         {/* Brand */}
//         <label>Brand:</label>
//         <select value={brand} onChange={handleBrandChange} required>
//           <option value="">Select Brand</option>
//           {brands.map(b => <option key={b.brand_id} value={b.brand_id}>{b.name}</option>)}
//           <option value="other">Other</option>
//         </select>
//         {showNewBrandInput && <input type="text" placeholder="Enter New Brand" value={newBrand} onChange={e => setNewBrand(e.target.value)} required />}

//         {/* Product Details */}
//         <input placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} required />
//         <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
//         <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
//         <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required />
//         <input type="number" placeholder="Shipping Charge" value={shippingCharge} onChange={e => setShippingCharge(e.target.value)} required />
//         <input type="number" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} required />
//         <input type="number" placeholder="Discount %" value={discount} onChange={e => setDiscount(e.target.value)} required />
//         <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
//         <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
//         <input type="file" multiple onChange={e => setImages(e.target.files)} required />

//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
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

  // Dates
  const [mfgDate, setMfgDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Discount
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Images
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const showDiscountDates = Number(discount) > 0;

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      const [catRes, subRes, brandRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/categories`),
        axios.get(`${BASE_URL}/api/subcategories`),
        axios.get(`${BASE_URL}/api/brands`)
      ]);
      setCategories(catRes.data);
      setSubcategories(subRes.data);
      setBrands(brandRes.data);
    };
    fetchData();
  }, []);

  // Handlers
  const handleCategoryChange = (e) => {
    if (e.target.value === "other") {
      setShowNewCategoryInput(true);
      setCategory("");
      setSubcategory("");
      setShowNewSubInput(false);
    } else {
      setShowNewCategoryInput(false);
      setCategory(e.target.value);
      setSubcategory("");
      setShowNewSubInput(false);
    }
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

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATIONS
    if (new Date(expiryDate) <= new Date(mfgDate)) {
      alert("Expiry date must be after MFG date");
      return;
    }

    if (Number(discount) > 0) {
      if (!startDate || !endDate) {
        alert("Please select discount start and end date");
        return;
      }
      if (new Date(endDate) <= new Date(startDate)) {
        alert("Discount end date must be after start date");
        return;
      }
    }

    const formData = new FormData();

    if (showNewCategoryInput) formData.append("new_category_name", newCategory);
    else formData.append("category_id", category);

    if (showNewSubInput) formData.append("new_subcategory_name", newSubcategory);
    else formData.append("subcategory_id", subcategory);

    if (showNewBrandInput) formData.append("new_brand_name", newBrand);
    else formData.append("brand_id", brand);

    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("shipping_charge", shippingCharge);
    formData.append("weight", weight);
    formData.append("discount", discount);

    formData.append("mfg_date", mfgDate);
    formData.append("expiry_date", expiryDate);

    if (Number(discount) > 0) {
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
    } else {
      formData.append("start_date", "");
      formData.append("end_date", "");
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post(`${BASE_URL}/api/products/full-product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully");

      // Reset
      setCategory(""); setNewCategory(""); setShowNewCategoryInput(false);
      setSubcategory(""); setNewSubcategory(""); setShowNewSubInput(false);
      setBrand(""); setNewBrand(""); setShowNewBrandInput(false);
      setProductName(""); setDescription(""); setPrice(""); setStock("");
      setShippingCharge(""); setWeight("");
      setDiscount(""); setStartDate(""); setEndDate("");
      setMfgDate(""); setExpiryDate("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Error uploading product");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <select value={category} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.pro_cat_id} value={c.pro_cat_id}>{c.category_name}</option>
          ))}
          
        </select>

        {showNewCategoryInput && (
          <input placeholder="New Category" value={newCategory}
            onChange={e => setNewCategory(e.target.value)} required />
        )}

        <select value={subcategory} onChange={handleSubcategoryChange} disabled={!category} required>
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map(s => (
            <option key={s.sub_cat_id} value={s.sub_cat_id}>{s.name}</option>
          ))}
          
        </select>

        {showNewSubInput && (
          <input placeholder="New Subcategory" value={newSubcategory}
            onChange={e => setNewSubcategory(e.target.value)} required />
        )}

        <select value={brand} onChange={handleBrandChange} required>
          <option value="">Select Brand</option>
          {brands.map(b => (
            <option key={b.brand_id} value={b.brand_id}>{b.name}</option>
          ))}
          
        </select>

        {showNewBrandInput && (
          <input placeholder="New Brand" value={newBrand}
            onChange={e => setNewBrand(e.target.value)} required />
        )}

        <input placeholder="Product Name" value={productName}
          onChange={e => setProductName(e.target.value)} required />

        <textarea placeholder="Description" value={description}
          onChange={e => setDescription(e.target.value)} required />

        <input type="number" placeholder="Price" value={price}
          onChange={e => setPrice(e.target.value)} required />

        <input type="number" placeholder="Stock" value={stock}
          onChange={e => setStock(e.target.value)} required />

        <input type="number" placeholder="Shipping Charge" value={shippingCharge}
          onChange={e => setShippingCharge(e.target.value)} required />

        <input type="number" placeholder="Weight" value={weight}
          onChange={e => setWeight(e.target.value)} required />
{/* 
        <label>MFG Date</label>
        <input type="date" value={mfgDate}
          onChange={e => setMfgDate(e.target.value)} required /> */}

        <label>Expiry Date</label>
        <input type="date" value={expiryDate} min={mfgDate}
          onChange={e => setExpiryDate(e.target.value)} required />

        <input type="number" placeholder="Discount %"
          value={discount} min="0" max="100"
          onChange={e => setDiscount(e.target.value)} required />

        {showDiscountDates && (
          <>
            <label>Discount Start Date</label>
            <input type="date" value={startDate}
              onChange={e => setStartDate(e.target.value)} required />

            <label>Discount End Date</label>
            <input type="date" value={endDate} min={startDate}
              onChange={e => setEndDate(e.target.value)} required />
          </>
        )}

        <input type="file" multiple onChange={e => setImages(e.target.files)} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
