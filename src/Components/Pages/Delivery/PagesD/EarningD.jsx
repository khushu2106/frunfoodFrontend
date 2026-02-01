import React, {useState, useEffect} from "react";
import { getEarnings } from "../../../Services/Api";
import "./EarningD.css";

const EarningsD = () => {
  const [earningsData, setEarningsData] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getEarnings(1).then((res) =>{
      if(res.data.success){
        setEarningsData(res.data);
      }
      setLoading(false);
    }).catch(err => setLoading(false));
  },[]);

  if (loading) return <div>Loading Earnings ... </div>;

  return (
    <div className="earnings-container">
      <h2>My Earnings 💰</h2>

      {/* Top Summary Cards */}
      <div className="earnings-grid">
        <div className="earn-card" id="total">
          <h4>Total Earnings</h4>
          <p>₹{earningsData?.summary?.totalEarnings || 0}</p>
        </div>
        <div className="earn-card today">
          <h4>Today's Earnings</h4>
          <p>₹{earningsData?.summary?.todayEarnings || 0}</p>
        </div>
        <div className="earn-card orders">
          <h4>Completed Orders</h4>
          <p>{earningsData?.summary?.totalDeliveries || 0}</p>
        </div>
      </div>

      {/* Earnings History Table */}
      <div className="history-section">
        <h3>Recent Transactions</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {earningsData?.history?.map((item) => (
              <tr key={item.sales_id}>
                <td>#{item.sales_id}</td>
                <td>{new Date(item.s_date).toLocaleDateString()}</td>
                <td className="amount-text">+ ₹{item.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EarningsD;
