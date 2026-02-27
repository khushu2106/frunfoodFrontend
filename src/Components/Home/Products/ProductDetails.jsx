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
  const [activeIndex, setActiveIndex] = useState(0);
  const maxQty = product?.stock || 0;

  const BASE_URL = "http://localhost:5000";
  const token = localStorage.getItem("userToken");

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (product && quantity > product.stock) {
      setQuantity(product.stock);
    }
  }, [product]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/api/products/${id}`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setProduct(data);
          const imgs = data.images?.length ? data.images : [data.image_url];
          setImages(imgs);
          setMainImage(imgs[0]);
          setActiveIndex(0);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product API Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="loading-text">Loading Product...</h2>;
  if (!product) return <h2 className="error-text">Product Not Found!</h2>;

  /* ================= PRICE LOGIC ================= */
  const price = Number(product.price);
  const offerPrice = Number(product.offer_price);
  const discountValue = Number(product.discount_value);

  const hasDiscount = offerPrice && offerPrice < price;

  const finalPrice = hasDiscount
    ? offerPrice
    : product.discount_type === "percentage"
      ? price - (price * discountValue / 100)
      : product.discount_type === "flat"
        ? price - discountValue
        : price;

  const discountPercent = hasDiscount
    ? Math.round(((price - offerPrice) / price) * 100)
    : product.discount_type === "percentage"
      ? discountValue
      : 0;

  const showNextImage = () => {
    const next = (activeIndex + 1) % images.length;
    setActiveIndex(next);
    setMainImage(images[next]);
  };

  const showPrevImage = () => {
    const prev = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(prev);
    setMainImage(images[prev]);
  };

  // ===================== WEIGHT HELPER FUNCTION =====================
  const formatWeight = (weight) => {
    if (!weight) return "";
    if (weight < 1) {
      return `${weight * 1000} g`; // Convert to grams
    } else {
      return `${weight} kg`; // Keep in kg
    }
  };
  // ===================================================================
  /* ================= ADD TO CART ================= */
  /* ================= ADD TO CART (Sync Support) ================= */
  const handleAddToCart = async () => {
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available`);
      return;
    }
    const cartItem = {
      product_id: product.product_id,
      name: product.name,
      price: finalPrice,
      qty: quantity,
      image_url: mainImage,
    };

    if (!token) {
      // Guest logic: LocalStorage update
      let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const existingIndex = guestCart.findIndex(item => item.product_id === product.product_id);

      if (existingIndex > -1) {
        guestCart[existingIndex].qty += quantity;
      } else {
        guestCart.push(cartItem);
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      alert("Added to guest cart! Login to save it forever. 🛒");
      window.location.reload();
      return;
    }

    // Logged in user logic
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
    if (!token) {
      alert("Please login first!");
      return;
    }

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

      navigate("/checkout", {
        state: {
          directBuy: true,
          cartItems: [
            {
              product_id: product.product_id,
              name: product.name,
              price: finalPrice,
              originalPrice: price,
              qty: quantity,
              image: mainImage
            }
          ],
          totalAmount: finalPrice * quantity
        }
      });

    } catch (err) {
      console.error(err);
      alert("Unable to proceed to checkout");
    }
  };
  /* ================= WISHLIST ================= */
  /* ================= WISHLIST (Guest + User) ================= */
  const handleAddToWishlist = async () => {
    if (!token) {
      // Visitor Logic
      let guestWish = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
      const exists = guestWish.some(item => item.product_id === product.product_id);

      if (!exists) {
        guestWish.push({ product_id: product.product_id, name: product.name });
        localStorage.setItem("guestWishlist", JSON.stringify(guestWish));
        alert("Added to guest wishlist ❤️");
        window.location.reload();
      } else {
        alert("Already in wishlist ❤️");
      }
      return;
    }

    // Logged-in User Logic
    try {
      await axios.post(
        `${BASE_URL}/api/wishlist`,
        { product_id: product.product_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to wishlist ❤️");
      window.location.reload();
    } catch (error) {
      alert(error.response?.status === 400 ? "Already in wishlist ❤️" : "Failed to add");
    }
  };

  return (
    <>
      <div className="product-details-page">
        <div className="pd-container">

          {/* IMAGE SECTION */}
          <div className="pd-image-section">

            {/* MAIN IMAGE */}
            <div className="main-image">
              {images.length > 1 && (
                <button className="img-nav left" onClick={showPrevImage}>‹</button>
              )}

              {mainImage
                ? <img src={`${BASE_URL}/${mainImage}`} alt={product.name} />
                : <img src="/no-image.png" alt="No Image" />
              }

              {images.length > 1 && (
                <button className="img-nav right" onClick={showNextImage}>›</button>
              )}
            </div>

            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div className="thumbnail-row">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={`${BASE_URL}/${img}`}
                    onClick={() => {
                      setMainImage(img);
                      setActiveIndex(i);
                    }}
                    className={`thumbnail-img ${activeIndex === i ? "active" : ""}`}
                    alt={`thumb-${i}`}
                  />
                ))}
              </div>
            )}

          </div>

          {/* INFO SECTION */}
          <div className="pd-info-section">

            <h1 className="pd-title">{product.name}</h1>

            {/* RATING */}
            <p className="pd-rating">
              ⭐ {Number(product.rating) > 0
                ? Number(product.rating).toFixed(1)
                : "No Ratings"}
            </p>

            {/* PRICE */}
            <p className="pd-price">
              {hasDiscount ? (
                <>
                  <span className="old-price">₹{price}</span>
                  <span className="offer-price">₹{Math.round(finalPrice)}</span>

                  {discountPercent > 0 && (
                    <span className="badge">
                      {discountPercent}% OFF
                    </span>
                  )}
                </>
              ) : (
                <span>₹{price}</span>
              )}
            </p>

            {/* STOCK */}
            <p className={`pd-stock-status ${product.stock_status === "In Stock"
              ? "in-stock"
              : product.stock_status === "Low Stock"
                ? "low-stock"
                : "out-of-stock"
              }`}>
              {product.stock_status}
            </p>

            {/* ================= WEIGHT ================= */}
            {product.weight && (
              <p className="pd-weight">Weight: {formatWeight(product.weight)}</p>
            )}

            <p className="pd-description">{product.description}</p>

            {/* ACTIONS */}
            <div className="pd-options">

              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product?.stock === 0}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                  disabled={quantity >= maxQty}
                >
                  +
                </button>
              </div>

              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock_status === "Out of Stock"}
              >
                Add to Cart 🛒
              </button>

              <button
                className="shop-now-btn"
                onClick={handleShopNow}
                disabled={product?.stock === 0}
              >
                Shop Now ⚡
              </button>

              <button className="wishlist-btn" onClick={handleAddToWishlist}>
                <FaHeart /> Wishlist
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* <ProductList />
      <Offers /> */}
    </>
  );
};

export default ProductDetails;