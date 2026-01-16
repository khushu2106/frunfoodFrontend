import React, { useState, useEffect } from "react";
import "./ProductSearch.css";
// Example API (replace with your actual API)
const API_URL = "https://example.com/api/products"; // API for products

export default function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Fetch products from API
  useEffect(() => {
    // API call example
    fetch(API_URL) // GET request to fetch products
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle Search Input
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const query = e.target.value.toLowerCase();
    const filteredData = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    setFiltered(filteredData);
  };

  return (
    <div className="product-search-wrapper">
      <h2>Search Products</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((prod) => (
            <div className="product-card" key={prod.id}>
              <img src={prod.image} alt={prod.name} />
              <h3>{prod.name}</h3>
              <p>${prod.price}</p>
              <a href={`/product/${prod.id}`} className="view-btn">
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
