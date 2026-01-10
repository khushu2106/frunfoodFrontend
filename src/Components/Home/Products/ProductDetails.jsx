import React, { useState } from 'react';
import './ProductDetails.css';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Premium Realistic Dog Chew Toy",
    price: 24.99,
    rating: 4.8,
    reviews: 124,
    description: "Aapke pet ke liye sabse mazboot aur safe khilona. Yeh toy high-quality non-toxic rubber se bana hai jo teething dogs ke liye perfect hai. Isse aapka pet ghanton busy rahega aur unke daant bhi saaf rahenge.",
    sku: "PET-TOY-001",
    category: "Toys",
    stock: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800",
      "https://images.unsplash.com/photo-1591768793355-74d7af73d72a?q=80&w=800"
    ]
  };

  return (
    <div className="product-details-page">
      <div className="pd-container">
        
        {/* Left Side: Images */}
        <div className="pd-image-section">
          <div className="main-image">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <div className="thumbnail-row">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt="thumb" className="thumb" />
            ))}
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="pd-info-section">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.name}</h1>
          
          <div className="pd-rating">
            <span className="stars">⭐⭐⭐⭐⭐</span>
            <span className="review-count">({product.reviews} Customer Reviews)</span>
          </div>

          <p className="pd-price">${product.price}</p>
          
          <div className="pd-stock">
            <span className="stock-dot"></span> {product.stock}
          </div>

          <p className="pd-description">{product.description}</p>

          <div className="pd-options">
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart-btn">Add to Cart 🛒</button>
          </div>

          <div className="pd-extra-info">
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Tags:</strong> Eco-friendly, Durable, Pet-safe</p>
          </div>

          <div className="pd-features">
            <div className="feature">
              <span>🚚</span>
              <p>Free Delivery</p>
            </div>
            <div className="feature">
              <span>🔄</span>
              <p>30 Days Return</p>
            </div>
            <div className="feature">
              <span>🛡️</span>
              <p>Secure Payment</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;