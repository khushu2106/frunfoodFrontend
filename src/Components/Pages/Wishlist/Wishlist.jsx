<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";
import "./Wishlist.css";

const BASE_URL = "http://localhost:5000";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data);
    } catch (error) {
      console.error("Wishlist fetch error", error);
      toast.error("There are some error to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  /* ================= ADD TO CART ================= */
  const addToCart = async (item) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          product_id: item.product_id,
          qty: 1,
          price: item.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Added to cart!");
      window.location.reload();
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("There are some error during the process");
    }
  };

  /* ================= REMOVE FROM WISHLIST ================= */
  const removeFromWishlist = async (wishlist_id) => {
    try {
      await axios.delete(`${BASE_URL}/api/wishlist/${wishlist_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ correct field
      setWishlist((prev) =>
        prev.filter((item) => item.wishlist_id !== wishlist_id)
      );

      toast.success("product remove successfully !");
      window.location.reload();
    } catch (error) {
      console.error("Remove wishlist error:", error);
      toast.error("There are some error deleting the product ");
    }
  };

  if (loading) return <div className="loader">Loading Wishlist...</div>;

  return (
    <div className="wishlist-container">
      <Toaster position="top-center" richColors />
      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <p className="empty">Your wishlist is empty 😔</p>
          <button onClick={() => navigate("/")}>Shop Now</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.wishlist_id}>
              <div
                className="img-container"
                onClick={() => navigate(`/product/${item.product_id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    item.image_url
                      ? `${BASE_URL}/${item.image_url}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.name}
                  title="View Details"
                />
              </div>

              <h4
                onClick={() => navigate(`/product/${item.product_id}`)}
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </h4>

              <p className="price">₹{item.price}</p>

              <div className="actions">
                <button
                  className="btn-cart"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>

                <button
                  className="btn-remove"
                  onClick={() =>
                    removeFromWishlist(item.wishlist_id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
