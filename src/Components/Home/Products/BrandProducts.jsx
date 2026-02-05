import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Category.css";

const BrandProducts = () => {
  const { id } = useParams(); // brand_id from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 axios.get(`http://localhost:5000/api/products/${id}`)
  .then(res => setProduct(res.data))
  .catch(err => console.log(err));
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/brands/${id}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="spinner">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <Link to="/brands" className="back-link">← Back to Brands</Link>
        <p>No products found for this brand.</p>
      </div>
    );
  }

  return (
    <div className="brand-products-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h2 className="brand-products-title">Products</h2>
      <div className="brand-product-grid">
        {products.map((product) => (
          <div key={product.product_id} className="brand-product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            <p className="product-price">₹{product.price}</p>
            {/* View Details Link */}
            <Link 
              to={`/product/${product.product_id}`} 
              className="view-details-link"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandProducts;
