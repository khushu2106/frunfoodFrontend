import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  // const [selectedCategory, setSelectedCategory] = useState("")
  // const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // const categories = [...new Set(products.map(p => p.category_name))];
  // const subCategories = [...new Set(
  //   products.filter(p=> !selectedCategory || p.category_name === selectedCategory)
  //   .map(p => p.sub_category_name)
  // )]

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

  // const filteredproduct = products.filter((product) => {
  //   const searchText = search.toLowerCase();;
  //   const matchName = (product.product_name || "").toLowerCase().includes(searchText);
  //   const matchCategory = !selectedCategory || product.category_name === selectedCategory;
  //   const matchSubCategory = !selectedSubCategory || product.sub_category_name === selectedSubCategory;

  //   return matchName && matchCategory && matchSubCategory;
  // })

  const filteredproduct = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (product.product_name || "").toLowerCase().includes(searchText);
  })

  const openProduct = (product_id) =>{
   navigate(`/product/${product_id}`) 
  }


  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Products</h2>
      Search user by their name : <input
        type="text"
        placeholder="Search by product name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "250px", marginBottom:"30px"}}
      />
      <div style={{maxHeight:"80vh",overflowY:"auto"}}>
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>category name</th>
              <th>Subcategory name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredproduct.length > 0 ? (
              filteredproduct.map((p) => (
                <tr key={p.product_id}>
                  <td onClick={() => openProduct(p.product_id)} style={{ cursor: "pointer" }}>
                    {(() => {
                      const imageUrl = p.image
                        ? p.image.startsWith("http")
                          ? p.image
                          : `http://localhost:5000/${p.image}`
                        : "/no-image.png";

                      return (
                        <img
                          src={imageUrl}
                          alt={p.product_name}
                          width="70"
                        />
                      );
                    })()}
                  </td>

                  <td>{p.product_name}</td>
                  <td>{p.category_name}</td>
                  <td>{p.sub_category_name}</td>
                  <td>₹ {p.price}</td>
                  <td>
                    <button onClick={() => handleEdit(p.product_id)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.product_id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", color: "black", fontWeight: "bold" }}
                >
                  ❌ Product not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageProducts;
