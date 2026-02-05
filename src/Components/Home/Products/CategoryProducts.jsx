import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Category.css";
import ProductList from "./ProductList";
import Offers from "../Offers/Offers";

const categoryNames = {
  1: "Dog",
  2: "Cat",
  3: "Kitten",
  4: "Puppy",
  5: "Toys",
  6: "Grooming & Accessories",
};

const CategoryProducts = () => {
  const { id } = useParams(); // category ID from route
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Choose API URL based on category ID
    const url =
      parseInt(id) === 0
        ? "http://localhost:5000/api/products" // All products
        : `http://localhost:5000/api/products/category/${id}`; // Specific category

    axios
      .get(url)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setProducts(data);
      })
      .catch((err) => console.error("Frontend Error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading Products...</h2>;

  return (
    <>
    <div className="category-products-container">
      <h2>
        {parseInt(id) === 0
          ? "All Products"
          : `Category Products: ${categoryNames[id] || "Unknown"}`}
      </h2>

      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>No products found.</p>
          <Link to="/">Back to Home</Link>
        </div>
      ) : (
        <div className="category-products-grid">
          {products.map((p) => (
            <div key={p.product_id} className="product-card">
              <img
                src={
                  p.image
                    ? `http://localhost:5000/${p.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={p.name}
              />
              <h4>{p.name}</h4>
              {p.description && <p>{p.description}</p>}
              <p className="price">₹{p.price}</p>
              {p.weight && <p>Weight: {p.weight} gm</p>}
              <Link to={`/product/${p.product_id}`}>View Details →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
    <ProductList />
    <Offers />
    </>
  );
};

export default CategoryProducts;
