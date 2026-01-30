import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000";

  // Product fields
  const [name, setName] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  // For subcategories dropdown
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchSubcategories();
  }, []);

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
      setOldImage(p.image);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/subcategories`);
      setSubcategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let imageName = oldImage;

    // If admin uploads new image
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await axios.post(`${BASE_URL}/api/upload`, formData);
      imageName = uploadRes.data.filename;
    }

    // Prepare JSON body as per backend
    const productData = {
      name,
      sub_cat_id: subCatId,
      description,
      price,
      stock,
      weight,
      image: imageName,
    };

    try {
      await axios.put(`${BASE_URL}/api/products/${id}`, productData);
      alert("Product Updated Successfully");
      navigate("/admin/manage-products");
    } catch (err) {
      console.log(err);
      alert("Error updating product");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={subCatId}
          onChange={(e) => setSubCatId(e.target.value)}
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub.sub_cat_id} value={sub.sub_cat_id}>
              {sub.subcategory_name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <div style={{ margin: "10px 0" }}>
          <p>Current Image:</p>
          {oldImage && <img src={`${BASE_URL}/${oldImage}`} width="100" />}
        </div>

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" style={{ marginTop: "10px" }}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
