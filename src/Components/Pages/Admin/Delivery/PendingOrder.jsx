// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PendingOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [deliveryBoys, setDeliveryBoys] = useState([]); // Delivery boys ki list
//   const [selectedBoy, setSelectedBoy] = useState({}); // Kisko assign karna hai
//   const [loading, setLoading] = useState(true);

//   const adminToken = localStorage.getItem("adminToken");

//   useEffect(() => {
//     // Sahi URL use karein jo controller se mapped hai
//     const fetchOrders = axios.get("http://localhost:5000/api/admin/delivery/pending", {
//       headers: { Authorization: `Bearer ${adminToken}` }
//     });

//     const fetchBoys = axios.get("http://localhost:5000/api/admin/delivery/boys", { // URL sahi karein
//       headers: { Authorization: `Bearer ${adminToken}` }
//     });

//     Promise.all([fetchOrders, fetchBoys])
//       .then(([ordersRes, boysRes]) => {
//         // Agar backend se direct rows aa rahi hain (pendingorders function)
//         setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);

//         // Agar boysRes.data ek array hai
//         setDeliveryBoys(Array.isArray(boysRes.data) ? boysRes.data : []);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Fetch error", err);
//         setLoading(false);
//       });
//   }, [adminToken]);

//   const assignDelivery = async (sales_id) => {
//     const delivery_id = selectedBoy[sales_id]; // Us specific row ka selected boy

//     if (!delivery_id) {
//       alert("Please select a delivery boy first!");
//       return;
//     }

//     try {
//       await axios.post(
//         `http://localhost:5000/api/admin/delivery/assign`,
//         {
//           orderId: sales_id,
//           deliveryBoyId: delivery_id
//         },
//         { headers: { Authorization: `Bearer ${adminToken}` } }
//       );

//       alert("Delivery Assigned Successfully! 📦");
//       setOrders(prev => prev.filter(order => order.sales_id !== sales_id));
//     } catch (err) {
//       console.error("Assign error", err);
//       alert("Failed to assign delivery.");
//     }
//   };

//   const handleBoyChange = (sales_id, boy_id) => {
//     setSelectedBoy(prev => ({ ...prev, [sales_id]: boy_id }));
//   };

//   if (loading) return <p>Loading data...</p>;

//   return (
//     <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
//       <h3>Assign Pending Orders</h3>

//       {orders.length === 0 ? (
//         <p>No pending orders</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
//           <thead>
//             <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
//               <th style={{ padding: "10px" }}>Order ID</th>
//               <th>Customer</th>
//               <th>Amount</th>
//               <th>Select Delivery Partner</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.sales_id} style={{ borderBottom: "1px solid #eee" }}>
//                 <td style={{ padding: "10px" }}>#{order.sales_id}</td>
//                 <td>{order.fname}</td>
//                 <td>₹{order.total_amount}</td>
//                 <td>
//                   <select
//                     onChange={(e) => handleBoyChange(order.sales_id, e.target.value)}
//                     style={{ padding: "5px", borderRadius: "4px" }}
//                   >
//                     <option value="">-- Choose Boy --</option>
//                     {deliveryBoys.map(boy => (
//                       <option key={boy.user_id} value={boy.user_id}>
//                         {boy.fname} {boy.lname} (ID: {boy.user_id})
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => assignDelivery(order.sales_id)}
//                     style={{
//                       padding: "6px 12px",
//                       background: "#28a745",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer"
//                     }}
//                   >
//                     Assign
//                   </button>
//                   <button style={{
//                       padding: "6px 12px",
//                       background: "#f1512c",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer"
//                     }}>View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default PendingOrders;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingOrders = () => {

  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedBoy, setSelectedBoy] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();   // 👈 ADD THIS

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {

    const fetchOrders = axios.get(
      "http://localhost:5000/api/admin/delivery/pending",
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    const fetchBoys = axios.get(
      "http://localhost:5000/api/admin/delivery/boys",
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    Promise.all([fetchOrders, fetchBoys])
      .then(([ordersRes, boysRes]) => {

        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setDeliveryBoys(Array.isArray(boysRes.data) ? boysRes.data : []);

        setLoading(false);

      })
      .catch(err => {
        console.error("Fetch error", err);
        setLoading(false);
      });

  }, [adminToken]);


  const assignDelivery = async (sales_id) => {

    const delivery_id = selectedBoy[sales_id];

    if (!delivery_id) {
      alert("Please select a delivery boy first!");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/admin/delivery/assign",
        {
          orderId: sales_id,
          deliveryBoyId: delivery_id
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      alert("Delivery Assigned Successfully! 📦");

      setOrders(prev => prev.filter(order => order.sales_id !== sales_id));

    } catch (err) {

      console.error("Assign error", err);
      alert("Failed to assign delivery.");

    }
  };


  const handleBoyChange = (sales_id, boy_id) => {
    setSelectedBoy(prev => ({ ...prev, [sales_id]: boy_id }));
  };


  // 👇 VIEW BUTTON FUNCTION
  const handleView = (orderId) => {
    navigate(`/admin/Details/${orderId}`);
  };


  if (loading) return <p>Loading data...</p>;


  return (

    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>

      <h3>Assign Pending Orders</h3>

      {orders.length === 0 ? (
        <p>No pending orders</p>
      ) : (

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>

          <thead>
            <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Select Delivery Partner</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.map(order => (

              <tr key={order.sales_id} style={{ borderBottom: "1px solid #eee" }}>

                <td style={{ padding: "10px" }}>#{order.sales_id}</td>

                <td>{order.fname}</td>

                <td>₹{order.total_amount}</td>

                <td>

                  <select
                    onChange={(e) => handleBoyChange(order.sales_id, e.target.value)}
                    style={{ padding: "5px", borderRadius: "4px" }}
                  >

                    <option value="">-- Choose Boy --</option>

                    {deliveryBoys.map(boy => (

                      <option key={boy.user_id} value={boy.user_id}>
                        {boy.fname} {boy.lname}
                      </option>

                    ))}

                  </select>

                </td>

                <td>

                  <button
                    onClick={() => assignDelivery(order.sales_id)}
                  >
                    Assign
                  </button>

                  <button
                    onClick={() => handleView(order.sales_id)}
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

};

export default PendingOrders;