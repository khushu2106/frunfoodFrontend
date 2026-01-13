import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  // Lists for Dropdowns
  const [categories, setCategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]); // Database se aayi saari subcategories
  const [filteredSubs, setFilteredSubs] = useState([]);        // Filtered (Based on category selection)
  const [brands, setBrands] = useState([]);

  // Form Data State
  const [product, setProduct] = useState({
    name: '',
    price: '',
    categoryId: '',
    subcategoryId: '',
    brandId: '',
    description: '',
    image: null // File ke liye
  });

  // 1. Initial Load: Fetch Categories and Brands
  useEffect(() => {
    // --- API CALL HERE (GET) ---
    // Example: axios.get('/api/categories').then(res => setCategories(res.data))
    // Example: axios.get('/api/brands').then(res => setBrands(res.data))
    // Example: axios.get('/api/subcategories').then(res => setAllSubcategories(res.data))
    console.log("Fetching Categories, Brands, and all Subcategories...");
  }, []);

  // 2. Handle Category Change (Dependent Dropdown Logic)
  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setProduct({ ...product, categoryId: catId, subcategoryId: '' }); // Reset subcategory when category changes

    // Filter subcategories that belong to the selected Category ID
    const filtered = allSubcategories.filter(sub => sub.category_id === parseInt(catId));
    setFilteredSubs(filtered);
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Image upload ke liye humein FormData use karna padta hai
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('categoryId', product.categoryId);
    formData.append('subcategoryId', product.subcategoryId);
    formData.append('brandId', product.brandId);
    formData.append('description', product.description);
    formData.append('image', product.image);

    // --- API CALL HERE (POST) ---
    /* axios.post('/api/add-product', formData, {
         headers: { 'Content-Type': 'multipart/form-data' }
       })
    */
    console.log("Final Data to Backend:", product);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Product Name */}
        <input 
          type="text" placeholder="Product Name" 
          onChange={(e) => setProduct({...product, name: e.target.value})} 
          required 
        />

        {/* Price */}
        <input 
          type="number" placeholder="Price" 
          onChange={(e) => setProduct({...product, price: e.target.value})} 
          required 
        />

        {/* Category Dropdown */}
        <select value={product.categoryId} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* Subcategory Dropdown (Depends on Category) */}
        <select 
          value={product.subcategoryId} 
          onChange={(e) => setProduct({...product, subcategoryId: e.target.value})}
          disabled={!product.categoryId} 
          required
        >
          <option value="">Select Subcategory</option>
          {filteredSubs.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>

        {/* Brand Dropdown */}
        <select onChange={(e) => setProduct({...product, brandId: e.target.value})} required>
          <option value="">Select Brand</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>

        {/* Image Upload */}
        <label>Product Image:</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setProduct({...product, image: e.target.files[0]})} 
          required 
        />

        {/* Description */}
        <textarea 
          placeholder="Description" 
          onChange={(e) => setProduct({...product, description: e.target.value})} 
        />

        <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', cursor: 'pointer' }}>
          Publish Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;