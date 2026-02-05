import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import axios from "axios";
import "./ProductList.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const BASE_URL = "http://localhost:5000";
  const user_id = 1; // TODO: JWT later
  const productsPerPage = 12;

  /* 🔍 SEARCH QUERY */
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // main products (search / all)
        const productRes = await axios.get(
          searchQuery
            ? `${BASE_URL}/api/products?search=${searchQuery}`
            : `${BASE_URL}/api/products`
        );

        const mainProducts = productRes.data || [];
        setProducts(mainProducts);
        setPage(1);

        // suggestions only when search exists
        if (searchQuery) {
          const allRes = await axios.get(`${BASE_URL}/api/products`);
          const others = allRes.data.filter(
            p => !mainProducts.some(m => m.product_id === p.product_id)
          );
          setSuggestedProducts(others.slice(0, 6));
        } else {
          setSuggestedProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setSuggestedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  /* ================= QUICK ADD ================= */
  const handleQuickAdd = async (product) => {
    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        user_id,
        product_id: product.product_id,
        qty: 1,
        price: product.price,
      });
      alert("Added to cart 🛒");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  /* ================= WISHLIST ================= */
  const handleAddToWishlist = async (product) => {
    try {
      await axios.post(`${BASE_URL}/api/wishlist`, {
        user_id,
        product_id: product.product_id,
      });
      alert("Added to wishlist ❤️");
    } catch (err) {
      alert("Already in wishlist");
    }
  };

  if (loading) {
    return <div className="loading-text">Fetching amazing products...</div>;
  }

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

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
            <>Search results for <span className="highlight">"{searchQuery}"</span></>
          ) : (
            <>Shop Our <span className="highlight">Favorites</span></>
          )}
        </motion.h2>
        <p className="section-subtitle">
          Handpicked quality products for your loving pets.
        </p>
      </div>

      {/* PRODUCTS SLIDER */}
      {currentProducts.length === 0 ? (
        <p className="no-products">No products found 😔</p>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="product-slider"
        >
          {currentProducts.map((product, index) => {
            const imageUrl = product.image
              ? product.image.startsWith("http")
                ? product.image
                : `${BASE_URL}/${product.image}`
              : "/no-image.png";

            return (
              <SwiperSlide key={product.product_id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="product-card"
                >
                  <div className="product-image-box">
                    <Link to={`/product/${product.product_id}`}>
                      <img src={imageUrl} alt={product.name} />
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
                    <h3>{product.name}</h3>
                    <span className="product-price">₹{product.price}</span>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

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

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* 🔥 SUGGESTED PRODUCTS */}
      {searchQuery && suggestedProducts.length > 0 && (
        <>
          <h3 className="suggest-title">You may also like</h3>
          <div className="suggest-grid">
            {suggestedProducts.map(product => (
              <div key={product.product_id} className="product-card">
                <img
                  src={`${BASE_URL}/${product.image}`}
                  alt={product.name}
                />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
