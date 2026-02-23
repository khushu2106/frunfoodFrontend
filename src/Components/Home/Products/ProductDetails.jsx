import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import ProductList from "./ProductList";
import Offers from "../Offers/Offers";
import { FaHeart } from "react-icons/fa";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");

  const BASE_URL = "http://localhost:5000";
  const token = localStorage.getItem("userToken");

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/api/products/${id}`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setProduct(data);
          setImages(data.images || []);
          setMainImage(data.images?.[0] || "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product API Error:", err);
        setLoading(false);
      });
  }, [id]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async () => {

    if (!product) return;

    if (!token) {
      alert("Please login first!");
      return;
    }

    const finalPrice =
      product.offer_price && product.offer_price < product.price
        ? product.offer_price
        : product.price;

    try {
      await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          product_id: product.product_id,
          qty: quantity,
          price: finalPrice
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Added to cart 🛒");
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };

  /* ================= SHOP NOW ================= */
  const handleShopNow = async () => {

    if (!product) return;

    if (!token) {
      alert("Please login first!");
      return;
    }

    const finalPrice =
      product.offer_price && product.offer_price < product.price
        ? product.offer_price
        : product.price;

    try {

      await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          product_id: product.product_id,
          qty: quantity,
          price: finalPrice
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const checkoutItem = [{
        product_id: product.product_id,
        name: product.name,
        price: finalPrice,
        qty: quantity,
        image: mainImage || product.images?.[0],
        discount: product.discount_value || 0
      }];

      navigate("/checkout", {
        state: {
          directBuy: true,
          directProduct: {
            product_id: product.product_id,
            name: product.name,
            price: product.offer_price || product.price,
            originalPrice: product.price,
            qty: 1,
            image: product.image
          }
        }
      });

    } catch (err) {
      console.error(err);
      alert("Unable to proceed to checkout");
    }
  };

  /* ================= WISHLIST ================= */
  const handleAddToWishlist = async () => {

    if (!product) return;

    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/wishlist`,
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

  if (loading) return <h2 className="loading-text">Loading Product...</h2>;
  if (!product) return <h2 className="error-text">Product Not Found!</h2>;

  const finalPrice =
    product.offer_price && product.offer_price < product.price
      ? product.offer_price
      : product.price;

  return (
    <>
      <div className="product-details-page">
        <div className="pd-container">

          {/* IMAGE SECTION */}
          <div className="pd-image-section">
            <div className="main-image">
              {mainImage
                ? <img src={`${BASE_URL}/${mainImage}`} alt={product.name} />
                : <img src="/no-image.png" alt="No Image" />
              }
            </div>

            {images.length > 1 && (
              <div className="thumbnail-row">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={`${BASE_URL}/${img}`}
                    onClick={() => setMainImage(img)}
                    className={`thumbnail-img ${mainImage === img ? "active" : ""}`}
                    alt={`thumb-${i}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* INFO SECTION */}
          <div className="pd-info-section">

            <h1 className="pd-title">{product.name}</h1>

            {/* PRICE UI */}
            <p className="pd-price">

              {finalPrice < product.price ? (
                <>
                  <span className="old-price">₹{product.price}</span>
                  <span className="offer-price">₹{finalPrice}</span>
                </>
              ) : (
                <span>₹{product.price}</span>
              )}

            </p>

            <p className={`pd-stock-status ${product.stock_status === "In Stock"
              ? "in-stock"
              : product.stock_status === "Low Stock"
                ? "low-stock"
                : "out-of-stock"
              }`}>
              {product.stock_status}
            </p>

            <p className="pd-description">{product.description}</p>

            <div className="pd-options">

              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart 🛒
              </button>

              <button className="shop-now-btn" onClick={handleShopNow}>
                Shop Now ⚡
              </button>

              <button className="wishlist-btn" onClick={handleAddToWishlist}>
                <FaHeart /> Wishlist
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
