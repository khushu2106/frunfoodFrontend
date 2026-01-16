import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  console.log(products);
  return (
    <section className="product-section">
      <div className="product-header">
        <h2 className="section-title">Shop Our <span className="highlight">Favorites</span></h2>
        <p className="section-subtitle">Handpicked quality products for your loving pets.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <Link
            key={product.product_id}
            to={`/product/${product.product_id}`}
            className="product-link"
          >

            <div className="product-card">
              <div className="product-image-box">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  width="150"
                />
                <div className="hover-action">
                  <button className="add-to-cart">Quick Add +</button>
                </div>
              </div>

              <div className="product-info">
                <span className="product-cat">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button className="wishlist-btn">❤️</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="view-all-container">
        <button className="view-all-btn">View All Products</button>
      </div>
    </section>
  );
};

export default ProductList;
