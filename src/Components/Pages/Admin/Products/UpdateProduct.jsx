import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpdateProduct.css";

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState({ id: "", name: "", price: "", description: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  };

  const handleEdit = (product) => {
    setEditData(product);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/products/${editData.id}`, editData)
      .then(() => {
        alert("Product Updated");
        fetchProducts();
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        alert("Product Deleted");
        fetchProducts();
      });
  };

  return (
    <div>
      <h2>Manage Products</h2>

      {/* Update Form */}
      <div>
        <input value={editData.name} onChange={(e)=>setEditData({...editData, name:e.target.value})} placeholder="Name" />
        <input value={editData.price} onChange={(e)=>setEditData({...editData, price:e.target.value})} placeholder="Price" />
        <textarea value={editData.description} onChange={(e)=>setEditData({...editData, description:e.target.value})} placeholder="Description" />
        <button onClick={handleUpdate}>Update Product</button>
      </div>

      {/* Product List */}
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManage;
