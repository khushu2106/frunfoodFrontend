import React, { useEffect, useState } from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./Wishlist.css";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const user_id = localStorage.getItem("user_id");

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const fetchWishlist = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/wishlist/${user_id}`);
//       setWishlist(res.data);
//     } catch (error) {
//       console.error("Wishlist fetch error", error);
//     }
//   };


//   const addToCart = async (item) => {
//     const user_id = localStorage.getItem("user_id");

//     try {
//       const res = await axios.post("http://localhost:5000/api/cart/add", {
//         user_id: user_id,
//         product_id: item.product_id,
//         qty: 1,
//         price: item.price
//       });

//       alert(res.data.message);
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Failed to add product to cart");
//     }
//   };

//   const removeFromWishlist = async (id) => {
//     console.log("Deleting wishlist id:", id);

//     try {
//       await axios.delete(`http://localhost:5000/api/wishlist/${id}`);
//       setWishlist(wishlist.filter(item => item.id !== id));
//       alert("Product removed from wishlist");
//     } catch (error) {
//       console.error("Remove wishlist error:", error.response?.data || error.message);
//       alert("Failed to remove from wishlist");
//     }
//   };


//   return (
//     <div className="wishlist-container">
//       <h2>My Wishlist ❤️</h2>

//       {wishlist.length === 0 ? (
//         <p className="empty">Your wishlist is empty 😔</p>
//       ) : (
//         <div className="wishlist-grid">
//           {wishlist.map((item) => (
//             <div className="wishlist-card" key={item.id}>
//               <img src={`http://localhost:5000/${item.image_url}`} alt={item.name} />
//               <h4>{item.name}</h4>
//               <p className="price">₹{item.price}</p>

//               <div className="actions">
//                 <button className="btn-cart" onClick={() => addToCart(item)}>
//                   Add to Cart
//                 </button>


//                 <button className="btn-remove" onClick={() => removeFromWishlist(item.id)}>
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(res.data);
    } catch (err) {
      console.error("Wishlist fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  /* 🛒 ADD TO CART */
  const addToCart = async (item) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          product_id: item.product_id,
          qty: 1,
          price: item.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Added to cart 🛒");
    } catch {
      alert("Add to cart failed");
    }
  };

  /* ❌ REMOVE FROM WISHLIST */
  const removeFromWishlist = async (wishlist_id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(wishlist.filter(w => w.wishlist_id !== id));
    } catch {
      alert("Remove failed");
    }
  };

  if (loading) return <p>Loading wishlist...</p>;

  return (
    <div className="wishlist-container">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div className="wishlist-card" key={item.wishlist_id}>
              <img
                src={`http://localhost:5000/${item.image_url}`}
                alt={item.name}
                onClick={() => navigate(`/product/${item.product_id}`)}
              />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
              <button onClick={() => removeFromWishlist(item.wishlist_id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;