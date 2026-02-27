import { useState } from "react";
import "./FilterSidebar.css";

const categories = ["Dogs", "Cats", "Puppy", "Kitten", "Toys", "Grooming and accessories"];
const brands = ["Pedigree", "Whiskas", "Royal Canin", "Drools", "Purepet", "Me-O", "Felix", "Sheba", "Himalaya"];

const FilterSidebar = ({ onFilter }) => {

  const [tempFilters, setTempFilters] = useState({
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: ""
  });

  const toggleValue = (type, value) => {
    setTempFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  // const applyFilters = () => {
  //   const min = Number(tempFilters.minPrice);
  //   const max = Number(tempFilters.maxPrice);

  //   if(min<0 && max<0){
  //     alert("price should be greater then zero");
  //     return;
  //   }
  //   if (min && max && max < min) {
  //     alert("Max price should be greater then Min price");
  //     return;
  //   }
  //   onFilter(tempFilters);
  // };

  const applyFilters = () => {
    const min = tempFilters.minPrice !== "" ? Number(tempFilters.minPrice) : null;
    const max = tempFilters.maxPrice !== "" ? Number(tempFilters.maxPrice) : null;

    if (min !== null && min < 0) {
      alert("Min price should be greater than or equal to 0");
      return;
    }

    if (max !== null && max < 0) {
      alert("Max price should be greater than or equal to 0");
      return;
    }

    if (min !== null && max !== null && max < min) {
      alert("Max price should be greater than Min price");
      return;
    }

    onFilter({
      ...tempFilters,
      minPrice: min,
      maxPrice: max
    });
  };

  const clearFilters = () => {
    const cleared = {
      categories: [],
      brands: [],
      minPrice: "",
      maxPrice: ""
    };
    setTempFilters(cleared);
    onFilter(cleared);
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      <div className="filter-block">
        <div className="filter-title">Category</div>
        <div className="scroll-box">
          {categories.map(cat => (
            <label key={cat} className="filter-item">
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

      <div className="filter-block">
        <div className="filter-title">Brand</div>
        <div className="scroll-box">
          {brands.map(brand => (
            <label key={brand} className="filter-item">
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

      <div className="filter-block">
        <div className="filter-title">Price</div>
        <input
          type="number"
          placeholder="Min ₹"
          min="100"
          value={tempFilters.minPrice}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, minPrice: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Max ₹"
          min="1"
          value={tempFilters.maxPrice}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, maxPrice: e.target.value })
          }
        />
      </div>

      <button className="apply-btn" onClick={applyFilters}>
        Apply Filters
      </button>

      <button className="clear-btn" onClick={clearFilters}>
        Clear All
      </button>
    </aside>
  );
};

export default FilterSidebar;
