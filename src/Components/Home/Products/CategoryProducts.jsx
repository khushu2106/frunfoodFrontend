import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList";
import Offers from "../Offers/Offers";

const CategoryProducts = () => {
    const { id } = useParams(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); 
        console.log("Requesting products for Category ID:", id);
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
            <div style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
                <h2>Category Products (ID: {id})</h2>

                {products.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "50px" }}>
                        <p>NO product found </p>
                        <Link to="/">Back to Home</Link>
                    </div>
                ) : (
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                        gap: "20px" 
                    }}>
                        {products.map((p) => (
                            <div key={p.product_id} style={{ 
                                border: "1px solid #ddd", 
                                padding: "15px", 
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                            }}>
                                <img 
                                    src={p.image || "https://via.placeholder.com/150"} 
                                    alt={p.name} 
                                    style={{ width: "100%", height: "150px", objectFit: "contain" }} 
                                />
                                <h4 style={{ margin: "10px 0" }}>{p.name}</h4>
                                <p style={{ fontSize: "14px", color: "#666" }}>{p.description}</p>
                                <p style={{ fontWeight: "bold", color: "#b12704" }}>₹{p.price}</p>
                                <p>Weight: {p.weight} gm</p>

                                <Link 
                                    to={`/product/${p.product_id}`} 
                                    style={{ 
                                        display: "inline-block", 
                                        marginTop: "10px", 
                                        color: "#007bff", 
                                        textDecoration: "none" 
                                    }}
                                >
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