import { useEffect, useState } from "react";
import axios from "axios";
import "./Complaints.css"

function Enquiries() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const res = await axios.get("http://localhost:5000/api/contact/admin");
    setList(res.data);
  };

  const markRead = async (id) => {
    await axios.put(`http://localhost:5000/api/contact/admin/${id}`, {
      status: "read"
    });
    fetchEnquiries();
  };

  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/api/contact/admin/${id}`);
    fetchEnquiries();
  };

  return (
    <div>
      <h2>Customer Enquiries</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((e) => (
            <tr key={e.enquiry_id}>
              <td className="truncate-cell" title={e.name}>{e.name}</td>
              <td className="truncate-cell" title={e.email}>{e.email}</td>
              <td className="truncate-cell" title={e.subject}>{e.subject}</td>
              <td className="truncate-cell" title={e.message}>{e.message}</td>
              <td>{e.status}</td>
              <td>
                <button onClick={() => markRead(e.enquiry_id)}>Read</button>
                <button onClick={() => remove(e.enquiry_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Enquiries;