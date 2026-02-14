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

  // 🔹 Multiple image states
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState("");

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

        // 🔹 Expecting backend to return images array
        setExistingImages(p.images || []);

      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchProduct();
    axios.get(`${BASE_URL}/api/subcategories`)
      .then(res => setSubcategories(res.data));

  }, [id]);

  // ---------------- NEW IMAGE VALIDATION ----------------
  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const validFiles = [];

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, JPEG, PNG, WEBP allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Each image must be under 2MB");
        return;
      }
      validFiles.push(file);
    }

    setNewImages(validFiles);
  };

  // ---------------- REMOVE EXISTING IMAGE ----------------
  const removeExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
  };

  // ---------------- REMOVE NEW IMAGE ----------------
  const removeNewImage = (index) => {
    const updated = newImages.filter((_, i) => i !== index);
    setNewImages(updated);
  };

  // ---------------- UPDATE PRODUCT ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (Number(price) < 0 || Number(stock) < 0 || Number(weight) < 0) {
      alert("Price, Stock and Weight cannot be negative!");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("sub_cat_id", subCatId);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("weight", weight);

    // 🔹 Send remaining existing images
    formData.append("existingImages", JSON.stringify(existingImages));

    // 🔹 Append new images
    newImages.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.put(`${BASE_URL}/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Updated successfully!");
      navigate("/admin/manage-products");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <select value={subCatId} onChange={(e) => setSubCatId(e.target.value)} required>
          <option value="">Subcategory</option>
          {subcategories.map(s =>
            <option key={s.sub_cat_id} value={s.sub_cat_id}>{s.name}</option>
          )}
        </select>

        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <input type="number" value={price} min="0"
          onChange={(e) => setPrice(e.target.value)} required />

        <input type="number" value={stock} min="0"
          onChange={(e) => setStock(e.target.value)} required />

        <input type="number" value={weight} min="0"
          onChange={(e) => setWeight(e.target.value)} required />

        {/* 🔹 Existing Images */}
        <div>
          <h4>Existing Images</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {existingImages.map((img, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={`${BASE_URL}/${img}`}
                  alt="existing"
                  width="100"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Upload New Images */}
        <div>
          <h4>Upload New Images</h4>
          <input type="file" multiple accept="image/*" onChange={handleNewImages} />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {newImages.map((img, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  width="100"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ padding: "10px", background: "blue", color: "white" }}>
          Update Product
        </button>

      </form>
    </div>
  );
};

export default EditProduct;
