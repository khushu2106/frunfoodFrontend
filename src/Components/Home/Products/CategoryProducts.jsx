import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList";
import Offers from "../Offers/Offers";
import './Category.css';

const CategoryProducts = () => {
    const { id } = useParams(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); 
        axios.get(`http://localhost:5000/api/products/subcategory/${id}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Frontend Error:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <h2 style={{ textAlign: "center" }}>Loading Products...</h2>;

    return (
        <>
            <div className="category-products-container">
                <h2>Category Products (ID: {id})</h2>

                {products.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "50px" }}>
                        <p>NO product found </p>
                        <Link to="/">Back to Home</Link>
                    </div>
                ) : (
                    <div className="category-products-grid">
                        {products.map((p) => (
                            <div key={p.product_id} className="product-card">
                                <img 
                                    src={p.image ? `http://localhost:5000/${p.image}` : "https://via.placeholder.com/150"} 
                                    alt={p.name} 
                                />
                                <h4>{p.name}</h4>
                                <p>{p.description}</p>
                                <p className="price">₹{p.price}</p>
                                {p.weight && <p>Weight: {p.weight} gm</p>}

                                <Link to={`/product/${p.product_id}`}>
                                    View Details →
                                </Link>
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
