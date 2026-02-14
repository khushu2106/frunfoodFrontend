import React, {useState, useEffect} from "react";
import { getEarnings } from "../../../Services/Api";
import "./EarningD.css";

const EarningsD = () => {
  const [earningsData, setEarningsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEarnings(1).then((res) => {
      if (res.data.success) {
        setEarningsData(res.data.data); 
      }
      setLoading(false);
    }).catch(err => setLoading(false));
  }, []);

  if (loading) return <div className="loader">Loading Earnings...</div>;

  return (
    <div className="page-container">
      <div className="header-flex">
        <h2>My Earnings 💰</h2>
      </div>

      <div className="earnings-grid">
        <div className="earn-card total">
          <h4>Total Earnings</h4>
          <p>₹{earningsData?.totalEarnings || 0}</p>
        </div>
        <div className="earn-card today">
          <h4>Today's Earnings</h4>
          <p>₹{earningsData?.todayEarnings || 0}</p>
        </div>
        <div className="earn-card orders">
          <h4>Deliveries</h4>
          <p>{earningsData?.totalDeliveries || 0}</p>
        </div>
      </div>
      
      <p style={{marginTop: '20px', color: '#666'}}>* Recent completed transactions are listed in your History.</p>
    </div>
  );
}

export default EarningsD;
