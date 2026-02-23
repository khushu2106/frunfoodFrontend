import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Complaint.css";

const Complaint = () => {
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
     customer complaint
    </div>
  );
};

export default Complaint;