import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Products() {
  const { category } = useParams(); // cat, dog, etc.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      // category wise products
      fetch(`http://localhost:5000/api/products/category/${category}`)
        .then(res => res.json())
        .then(data => setProducts(data));
    } else {
      // all products
      fetch(`http://localhost:5000/api/products`)
        .then(res => res.json())
        .then(data => setProducts(data));
    }
  }, [category]);

  return (
    <div>
      <h2>
        {category ? category.toUpperCase() : "ALL PRODUCTS"}
      </h2>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
