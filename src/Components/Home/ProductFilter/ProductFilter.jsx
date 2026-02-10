// FILTERSIDEBAR.JSX
import { useState } from "react";
import "./ProductFilter.css";

const categories = [
  "Dog",
  "Cat",
  "Puppy",
  "Kitten",
  "Accessories",
  "Grooming"
];

const brands = [
  "Pedigree",
  "Whiskas",
  "Royal Canin",
  "Drools",
  "Purepet",
  "Me-O",
  "Felix",
  "Sheba",
  "Himalaya"
];

const ProductFilter = ({ filters, setFilters }) => {
  // ✅ temp state (before apply)
  const [tempFilters, setTempFilters] = useState(filters);

  const toggleValue = (type, value) => {
    setTempFilters({
      ...tempFilters,
      [type]: tempFilters[type].includes(value)
        ? tempFilters[type].filter(v => v !== value)
        : [...tempFilters[type], value]
    });
  };

  const applyFilters = () => {
    setFilters(tempFilters);
  };

  const clearFilters = () => {
    const cleared = {
      categories: [],
      brands: [],
      minPrice: "",
      maxPrice: ""
    };
    setTempFilters(cleared);
    setFilters(cleared);
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      {/* CATEGORY */}
      <div className="filter-block">
        <div className="filter-title">Category</div>
        <div className="scroll-box">
          {categories.map(cat => (
            <label className="filter-item" key={cat}>
              <input
                type="checkbox"
                checked={tempFilters.categories.includes(cat)}
                onChange={() => toggleValue("categories", cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* BRAND */}
      <div className="filter-block">
        <div className="filter-title">Brand</div>
        <div className="scroll-box">
          {brands.map(brand => (
            <label className="filter-item" key={brand}>
              <input
                type="checkbox"
                checked={tempFilters.brands.includes(brand)}
                onChange={() => toggleValue("brands", brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className="filter-block">
        <div className="filter-title">Price Range</div>
        <input
          type="number"
          placeholder="Min ₹"
          value={tempFilters.minPrice}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, minPrice: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Max ₹"
          value={tempFilters.maxPrice}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, maxPrice: e.target.value })
          }
        />
      </div>

      {/* BUTTONS */}
      <button className="apply-btn" onClick={applyFilters}>
        Apply Filters
      </button>

      <button className="clear-btn" onClick={clearFilters}>
        Clear All
      </button>
    </aside>
  );
};

export default ProductFilter;