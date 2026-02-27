import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./ProductSearch.css";
import Category from "./Category";
import ProductList from "./ProductList";
import Offers from "../Offers/Offers";

const API_URL = "http://localhost:5000/api/products";

export default function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const [search, setSearch] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Sync input with URL
  useEffect(() => {
    setSearch(query);
  }, [query]);

  // Fetch search results
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Smooth debounce search input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      if (value.trim()) {
        setSearchParams({ search: value });
      } else {
        setSearchParams({});
      }
    }, 500);

    setTypingTimeout(timeout);
  };

  return (
    <>
    <div className="product-search-wrapper">
      <Link to={`/`}>
      <h4>← Back to Home</h4>
      </Link>
      {/* <h2>Search Products</h2> */}

      {/* Search Input */}
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleInputChange}
        />
      </div> */}

      {/* Loader */}
      {/* {loading && <div className="loader">Searching products...</div>} */}

      {/* Results */}
      <div className="product-grid">
        {!loading && results.length > 0 &&
          results.map((prod) => (
            <div className="product-card" key={prod.product_id}>
              <Link to={`/product/${prod.product_id}`}>
              <img
                src={`http://localhost:5000/${prod.image}`}
                alt={prod.product_name} 
                // onError={(e) =>
                //   (e.target.src = "https://via.placeholder.com/150?text=No+Image")
                // }
              />
              </Link>
              <div className="product-info">
                <h3>{prod.product_name}</h3>
                <p className="price">₹{prod.price}</p>
                <Link to={`/product/${prod.product_id}`} className="view-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))
        }
      </div>
      

      {/* No Results */}
      {!loading && query && results.length === 0 && (
        <div className="no-results">
          No products found for "{query}"
        </div>
      )}

    </div>
    {/* <Category />
    <Offers /> */}
    </>
  );
}
