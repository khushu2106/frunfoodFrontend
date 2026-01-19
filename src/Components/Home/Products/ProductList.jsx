import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Animations ke liye
import { ShoppingCart, Heart, Eye } from "lucide-react"; // Mast icons ke liye
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Jab loading ho raha ho tab ye "Skeleton" dikhega
  if (loading) return <div className="loading-text">Fetching amazing products...</div>;

  return (
    <section className="product-section">
      <div className="product-header">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          Shop Our <span className="highlight">Favorites</span>
        </motion.h2>
        <p className="section-subtitle">Handpicked quality products for your loving pets.</p>
      </div>

      <div className="product-grid">
        {products.map((product, index) => {
          const imageUrl = product.image
            ? product.image.startsWith("http") ? product.image : `${BASE_URL}/${product.image}`
            : "/no-image.png";

          return (
            <motion.div 
              key={product.product_id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }} // Ek-ek karke aayenge cards
              viewport={{ once: true }}
              className="product-card-container"
            >
              <div className="product-card">
                <div className="product-image-box">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  
                  <Link to={`/product/${product.product_id}`}>
                    <img src={imageUrl} alt={product.name} className="product-img" />
                  </Link>

                  {/* Hover Buttons */}
                  <div className="hover-action">
                    <button className="action-btn" title="Add to Wishlist">
                      <Heart size={18} />
                    </button>
                    <button className="add-to-cart-btn">
                      <ShoppingCart size={18} /> Quick Add
                    </button>
                    <Link to={`/product/${product.product_id}`} className="action-btn">
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>

                <div className="product-info">
                  <span className="product-cat">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                    <div className="rating">⭐ 4.5</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="view-all-container">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="view-all-btn"
        >
          View All Products
        </motion.button>
      </div>
    </section>
  );
};

export default ProductList;