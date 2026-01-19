import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import ProductList from './ProductList';
import Offers from '../Offers/Offers';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products/${id}`)
      .then(res => {
        const data = res.data;
        setProduct(data);

        if (data.images && data.images.length > 0) {
          setImages(data.images);
          setMainImage(data.images[0]);
        } else if (data.image_url) {
          
          setImages([data.image_url]);
          setMainImage(data.image_url);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const existing = cart.find(item => item.id === product.product_id);
    if (existing) {
      cart = cart.map(item =>
        item.id === product.product_id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      cart.push({
        id: product.product_id,
        name: product.name,
        price: product.price,
        image: `${BASE_URL}/${product.image_url}`,
        quantity
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));


    navigate("/cart");
  };

  if (loading) return <h2>Loading Product...</h2>;
  if (!product) return <h2>Product Not Found!</h2>;

  return (
    <>
      <div className="product-details-page">
        <div className="pd-container">

          {/* Image Section */}
          <div className="pd-image-section">
            <div className="main-image">
              {mainImage && (
                <img
                  src={`${BASE_URL}/${mainImage}`}
                  alt={product.name}
                />
              )}
            </div>

            <div className="thumbnail-row">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`${BASE_URL}/${img}`}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                  className={`thumbnail-img ${mainImage === img ? 'active' : ''}`}
                  style={{ width: '80px', height: '80px', marginRight: '10px', cursor: 'pointer', border: mainImage === img ? '2px solid orange' : '1px solid #ccc' }}
                />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="pd-info-section">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-price">₹{product.price}</p>
            <p className="pd-description">
              {product.description || "No description available"}
            </p>

            <div className="pd-options">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>

        </div>
      </div>

      <ProductList />
      <Offers />
    </>
  );
};

export default ProductDetails;
