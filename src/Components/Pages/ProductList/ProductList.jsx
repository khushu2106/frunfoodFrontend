import React, { useEffect, useState } from "react";
import ProductFilter from "../Common/ProductFilter";
import {
  getAllProducts,
  filterProducts
} from "../Services/productApi";
import "./ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const handleFilter = async (filters) => {
    const data = await filterProducts(filters);
    setProducts(data);
  };

  return (
    <div className="product-page">
      <ProductFilter onFilter={handleFilter} />

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="product-card" key={p.product_id}>
              <img src={p.image_url} alt={p.product_name} />
              <h3>{p.product_name}</h3>
              <p>₹{p.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
