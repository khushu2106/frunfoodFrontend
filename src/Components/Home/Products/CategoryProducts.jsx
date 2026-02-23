import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Category.css";
import ProductList from "./ProductList";
import Offers from "../Offers/Offers";
import FilterSidebar from "../FilterSidebar/FilterSidebar";

const categoryNames = {
  1: "Dog", 2: "Cat", 3: "Kitten", 4: "Puppy", 5: "Toys", 6: "Grooming & Accessories",
};

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayTitle, setDisplayTitle] = useState(""); // New State for Title
  const productsPerPage = 8;

  const fetchCategoryProducts = async (filters = null) => {
    setLoading(true);
    try {
      let url = parseInt(id) === 0
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products/category/${id}`;

      // Title logic handling
      if (filters && filters.categories.length > 0) {
        // Agar sidebar se select kiya hai toh unke naam dikhao
        const selectedNames = filters.categories
          .map(catId => categoryNames[catId])
          .filter(name => name) // undefined safety
          .join(", ");
        setDisplayTitle(selectedNames);
      } else {
        // Default URL wali category dikhao
        setDisplayTitle(parseInt(id) === 0 ? "All Products" : categoryNames[id] || "Products");
      }

      if (filters) {
        const params = new URLSearchParams();
        filters.categories.forEach(cat => params.append("categories", cat));
        filters.brands.forEach(brand => params.append("brands", brand));
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
        
        // Filter hone par main product endpoint use karein
        url = `http://localhost:5000/api/products?${params.toString()}`;
      }

      const res = await axios.get(url);
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setProducts(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchCategoryProducts();
  }, [id]);

  const handleFilterChange = (filters) => {
    fetchCategoryProducts(filters);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <div className="category-page-layout" style={{ display: "flex" }}>
        
        <FilterSidebar onFilter={handleFilterChange} />

        <div className="category-products-container" style={{ flex: 1, padding: "20px" }}>
          <h4>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>← Back to Home</Link>
          </h4>

          {/* Dynamic Title Updated Here */}
          <h2 className="category-title">
            Showing Results for: <span style={{ color: "#ff6b6b" }}>{displayTitle}</span>
          </h2>

          {loading ? (
            <div className="loader"><h2>Loading Products...</h2></div>
          ) : products.length === 0 ? (
            <div className="no-products"><p>No products found matching these filters.</p></div>
          ) : (
            <>
              <div className="category-products-grid">
                {currentProducts.map((p) => (
                  <div key={p.product_id} className="product-card" style={{maxHeight:"450px"}}>
                    <div className="product-image-wrapper">
                      <Link to={`/product/${p.product_id}`}>
                        <img src={p.image ? `http://localhost:5000/${p.image}` : "https://via.placeholder.com/150"} alt={p.name} />
                      </Link>
                    </div>
                    <div className="product-info">
                      <h4>{p.name || p.product_name}</h4>
                      <p className="price">₹{p.price}</p>
                      <Link to={`/product/${p.product_id}`} className="view-btn">View Details</Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo(0, 0);
                  }}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ProductList />
      <Offers />
    </>
  );
};

export default CategoryProducts;