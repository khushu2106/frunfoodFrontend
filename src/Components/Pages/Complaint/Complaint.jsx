import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Complaint.css";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await axios.get("http://localhost:5000/api/complaints");
    setComplaints(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/complaints/${id}`, { status });
    fetchComplaints();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="complaint-container">
      <h2>Customer Complaints</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c.complaint_id}>
              <td>{c.complaint_id}</td>
              <td>{c.fname} {c.lname}</td>
              <td>{c.email}</td>
              <td>{c.subject}</td>
              <td>{c.message}</td>
              <td>
                <span className={`status ${c.status}`}>
                  {c.status}
                </span>
              </td>
              <td>
                {c.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(c.complaint_id, "resolved")
                    }
                  >
                    Mark Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Complaints;