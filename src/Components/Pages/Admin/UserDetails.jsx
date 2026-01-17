import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { user_id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${user_id}`)
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, [user_id]);

  if (!userData) return <h2>Loading...</h2>;

  const { profile, orders } = userData;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>User Profile</h3>
        <p><strong>Name:</strong> {profile.fname}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
      </div>

      {/* Order History Table */}
      <h3>Order History</h3>
      {orders.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Order ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Amount</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>#{order.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{order.total_amount}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', color: order.status === 'Delivered' ? 'green' : 'orange' }}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>This user has not placed any orders yet.</p>
      )}
    </div>
  );
};

export default UserDetails;