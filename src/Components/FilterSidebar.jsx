import { useEffect, useState } from "react";
import axios from "axios";

function FilterSidebar({ categoryId, filters, setFilters }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/brands/${categoryId}`)
      .then(res => setBrands(res.data));
  }, [categoryId]);

  return (
    <div className="filter-sidebar">
      <h4>Brands</h4>

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

      <h4>Price</h4>
      <input
        type="range"
        min="0"
        max="5000"
        value={filters.maxPrice}
        onChange={e =>
          setFilters({ ...filters, maxPrice: e.target.value })
        }
      />

      <p>₹0 – ₹{filters.maxPrice}</p>
    </div>
  );
}

export default FilterSidebar;
