import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Package, Calendar, User, IndianRupee } from "lucide-react";
import "./DeliveryHistoryD.css"

const DeliveryHistory = ({ deliveryBoyId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(""); // Purana error clear karein

        // Agar deliveryBoyId nahi mil raha toh default 5 use karein
        const id = deliveryBoyId || 5; 
        
        console.log("Fetching history for ID:", id);

        const res = await axios.get(`http://localhost:5000/api/delivery-boy/orders/${id}`);
        
        console.log("API Response:", res.data);

        if (res.data.success && res.data.orders) {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
          setError("No delivered orders found.");
        }
      } catch (err) {
        console.error("Axios Error:", err);
        setError("Server se data nahi mil raha. Check API connection.");
      } finally {
        setLoading(false); // Loading har haal mein stop hoga
      }
    };

    fetchHistory();
  }, [deliveryBoyId]); // Dependency array mein id rakhi hai

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading History...</p>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg inline-block border border-red-100">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-6 border-b pb-4">
        <CheckCircle className="text-green-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Delivered Orders (History)</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Package className="mx-auto text-gray-300 mb-2" size={48} />
          <p className="text-gray-500">There is no delivered orders</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 border-l-green-500"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-gray-700 font-bold">
                  <Package size={18} className="text-orange-500" />
                  Order ID: #{order.sales_id}
                </div>
                <div className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full uppercase" style={{width:"90px"}}>
                  {order.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <User size={20} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Customer</p>
                    <p className="text-gray-800 font-medium">{order.customer_name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IndianRupee size={20} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Total Amount</p>
                    <p className="text-gray-800 font-bold text-lg">₹{order.total_amount}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Delivery Date</p>
                    <p className="text-gray-800 font-medium">
                      {new Date(order.assigned_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryHistory;