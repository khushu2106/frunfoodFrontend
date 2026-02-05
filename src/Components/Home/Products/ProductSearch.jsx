import React, { useState, useEffect } from "react";
import "./ProductSearch.css";

const API_URL = "http://localhost:5000/api/products";

export default function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFiltered(products);
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/search?q=${value}`
      );
      const data = await res.json();
      setFiltered(data);
    } catch (err) {
      console.error(err);
    }
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
              <p>₹{prod.price}</p>
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
