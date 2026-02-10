import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ProductSearch.css";

const API_URL = "http://localhost:5000/api/products";

export default function ProductSearch() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const [search, setSearch] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔁 URL → state sync
  useEffect(() => {
    setSearch(query);
  }, [query]);

  // 🔍 API call
  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      setLoading(true);

      fetch(`${API_URL}/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="product-search-wrapper">
      <h2>Search Results</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p>Searching...</p>}

      <div className="product-grid">
        {results.length > 0 ? (
          results.map((prod) => (
            <div className="product-card" key={prod.product_id}>
              <img
                src={prod.image}
                alt={prod.product_name}
                onError={(e) => (e.target.src = "/no-image.png")}
              />
              <h3>{prod.product_name}</h3>
              <p>₹{prod.price}</p>
              <a href={`/product/${prod.product_id}`} className="view-btn">
                View
              </a>
            </div>
          ))
        ) : (
          search && !loading && <p>No products found</p>
        )}
      </div>
    </div>
  );
}
