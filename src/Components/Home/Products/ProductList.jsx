import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { ShoppingCart, Heart, Eye } from "lucide-react"; 
import { useLocation } from 'react-router-dom';
import './ProductList.css';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");

  const limit = 8;
  const BASE_URL = "http://localhost:5000";

  useEffect(() =>{
    const fetchProducts = async () =>{
      try{
        if (search) {
          url = `${BASE_URL}/api/search?q=${search}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      }
      catch (error){
        console.error("Error fetching data : ",error);
      }
    };
    fetchProducts();
  },[search]);

  console.log(search)

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setTotalPages(data.totalPages)
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <div className="loading-text">Fetching amazing products...</div>;

  return (
    <section className="product-section">
      <div className="product-header">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          Shop Our <span className="highlight">Favorites</span>
        </motion.h2>
        <p className="section-subtitle">Handpicked quality products for your loving pets.</p>
      </div>

      <div className="product-grid">
        {products.map((product, index) => {
          const imageUrl = product.image
            ? product.image.startsWith("http") ? product.image : `${BASE_URL}/${product.image}`
            : "/no-image.png";

          return (
            <motion.div 
              key={product.product_id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="product-card-container"
            >
              <div className="product-card">
                <div className="product-image-box">
                  <Link to={`/product/${product.product_id}`}>
                    <img src={imageUrl} alt={product.name} className="product-img" />
                  </Link>

                  <div className="hover-action">
                    <button className="action-btn"><Heart size={18} /></button>
                    <button className="add-to-cart-btn">
                      <ShoppingCart size={18} /> Quick Add
                    </button>
                    <Link to={`/product/${product.product_id}`} className="action-btn">
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination UI */}
      <div className="pagination">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i} 
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};


export default ProductList;