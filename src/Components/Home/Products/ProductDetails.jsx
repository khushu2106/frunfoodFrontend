// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ProductDetails.css';
// import ProductList from './ProductList';
// import Offers from '../Offers/Offers';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [images, setImages] = useState([]);
//   const [mainImage, setMainImage] = useState("");

//   const BASE_URL = "http://localhost:5000";

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`${BASE_URL}/api/products/${id}`)
//       .then(res => {
//         const data = res.data;
//         setProduct(data);

//         if (data.images && data.images.length > 0) {
//           setImages(data.images);
//           setMainImage(data.images[0]);
//         } else if (data.image_url) {
//           setImages([data.image_url]);
//           setMainImage(data.image_url);
//         } else {
//           setImages([]);
//           setMainImage("");
//         }

//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("API Error:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!product) return;
//     const token = localStorage.getItem("userToken");
//     let user_id = null;

//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         user_id = payload.user_id || payload.id; 
//       } catch (e) {
//         console.error("Token parsing error", e);
//       }
//     }
//     if (!user_id) {
//       alert("Please login to add items to cart!");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/cart/add", {
//         user_id: user_id, 
//         product_id: product.product_id,
//         qty: quantity,
//         price: product.price
//       });

//       if (res.status === 200 || res.status === 201) {
//         navigate("/cart");
//       }
//     } catch (error) {
//       console.error("Add to Cart Error:", error);
//       alert("Failed to add product to cart.");
//     }
//   };

//   if (loading) return <h2>Loading Product...</h2>;
//   if (!product) return <h2>Product Not Found!</h2>;

//   return (
//     <React.Fragment key={id}>
//       <div className="product-details-page">
//         <div className="pd-container">

//           {/* Image Section */}
//           <div className="pd-image-section">
//             <div className="main-image">
//               {mainImage && (
//                 <img
//                   src={`${BASE_URL}/${mainImage}`}
//                   alt={product.name}
//                 />
//               )}
//             </div>

//             <div className="thumbnail-row">
//               {images.map((img, i) => (
//                 <img
//                   key={i}
//                   src={`${BASE_URL}/${img}`}
//                   alt={`thumb-${i}`}
//                   onClick={() => setMainImage(img)}
//                   className={`thumbnail-img ${mainImage === img ? 'active' : ''}`}
//                   style={{
//                     width: '80px',
//                     height: '80px',
//                     marginRight: '10px',
//                     cursor: 'pointer',
//                     border: mainImage === img ? '2px solid orange' : '1px solid #ccc'
//                   }}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Info Section */}
//           <div className="pd-info-section">
//             <h1 className="pd-title">{product.name}</h1>
//             <p className="pd-price">₹{product.price}</p>
//             <p className="pd-description">
//               {product.description || "No description available"}
//             </p>

//             <div className="pd-options">
//               <div className="quantity-control">
//                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
//                 <span>{quantity}</span>
//                 <button onClick={() => setQuantity(quantity + 1)}>+</button>
//               </div>
//               <button
//                 className="add-to-cart-btn"
//                 onClick={handleAddToCart}
//               >
//                 Add to Cart 🛒
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Related Sections */}
//       <ProductList />
//       <Offers />
//     </React.Fragment>
//   );
// };

// export default ProductDetails;
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

  /* ⭐ Dummy rating (backend later) */
  const rating = 4;
  const reviews = [
    { user: "Amit", comment: "Very good quality product!" },
    { user: "Neha", comment: "Worth the price 👍" },
    { user: "Rahul", comment: "My pet loved it 🐶" }
  ];

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${BASE_URL}/api/products/${id}`)
      .then((res) => {
        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
          const imgs = data.map(i => i.image_url).filter(Boolean);
          setImages(imgs);
          setMainImage(imgs[0] || "");
        } else if (data && data.product_id) {
          setProduct(data);
          setImages(data.image_url ? [data.image_url] : []);
          setMainImage(data.image_url || "");
        } else {
          setProduct(null);
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

    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        user_id: 1,                 // JWT later
        product_id: product.product_id,
        qty: quantity,
        price: product.price
      });

      navigate("/cart");
    } catch (error) {
      console.error("Add to Cart Error:", error);
      alert("Failed to add to cart");
    }
  };

  /* ================= SHOP NOW ================= */
  const handleShopNow = async () => {
    if (!product) return;

    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        user_id: 1,
        product_id: product.product_id,
        qty: quantity,
        price: product.price
      });

      navigate("/checkout"); // change if your route is different
    } catch (error) {
      console.error("Shop Now Error:", error);
      alert("Unable to proceed");
    }
  };

  /* ================= WISHLIST (LOCAL STORAGE) ================= */
  const handleAddToWishlist = async () => {
    try {
      await axios.post("http://localhost:5000/api/wishlist/add", {
        user_id,
        product_id: product.product_id
      });
      toast.success("Added to wishlist ❤️");
    } catch (err) {
      toast.error("Already in wishlist");
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

  if (loading) return <h2>Loading Product...</h2>;
  if (!product) return <h2>Product Not Found!</h2>;

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

            <div className="thumbnail-row">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`${BASE_URL}/${img}`}
                  onClick={() => setMainImage(img)}
                  className={`thumbnail-img ${mainImage === img ? "active" : ""
                    }`}
                  alt="thumb"
                />
              ))}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="pd-info-section">
            <h1 className="pd-title">{product.name}</h1>

            {/* RATING */}
            <div className="pd-rating">
              {renderStars()}
              <span>({reviews.length} reviews)</span>
            </div>

            <p className="pd-price">₹{product.price}</p>
            <p className="pd-description">{product.description}</p>

            {/* ACTIONS */}
            <div className="pd-options">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
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
        <div className="pd-reviews">
          <h3>Customer Reviews</h3>
          {reviews.map((r, i) => (
            <p key={i}>
              <strong>{r.user}:</strong> {r.comment}
            </p>
          ))}
        </div>
      </div>

      <ProductList />
      <Offers />
    </>
  );
};

export default ProductDetails;