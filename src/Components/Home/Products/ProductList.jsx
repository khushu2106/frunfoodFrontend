import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const productsPerPage = 12;

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productRes = await axios.get(
          searchQuery
            ? `${BASE_URL}/api/products?search=${searchQuery}`
            : `${BASE_URL}/api/products`
        );

        const mainProducts = productRes.data || [];
        setProducts(mainProducts);
        setPage(1);

        if (searchQuery) {
          const allRes = await axios.get(`${BASE_URL}/api/products`);
          const others = allRes.data.filter(
            p => !mainProducts.some(m => m.product_id === p.product_id)
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

  /* ================= QUICK ADD ================= */
  const handleQuickAdd = async (product) => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        product_id: product.product_id,
        qty: 1,
        price: product.price,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Added to cart 🛒");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };

  /* ================= WISHLIST ================= */
  const handleAddToWishlist = async (product) => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/wishlist`,
        { product_id: product.product_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Added to wishlist ❤️");
      window.location.reload();
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Already in wishlist ❤️");
      } else {
        alert("Failed to add to wishlist");
      }
    }
  };

  if (loading) {
    return <div className="loading-text">Fetching amazing products...</div>;
  }

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <section className="product-section">

      <div className="product-header">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          {searchQuery ? (
            <>Search results for <span className="highlight">"{searchQuery}"</span></>
          ) : (
            <>
              <div className="text">
                Shop Our <span className="highlight">Favorites</span>
              </div>
              <div className="tagline">
                Everything your pet loves, all in one place 🐾
              </div>
            </>
          )}
        </motion.h2>
      </div>

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

                    {/* IMAGE CLICK OPENS DETAILS */}
                    <img
                      src={imageUrl}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.product_id}`)}
                      style={{ cursor: "pointer" }}
                    />

                    <div className="hover-action">
                      <button className="action-btn" onClick={() => handleAddToWishlist(product)}>
                        <Heart size={18} />
                      </button>

                      <button className="add-to-cart-btn" onClick={() => handleQuickAdd(product)}>
                        <ShoppingCart size={18} /> Quick Add
                      </button>

                      <Eye
                        size={18}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/product/${product.product_id}`)}
                      />
                    </div>

                  </div>

                  <div className="product-info">
                    <h3>{product.product_name}</h3>
                    <span className="product-price">₹{product.price}</span>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
};

export default ProductList;
