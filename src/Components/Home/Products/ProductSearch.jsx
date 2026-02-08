import React, { useState, useEffect } from "react";
import "./ProductSearch.css";

const API_URL = "http://localhost:5000/api/products";

export default function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Fetch all products once on mount
  // useEffect(() => {
  //   fetch(API_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setFiltered(data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // Debounce search
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (search.trim() === "") {
  //       // Empty search → show all products
  //       setFiltered(products);
  //       return;
  //     }

  //     fetch(`${API_URL}/search?q=${search}`)
  //       .then((res) => res.json())
  //       .then((data) => setFiltered(data))
  //       .catch((err) => console.error(err));
  //   }, 300); // 300ms delay

  //   return () => clearTimeout(timer);
  // }, [search, products]);

  return (
    <div className="product-search-wrapper">
      <h2>Search Products</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((prod) => (
            <div className="product-card" key={prod.product_id}>
              <img src={prod.image} alt={prod.product_name} />
              <h3>{prod.product_name}</h3>
              <p>₹{prod.price}</p>
              <a href={`/product/${prod.product_id}`} className="view-btn">
                View
              </a>
            </div>
          ))
        ) : (
          <p>No products found!</p>
        )}
      </div>
    </div>
  );
}
