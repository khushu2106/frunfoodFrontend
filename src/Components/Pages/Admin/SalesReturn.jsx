import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminReturns = () => {
  const [returns, setReturns] = useState([]);
  const token = localStorage.getItem("token");

  const fetchReturns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/returns", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReturns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const approveReturn = async (id) => {
    await axios.put(
      `http://localhost:5000/api/returns/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchReturns();
  };

  const rejectReturn = async (id) => {
    await axios.put(
      `http://localhost:5000/api/returns/${id}/reject`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchReturns();
  };

  return (
    <div>
      <h2>Order Return</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {returns.map((item) => (
            <tr key={item.return_id}>
              <td>{item.return_id}</td>
              <td>{item.sales_id}</td>
              <td>{item.fname}</td>
              <td>{item.reason}</td>
              <td>{item.status}</td>
              <td>{item.request_date}</td>
              <td>
                {item.status === "Pending" && (
                  <>
                    <button onClick={() => approveReturn(item.return_id)}>
                      Approve
                    </button>
                    <button onClick={() => rejectReturn(item.return_id)}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReturns;
