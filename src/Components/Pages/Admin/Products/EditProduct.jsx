import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000";

  const [name, setName] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");

  const [subcategories, setSubcategories] = useState([]);

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [errors, setErrors] = useState({}); // Object for field-specific errors
  const [generalError, setGeneralError] = useState("");

  // ---------------- FETCH PRODUCT ----------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        const p = res.data;

        setName(p.name);
        setSubCatId(p.sub_cat_id);
        setDescription(p.description);
        setPrice(p.price);
        setStock(p.stock);
        setWeight(p.weight);
        setExistingImages(p.images || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setGeneralError("Failed to fetch product details.");
      }
    };

    fetchProduct();

    // Fetch subcategories
    axios.get(`${BASE_URL}/api/subcategories`)
      .then(res => setSubcategories(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // ---------------- NEW IMAGE VALIDATION ----------------
  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setGeneralError("");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const validFiles = [];

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setGeneralError("Only JPG, JPEG, PNG, WEBP files allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setGeneralError("Each image must be under 2MB.");
        return;
      }
      validFiles.push(file);
    }

    setNewImages(prev => {
      const merged = [...prev];

      validFiles.forEach(file => {
        const alreadyExists = prev.some(
          existing =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        );

        if (!alreadyExists) {
          merged.push(file);
        }
      });

      return merged;
    });

    e.target.value = null;
  };

  // ---------------- REMOVE IMAGES ----------------
  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const errs = {};

    if (!name.trim()) errs.name = "Product name is required.";
    if (!subCatId) errs.subCatId = "Subcategory is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (price === "" || Number(price) < 0) errs.price = "Price must be 0 or greater.";
    if (stock === "" || Number(stock) < 0) errs.stock = "Stock must be 0 or greater.";
   if (weight === "" || isNaN(weight) || Number(weight) < 0) errs.weight = "Weight must be 0 or greater.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ---------------- UPDATE PRODUCT ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sub_cat_id", subCatId);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("existingImages", JSON.stringify(existingImages));
    newImages.forEach(img => formData.append("images", img));

    try {
      await axios.put(`${BASE_URL}/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      navigate("/admin/manage-products");
    } catch (err) {
      console.error(err);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "650px", margin: "20px auto", padding: "15px" }}>
      <h2>Edit Product</h2>
      {generalError && <p style={{ color: "red" }}>{generalError}</p>}

      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        {/* Product Name */}
        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

        {/* Subcategory */}
        <label>Subcategory</label>
        <select value={subCatId} onChange={(e) => setSubCatId(e.target.value)}>
          <option value="">Select Subcategory</option>
          {subcategories.map(s => (
            <option key={s.sub_cat_id} value={s.sub_cat_id}>{s.name}</option>
          ))}
        </select>
        {errors.subCatId && <span style={{ color: "red" }}>{errors.subCatId}</span>}

        {/* Description */}
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
        {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}

        {/* Price */}
        <label>Price</label>
        <input
          type="number"
          value={price}
          min="0"
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <span style={{ color: "red" }}>{errors.price}</span>}

        {/* Stock */}
        <label>Stock Quantity</label>
        <input
          type="number"
          value={stock}
          min="0"
          onChange={(e) => setStock(e.target.value)}
        />
        {errors.stock && <span style={{ color: "red" }}>{errors.stock}</span>}

        {/* Weight */}
        <label>Weight (kg)</label>
        <input
          type="number"
          value={weight}
          min="0"
          step="0.01"
          onChange={(e) => setWeight(e.target.value)}
        />
        {errors.weight && <span style={{ color: "red" }}>{errors.weight}</span>}

        {/* Existing Images */}
        <div>
          <label>Existing Images</label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "5px" }}>
            {existingImages.map((img, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img src={`${BASE_URL}/${img}`} alt="existing" width="100" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  style={{
                    position: "absolute", top: 0, right: 0,
                    background: "red", color: "white",
                    border: "none", cursor: "pointer"
                  }}
                >×</button>
              </div>
            ))}
          </div>
        </div>

        {/* New Images */}
        <div>
          <label>Upload New Images</label>
          <input type="file" multiple accept="image/*" onChange={handleNewImages} />
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "5px" }}>
            {newImages.map((img, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img src={URL.createObjectURL(img)} alt="preview" width="100" />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  style={{
                    position: "absolute", top: 0, right: 0,
                    background: "red", color: "white",
                    border: "none", cursor: "pointer"
                  }}
                >×</button>
              </div>
            ))}
          </div>
        </div>

        {generalError && <p style={{ color: "red" }}>{generalError}</p>}

        <button type="submit" style={{ padding: "10px", background: "blue", color: "white", cursor: "pointer" }}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;