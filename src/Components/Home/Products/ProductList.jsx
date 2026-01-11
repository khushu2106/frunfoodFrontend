// import React from 'react';
// import './ProductList.css';

// const ProductList = () => {
//   const products = [
//     {
//       id: 1,
//       name: "Premium Dog Food",
//       category: "Food",
//       price: "29.99",
//       image: "https://images.unsplash.com/photo-1585445490387-f47934b73b54?q=80&w=400&auto=format&fit=crop",
//       badge: "Best Seller"
//     },
//     {
//       id: 2,
//       name: "Indestructible Chew Toy",
//       category: "Toys",
//       price: "15.50",
//       image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=400&auto=format&fit=crop",
//       badge: "New"
//     },
//     {
//       id: 3,
//       name: "Luxury Cat Bed",
//       category: "Bedding",
//       price: "45.00",
//       image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=400&auto=format&fit=crop",
//       badge: ""
//     },
//     {
//       id: 4,
//       name: "GPS Pet Tracker",
//       category: "Tech",
//       price: "89.99",
//       image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=400&auto=format&fit=crop",
//       badge: "Popular"
//     },
//     {
//       id: 5,
//       name: "Premium Cat Food",
//       category: "Food",
//       price: "65.00",
//       image: "https://images.unsplash.com/photo-1585445490387-f47934b73b54?q=80&w=400&auto=format&fit=crop",
//       badge: ""
//     }
//   ];

//   return (
//     <section className="product-section">
//       <div className="product-header">
//         <h2 className="section-title">Shop Our <span className="highlight">Favorites</span></h2>
//         <p className="section-subtitle">Handpicked quality products for your loving pets.</p>
//       </div>

//       <div className="product-grid">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <div className="product-image-box">
//               {product.badge && <span className="product-badge">{product.badge}</span>}
//               <img src={product.image} alt={product.name} />
//               <div className="hover-action">
//                 <button className="add-to-cart">Quick Add +</button>
//               </div>
//             </div>
            
//             <div className="product-info">
//               <span className="product-cat">{product.category}</span>
//               <h3 className="product-name">{product.name}</h3>
//               <div className="product-footer">
//                 <span className="product-price">{product.price}</span>
//                 <button className="wishlist-btn">❤️</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="view-all-container">
//         <button className="view-all-btn">View All Products</button>
//       </div>
//     </section>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="product-section">
      <div className="product-header">
        <h2 className="section-title">Shop Our <span className="highlight">Favorites</span></h2>
        <p className="section-subtitle">Handpicked quality products for your loving pets.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-box">
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <img src={product.image} alt={product.name} />
              <div className="hover-action">
                <button className="add-to-cart">Quick Add +</button>
              </div>
            </div>

            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-footer">
                <span className="product-price">{product.price}</span>
                <button className="wishlist-btn">❤️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all-container">
        <button className="view-all-btn">View All Products</button>
      </div>
    </section>
  );
};

export default ProductList;
