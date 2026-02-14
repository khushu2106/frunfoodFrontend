import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import ProductList from "./ProductList";
import Offers from "../Offers/Offers";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";

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
  // const user_id = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      user_id = payload.user_id || payload.id;
    } catch (e) {
      console.error("Token decoding error:", e);
    }
  }

  /* ⭐ Dummy rating */
  // const rating = 4;
  // const reviews = [
  //   { user: "Amit", comment: "Very good quality product!" },
  //   { user: "Neha", comment: "Worth the price 👍" },
  //   { user: "Rahul", comment: "My pet loved it 🐶" }
  // ];

  /* ================= FETCH PRODUCT ================= */
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`${BASE_URL}/api/products/${id}`)
  //     .then((res) => {
  //       const data = res.data;
  //       if (Array.isArray(data) && data.length > 0) {
  //         setProduct(data[0]);
  //         const imgs = data.map(i => i.image_url).filter(Boolean);
  //         setImages(imgs);
  //         setMainImage(imgs[0] || "");
  //       } else if (data && data.product_id) {
  //         setProduct(data);
  //         setImages(data.image_url ? [data.image_url] : []);
  //         setMainImage(data.image_url || "");
  //       } else {
  //         setProduct(null);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Product API Error:", err);
  //       setLoading(false);
  //     });
  // }, [id]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/products/${id}`)
      .then((res) => {
        const data = res.data; 

        if (data) {
          setProduct(data);
          setImages(data.images || []);
          setMainImage(data.images && data.images.length > 0 ? data.images[0] : "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product API Error:", err);
        setLoading(false);
      });
  }, [id]);

  /* ================= ADD TO CART (Token Friendly) ================= */
  const handleAddToCart = async () => {
    if (!product) return;
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        product_id: product.product_id,
        qty: quantity,
        price: product.price
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate("/cart");
    } catch (error) {
      console.error("Add to Cart Error:", error);
      alert("Failed to add to cart");
    }
  };

  /* ================= SHOP NOW (Token Friendly) ================= */
  const handleShopNow = async () => {
    if (!product) return;
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        product_id: product.product_id,
        qty: quantity,
        price: product.price
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate("/checkout", {
        state: {
          totalAmount: product.price * quantity,
          buyNow: true,
          product: product,
          qty: quantity
        }
      });
    } catch (err) {
      console.error("Shop Now Error:", err);
      alert("Unable to proceed");
    }
  };

  /* ================= WISHLIST (Token Friendly) ================= */
  const handleAddToWishlist = async () => {
    if (!product) return;
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
    } catch (error) {
      console.error("Wishlist Error:", error);
      if (error.response?.status === 400) {
        alert("Already in wishlist ❤️");
      } else {
        alert("Failed to add to wishlist");
      }
    }
  };
  /* ================= STAR UI ================= */
  const renderStars = () => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} color="#f59e0b" />
      ) : (
        <FaRegStar key={i} color="#9ca3af" />
      )
    );
  };


  if (loading) return <h2 className="loading-text">Loading Product...</h2>;
  if (!product) return <h2 className="error-text">Product Not Found!</h2>;

  return (
    <>
      <div className="product-details-page">
        <div className="pd-container">

          {/* IMAGE SECTION */}
          <div className="pd-image-section">
            <div className="main-image">
              {mainImage ? (
                <img src={`${BASE_URL}/${mainImage}`} alt={product.name} />
              ) : (
                <img src="/no-image.png" alt="No Image" />
              )}
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
            <p className="Rating">
              {/* Rating:  */}
              {product.rating && Number(product.rating) > 0 ? Number(product.rating).toFixed(1) : "No Rating"}
            </p>
            {/* <div className="pd-rating">
              {renderStars()}
              <span>({reviews.length} reviews)</span>
            </div> */}
            <p className="pd-price">₹{product.price}</p>
            <p className={`pd-stock-status ${product.stock_status === "In Stock" ? "in-stock" :
              product.stock_status === "Low Stock" ? "low-stock" :
                "out-of-stock"
              }`}>
              {product.stock_status}
            </p>
            {/* <p className="pd-discount">Discount rate : {product.discount}</p> */}
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

        {/* REVIEWS */}
        {/* <div className="pd-reviews">
          <h3>Customer Reviews</h3>
          {reviews.map((r, i) => (
            <div key={i} className="review-item">
              <strong>{r.user}:</strong> <span>{r.comment}</span>
            </div>
          ))}
        </div> */}
      </div>
      <ProductList />
      <Offers />
    </>
  );
};

export default ProductDetails;