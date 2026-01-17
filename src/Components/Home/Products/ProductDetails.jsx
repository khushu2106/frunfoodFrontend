import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import ProductList from './ProductList';
import Offers from '../Offers/Offers';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]); 
  const [mainImage, setMainImage] = useState(""); 
  
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("There are some error to load to data", err);
        setLoading(false);
      });
  }, [id]);
  
  // useEffect(() => {
  //   axios.get(`${BASE_URL}/api/products/${id}`)
  //     .then(res => {
  //       setProduct(res.data.product);
  //       setImages(res.data.images);
  //       if (res.data.images.length > 0) {
  //         setMainImage(res.data.images[0].image_path);
  //       }
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error("Error loading data", err);
  //       setLoading(false);
  //     });
  // }, [id]);

  if (loading) return <h2>Loading Product...</h2>;
  if (!product) return <h2>Product Not Found!</h2>;

  return (
    <>
      {/* <Header /> */}
      
      <div className="product-details-page">
        <div className="pd-container">
          {/* Image Section */}
          <div className="pd-image-section">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Info Section */}
          <div className="pd-info-section">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-price">{product.price}</p>
            <p className="pd-description">{product.description || "No description available"}</p>

            <div className="pd-options">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="add-to-cart-btn">Add to Cart 🛒</button>
            </div>
          </div>
        </div>
      </div>

      <ProductList />
      <Offers />
      
      {/* <Footer /> */}
    </>
  );
};

export default ProductDetails;



//       <div className="product-details-page">
//         <div className="pd-container">
          
//           {/* Image Section */}
//           <div className="pd-image-section">
//             <div className="main-image">
//               {/* बड़ी इमेज */}
//               <img src={`${BASE_URL}${mainImage}`} alt={product.name} />
//             </div>
            
//             {/* छोटी इमेजेज (Thumbnails) */}
//             <div className="thumbnail-gallery" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//               {images.map((img, index) => (
//                 <img 
//                   key={index} 
//                   src={`${BASE_URL}${img.image_path}`} 
//                   alt="thumbnail"
//                   onClick={() => setMainImage(img.image_path)} // क्लिक करने पर बड़ी इमेज बदल जाएगी
//                   style={{ 
//                     width: '60px', height: '60px', cursor: 'pointer', 
//                     border: mainImage === img.image_path ? '2px solid green' : '1px solid #ccc' 
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
