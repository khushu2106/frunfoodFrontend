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
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (user_id) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [user_id]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/wishlist/${user_id}`);
      setWishlist(res.data);
    } catch (error) {
      console.error("Wishlist fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  /* 🛒 ADD TO CART */
  const addToCart = async (item) => {
    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        user_id: user_id,
        product_id: item.product_id, // ⚠️ only if backend sends it
        qty: 1,
        price: item.price
      });

      alert("Product added to cart! 🛒");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add product to cart");
    }
  };

  /* ❌ REMOVE FROM WISHLIST */
  const removeFromWishlist = async (wishlist_id) => {
    try {
      await axios.delete(`${BASE_URL}/api/wishlist/${wishlist_id}`);

      setWishlist(
        wishlist.filter(item => item.wishlist_id !== wishlist_id)
      );

      alert("Product removed from wishlist");
    } catch (error) {
      console.error("Remove wishlist error:", error);
      alert("Failed to remove from wishlist");
    }
  };

  if (loading) return <div className="loader">Loading your favorites...</div>;

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2>My Wishlist ❤️</h2>
        <p>{wishlist.length} Items saved</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <p className="empty">Your wishlist is empty 😔</p>
          <button className="btn-shop" onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <div className="image-container">
                <img 
                  src={`http://localhost:5000/${item.image_url}`} 
                  alt={item.name} 
                  onClick={() => navigate(`/product/${item.product_id}`)}
                />
              </div>
              
              <div className="wishlist-info">
                <h4>{item.name}</h4>
                <p className="price">₹{item.price}</p>

                <div className="actions">
                  <button className="btn-cart" onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                  <button className="btn-remove" onClick={() => removeFromWishlist(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;