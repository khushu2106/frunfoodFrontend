import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Category.css";
import ProductList from "./ProductList";
import Offers from "../Offers/Offers";

const categoryNames = {
  1: "Dog",
  2: "Cat",
  3: "Kitten",
  4: "Puppy",
  5: "Toys",
  6: "Grooming & Accessories",
};

const CategoryProducts = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);

    const url =
      parseInt(id) === 0
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products/category/${id}`;

    axios
      .get(url)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setProducts(data);
      })
      .catch((err) => console.error("Frontend Error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  if (loading) {
    return (
      <div className="loader">
        <h2>Loading Products...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="category-products-container">
        <h4>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            ← Back to Home
          </Link>
        </h4>

        <h2 className="category-title" style={{ backgroundColor: "#f9f9f9", color: "#6b2e1f" }}>
          Search for category :{" "}
          {parseInt(id) === 0
            ? "All Products"
            : categoryNames[id] || "Products"}
        </h2>

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products found in this category.</p>
            <Link to="/" className="back-link">
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            {/* PRODUCT GRID */}
            <div className="category-products-grid">
              {currentProducts.map((p) => (
                <div key={p.product_id} className="product-card">
                  <div className="product-image-wrapper">
                    <Link to={`/product/${p.product_id}`} className="product-image-wrapper">
                      <img
                        src={
                          p.image
                            ? `http://localhost:5000/${p.image}`
                            : "https://via.placeholder.com/150"
                        }
                        alt={p.name}
                      />
                    </Link>

                  </div>

                  <div className="product-info">
                    <h4>{p.name}</h4>
                    <p className="price">₹{p.price}</p>
                    {p.weight && (
                      <span className="weight-tag">
                        {p.weight} gm
                      </span>
                    )}
                    <Link
                      to={`/product/${p.product_id}`}
                      className="view-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={
                    currentPage === i + 1 ? "active" : ""
                  }
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <ProductList />
      <Offers />
    </>
  );
};

export default CategoryProducts;
