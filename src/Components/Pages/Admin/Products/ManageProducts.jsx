import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/admin/edit-product/${id}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Products</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td>
                <img
                  src={`http://localhost:5000${p.image}`}
                  alt={p.name}
                  width="70"
                />
              </td>
              <td>{p.name}</td>
              <td>₹ {p.price}</td>
              <td>
                <button onClick={() => handleEdit(p.product_id)}>Edit</button>
                <button onClick={() => handleDelete(p.product_id)} style={{ marginLeft: "10px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageProducts;
