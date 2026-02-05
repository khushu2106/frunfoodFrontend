import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const BASE_URL = "http://localhost:5000";
  const user_id = 1; // ⚠️ later JWT
  const productsPerPage = 12;

  /* 🔍 SEARCH QUERY FROM URL */
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  /* ================= FETCH PRODUCTS (SEARCH + SUGGESTIONS) ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = searchQuery
          ? `${BASE_URL}/api/products?search=${searchQuery}`
          : `${BASE_URL}/api/products`;

        // 🔹 main products
        const response = await axios.get(url);
        const resultProducts = response.data || [];
        setProducts(resultProducts);
        setPage(1);

        // 🔹 suggestions (only when search applied)
        if (searchQuery) {
          const allRes = await axios.get(`${BASE_URL}/api/products`);
          const others = allRes.data.filter(
            p => !resultProducts.find(r => r.product_id === p.product_id)
          );
          setSuggestedProducts(others.slice(0, 6));
        } else {
          setSuggestedProducts([]);
        }

      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setSuggestedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  /* ================= QUICK ADD TO CART ================= */
  const handleQuickAdd = async (product) => {
    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        user_id,
        product_id: product.product_id,
        qty: 1,
        price: product.price
      });
      alert("Added to cart 🛒");
    } catch (error) {
      console.error("Quick Add Error:", error);
      alert("Failed to add to cart");
    }
  };

  /* ================= ADD TO WISHLIST ================= */
  const handleAddToWishlist = async (product) => {
    try {
      await axios.post(`${BASE_URL}/api/wishlist`, {
        user_id,
        product_id: product.product_id
      });
      alert("Added to wishlist ❤️");
    } catch (error) {
      console.error("Wishlist Error:", error);
      alert("Already in wishlist or error occurred");
    }
  };

  if (loading) {
    return <div className="loading-text">Fetching amazing products...</div>;
  }

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <section className="product-section">
      {/* HEADER */}
      <div className="product-header">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          {searchQuery ? (
            <>
              Search results for <span className="highlight">"{searchQuery}"</span>
            </>
          ) : (
            <>
              Shop Our <span className="highlight">Favorites</span>
            </>
          )}
        </motion.h2>

        <p className="section-subtitle">
          Handpicked quality products for your loving pets.
        </p>
      </div>

      {/* MAIN PRODUCTS */}
      <div className="product-grid">
        {currentProducts.length === 0 && (
          <p className="no-products">No products found 😔</p>
        )}

        {currentProducts.map((product, index) => {
          const imageUrl = product.image
            ? product.image.startsWith("http")
              ? product.image
              : `${BASE_URL}/${product.image}`
            : "/no-image.png";

          return (
            <motion.div
              key={product.product_id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="product-card-container"
            >
              <div className="product-card">
                <div className="product-image-box">
                  <Link to={`/product/${product.product_id}`}>
                    <img src={imageUrl} alt={product.name} className="product-img" />
                  </Link>

                  <div className="hover-action">
                    <button
                      className="action-btn"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <Heart size={18} />
                    </button>

                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleQuickAdd(product)}
                    >
                      <ShoppingCart size={18} /> Quick Add
                    </button>

                    <Link
                      to={`/product/${product.product_id}`}
                      className="action-btn"
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}

      {/* 🔥 SUGGESTED PRODUCTS */}
      {searchQuery && suggestedProducts.length > 0 && (
        <>
          <h3 className="suggest-title">You may also like</h3>

          <div className="product-grid">
            {suggestedProducts.map(product => {
              const imageUrl = product.image
                ? `${BASE_URL}/${product.image}`
                : "/no-image.png";

              return (
                <div key={product.product_id} className="product-card">
                  <img src={imageUrl} alt={product.name} className="product-img" />
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">₹{product.price}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
