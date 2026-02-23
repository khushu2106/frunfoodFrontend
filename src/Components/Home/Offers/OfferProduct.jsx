import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OfferProduct.css";
import axios from "axios";

const OfferProducts = () => {
  const { offerType } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(null);
  const [wishLoading, setWishLoading] = useState(null);

  const BASE_URL = "http://localhost:5000";
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchOfferProducts();
  }, [offerType]);

  const fetchOfferProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/offers/${offerType}/products`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return Number(price).toFixed(2).replace(/\.00$/, "");
  };

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (product) => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      setCartLoading(product.product_id);

      await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          product_id: product.product_id,
          qty: 1,
          price: product.offer_price || product.price
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Added to cart 🛒");

    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    } finally {
      setCartLoading(null);
    }
  };

  /* ================= WISHLIST ================= */
  const handleAddToWishlist = async (product) => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      setWishLoading(product.product_id);

      await axios.post(
        `${BASE_URL}/api/wishlist`,
        { product_id: product.product_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Added to Wishlist ❤️");

    } catch (err) {
      if (err.response?.status === 409) {
        alert("Already in wishlist ❤️");
      } else {
        alert("Failed to add wishlist");
      }
    } finally {
      setWishLoading(null);
    }
  };

  if (loading)
    return <div className="loader">Loading Products...</div>;

  return (
    <div className="offer-products-container">
      <h2 className="offer-title">Special Offer Products</h2>

      {products.length === 0 ? (
        <p className="no-products">No products found for this offer.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => {

            const imageUrl =
              p.image_url
                ? `${BASE_URL}/${p.image_url}`
                : p.image
                  ? `${BASE_URL}/${p.image}`
                  : "/no-image.png";

            const finalPrice = p.offer_price || p.price;

            return (
              <div key={p.product_id} className="product-card">

                <div className="product-img-box">
                  <img
                    src={imageUrl}
                    alt={p.name}
                    onClick={() => navigate(`/product/${p.product_id}`)}
                  />
                </div>

                <h4 className="product-name">{p.name}</h4>

                <p className="price-row">
                  {p.offer_price && (
                    <span className="old-price">₹{formatPrice(p.price)}</span>
                  )}
                  <span className="offer-price">₹{formatPrice(finalPrice)}</span>
                </p>

                {formatPrice(p.discount_value) && (
                  <div className="discount-badge">
                    {p.discount_value} {p.discount_type === "percentage" ? "% OFF" : "₹ OFF"}
                  </div>
                )}

                <div className="btn-row">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="add-cart-btn"
                    disabled={cartLoading === p.product_id}
                  >
                    {cartLoading === p.product_id ? "Adding..." : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => handleAddToWishlist(p)}
                    className="wish-btn"
                    disabled={wishLoading === p.product_id}
                  >
                    {wishLoading === p.product_id ? "..." : "❤️"}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OfferProducts;