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
  const [imageFile, setImageFile] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        const p = res.data;
        setName(p.name || p.product_name);
        setSubCatId(p.sub_cat_id);
        setDescription(p.description);
        setPrice(p.price);
        setStock(p.stock);
        setWeight(p.weight);
        setOldImage(p.image);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchProduct();

    axios.get(`${BASE_URL}/api/subcategories`).then(res => setSubcategories(res.data));
  }, [id]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (Number(price) < 0 || Number(stock) < 0 || Number(weight) < 0) {
      alert("Price, Stock and Weight cannot be negative!");
      return;
    }
    const formData = new FormData();

    // Text fields
    formData.append("name", name);
    formData.append("sub_cat_id", subCatId);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("weight", weight);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`${BASE_URL}/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Updated successfully!");
      navigate("/admin/manage-products");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />

        <select value={subCatId} onChange={(e) => setSubCatId(e.target.value)} required>
          <option value="">Subcategory</option>
          {subcategories.map(s => <option key={s.sub_cat_id} value={s.sub_cat_id}>{s.name}</option>)}
        </select>

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} min="0" onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" placeholder="Stock" value={stock} min="0" onChange={(e) => setStock(e.target.value)} required />

        <input type="number" placeholder="Weight" value={weight} min="0" onChange={(e) => setWeight(e.target.value)} required />

        <div>
          <p>Current Image:</p>
          <img src={`${BASE_URL}/${oldImage}`} width="100" alt="Old" style={{ marginBottom: "10px" }} />
          <br />
          <label>Upload New Image (Optional):</label>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/*" />
        </div>

        <button type="submit" style={{ padding: "10px", background: "blue", color: "white", cursor: "pointer" }}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;