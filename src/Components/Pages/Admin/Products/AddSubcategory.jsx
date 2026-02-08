import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubcategory = () => {
  const [subName, setSubName] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [catRes, subRes] = await Promise.all([
      axios.get('http://localhost:5000/api/categories'),
      axios.get('http://localhost:5000/api/subcategories')
    ]);
    setCategories(catRes.data);
    setSubcategories(subRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/subcategories/${editId}`, {
          name: subName,
          category_id: selectedCatId
        });
        alert("Subcategory Updated!");
      } else {
        await axios.post('http://localhost:5000/api/subcategories', {
          name: subName,
          pro_cat_id: selectedCatId
        });
        alert("Subcategory Added!");
      }
      setSubName('');
      setSelectedCatId('');
      setEditId(null);
      fetchData();
    } catch (err) {
      alert("Error saving subcategory");
    }
  };

  const handleEdit = (sub) => {
    setEditId(sub.sub_cat_id);
    setSubName(sub.subcategory_name);
    setSelectedCatId(sub.pro_cat_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/subcategories/${id}`);
      alert("Subcategory Deleted!");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const filteredSubcategories = subcategories.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
      <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>{editId ? "Edit Subcategory" : "Add New Subcategory"}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <select value={selectedCatId} onChange={(e) => setSelectedCatId(e.target.value)} required>
            <option value="">Select Main Category</option>
            {categories.map(cat => (
              <option key={cat.pro_cat_id} value={cat.pro_cat_id}>
                {cat.category_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Subcategory Name"
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
            required
          />

          <button type="submit" style={{ background: '#28a745', color: '#fff', padding: '8px', border: 'none' }}>
            {editId ? "Update" : "Save"}
          </button>
        </form>
      </section>

      <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', 
        overflowY: 'auto',flexGrow:1, maxHeight: "550px"
      }}>
        <h3>Existing Subcategories</h3>
        <input type="text" 
         placeholder='Search Subcategory...'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         style={{
          marginBottom:"10px",
          padding:"6px",
          width:"100%",
          boxSizing:"border-box"
         }}
        />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.length > 0 ?(
              filteredSubcategories.map((sub) =>(
                <tr key={sub.sub_cat_id}>
                  <td>{sub.name}</td>
                  <td>{sub.category_name}</td>
                  <td>
                  <button onClick={() => handleEdit(sub)} style={{ marginRight: '5px' }}>Edit</button>
                  <button onClick={() => handleDelete(sub.sub_cat_id)} style={{ color: 'white' }}>Delete</button>
                  </td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan="6" style={{textAlign:'center', color:"black"
                  ,fontWeight:"bold"
                }}>
                  Subcategory not found 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AddSubcategory;
