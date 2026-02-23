import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.product_id}`)}
    >
      <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.product_name}
      />
      <h4>{product.product_name}</h4>
      <p className="price">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
