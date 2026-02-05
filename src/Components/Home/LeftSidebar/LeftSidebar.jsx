import { useEffect, useState } from "react";
import axios from "axios";
import "./LeftSidebar.css";

function LeftSidebar({ filters, setFilters, categoryId }) {
  const [brands, setBrands] = useState([]);

  // Fetch brands based on category
  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:5000/api/brands/${categoryId}`)
        .then(res => setBrands(res.data))
        .catch(err => console.log(err));
    }
  }, [categoryId]);

  return (
    <div className="left-sidebar">

      {/* BRAND FILTER */}
      <div className="filter-section">
        <h4>Brand</h4>
        {brands.map((b, index) => (
          <label key={index}>
            <input
              type="radio"
              name="brand"
              onChange={() =>
                setFilters({ ...filters, brand: b.brand })
              }
            />
            {b.brand}
          </label>
        ))}
      </div>

      {/* PRICE FILTER */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <input
          type="range"
          min="0"
          max="5000"
          value={filters.maxPrice}
          onChange={e =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
        />
        <p>₹0 - ₹{filters.maxPrice}</p>
      </div>

    </div>
  );
}

export default LeftSidebar;
