import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductListing.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams(); 

  useEffect(() => {
    loadProducts();
  }, [categoryId]); 

  const loadProducts = async () => {
    try {
      let url = "http://localhost:5000/api/products";
      
      if (categoryId) {
        url = `http://localhost:5000/api/products?categories=${categoryId}`;
      }

      console.log("Requesting URL:", url);

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  const handleFilterChange = async (filters) => {
    try {
      const params = new URLSearchParams();

      filters.categories.forEach(cat => params.append("categories", cat));
      filters.brands.forEach(brand => params.append("brands", brand));
      if (categoryId && filters.categories.length === 0) {
        params.append("categories", categoryId);
      }

      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const res = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-page">
      <FilterSidebar onFilter={handleFilterChange} />
      <div className="product-container">
        {products.length === 0 ? (
          <p className="no-products">No products found in this category</p>
        ) : (
          products.map(product => (
            <ProductCard key={product.product_id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListing;