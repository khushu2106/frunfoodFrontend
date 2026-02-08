import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all users
  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/users/${id}`);
        alert(res.data.message);
        fetchUsers();
      } catch (err) {
        alert("Error deleting user");
      }
    }
  };

  // ✅ SEARCH FILTER 
  const filteredUsers = users.filter(user =>{
    const searchText = search.toLocaleLowerCase();

    return(
      (user.fname || "").toLowerCase().includes(searchText)||
      (user.email || "").toLowerCase().includes(searchText)||
      (user.mobile_no || "").toLowerCase().includes(searchText)
    )
  });

  const handleView = (user) =>{
    alert(`Name{user.fname}\n Email:${user.email}\n Mobile: ${user.mobile_no}`)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>

      {/* 🔍 SEARCH BAR */}
      Search user by their name : <input
        type="text"
        placeholder="Search by user name , email , mobile_no"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "10px", padding: "5px", width: "20vw", height: "5vh" }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile no.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.fname}</td>
                <td>{user.email}</td>
                <td>{user.mobile_no || "NOT REGISTER"}</td>
                <td>
                  <button onClick={() => handleView(user)}>
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(user.user_id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
