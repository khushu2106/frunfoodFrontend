import React, { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
  const [balance, setBalance] = useState({
    totalPurchase: 0,
    profit: 0,
    companyBalance: 0,
  });

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/balance");
      setBalance({
        totalPurchase: res.data.totalPurchase,
        profit: res.data.profit,
        companyBalance: res.data.profit, // for now
      });
    } catch (error) {
      console.error("Balance fetch error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Balance Summary</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {[
          { title: "Total Purchase", value: balance.totalPurchase },
          { title: "Net Profit", value: balance.profit },
          { title: "Company Balance", value: balance.companyBalance },
        ].map((card, idx) => (
          <div
            key={idx}
            style={{
              flex: "1",
              minWidth: "200px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ fontSize: "16px", marginBottom: "10px", color: "#333" }}>
              {card.title}
            </h4>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#000" }}>
              ₹ {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balance;
