import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Brand.css";

const BrandProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [id]);

    if (loading) return <div className="spinner">Loading products...</div>;

    if (products.length === 0) {
        return (
            <div className="no-products">
                <Link to="/" className="back-link">← Back to Home</Link>
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
                        <img
                            src={`http://localhost:5000/${product.image_url}`}
                            alt={product.name}
                            className="image"
                            onClick={() => navigate(`/product/${product.product_id}`)}
                        />
                        <p>{product.name}</p>
                        <p>₹{product.price}</p>

                        <Link to={`/product/${product.product_id}`}>
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandProducts;
