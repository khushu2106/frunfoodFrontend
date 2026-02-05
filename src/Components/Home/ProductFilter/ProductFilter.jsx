import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import { useParams } from "react-router-dom";
function ProductFilter() {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 const { id } = useParams(); // category id from URL
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: 0,
    maxPrice: 5000
  });
  // Fetch all products initially
  useEffect(() => {
    fetchProducts();
  }, []);
useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:5000/api/products", {
          params: {
            category_id: id,
            ...filters
          }
        })
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    }
  }, [id, filters]);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Search products
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/search?query=${searchTerm}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter products by price
  const handleFilter = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", { productId });
      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/wishlist/add", { productId });
      alert("Product added to wishlist!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist");
    }
  };

  return (
   <div style={{ display: "flex" }}>
      
      {/* 🔹 LEFT SIDEBAR */}
      <LeftSidebar
        categoryId={id}
        filters={filters}
        setFilters={setFilters}
      />

      {/* 🔹 RIGHT CONTENT (your existing UI untouched) */}
      <div style={{ padding: "20px", flex: 1 }}>
        
        {/* Search & Filter */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={handleFilter}>Apply Filter</button>
        </div>

        {/* Product Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.product_id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "center",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ height: "150px", marginBottom: "10px" }}>
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:5000/uploads/${product.images[0]}`}
                      alt={product.name}
                      style={{ maxHeight: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#f0f0f0",
                      }}
                    ></div>
                  )}
                </div>

                <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
                  {product.name}
                </h3>
                <p style={{ color: "#007bff", fontWeight: "bold" }}>
                  ₹{product.price}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <button
                    style={{
                      background: "#ff3b30",
                      color: "#fff",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    onClick={() => addToCart(product.product_id)}
                  >
                    Quick Add
                  </button>
                  <button
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                    onClick={() => addToWishlist(product.product_id)}
                  >
                    ❤️
                  </button>
                  <button
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                  >
                    👁
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );

}

export default ProductFilter;
