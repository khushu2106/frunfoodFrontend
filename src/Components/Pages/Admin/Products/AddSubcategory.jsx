import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubcategory = () => {
  const [subName, setSubName] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Naya state error message display karne ke liye
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, subRes] = await Promise.all([
        axios.get('http://localhost:5000/api/categories'),
        axios.get('http://localhost:5000/api/subcategories')
      ]);
      setCategories(catRes.data);
      setSubcategories(subRes.data);
      setError(""); // Data load hote hi purane errors saaf karein
    } catch (err) {
      setError("Failed to fetch data from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Request bhejte waqt error clear karein

    const payload = {
      name: subName,
      pro_cat_id: selectedCatId
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/subcategories/${editId}`, payload);
        alert("Subcategory Updated!");
      } else {
        await axios.post('http://localhost:5000/api/subcategories', payload);
        alert("Subcategory Added!");
      }
      setSubName('');
      setSelectedCatId('');
      setEditId(null);
      fetchData();
    } catch (err) {
      if (err.response) {
        const backendMessage = err.response.data.error || err.response.data.message || "Server Error";
        alert(`Error: ${backendMessage}`); 
      } else if (err.request) {
        alert("Network Error: No response from server. Check if backend is running.");
      } else {
        alert("An unexpected error occurred.");
      }
      console.error("Full Error Object:", err);
    }
  };

  const handleEdit = (sub) => {
    setError(""); // Edit mode mein purana error hata dein
    setEditId(sub.sub_cat_id);
    setSubName(sub.name || sub.subcategory_name);
    setSelectedCatId(sub.pro_cat_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/subcategories/${id}`);
      fetchData();
    } catch (err) {
      const msg = err.response?.data?.error || "Delete failed";
      setError(msg);
    }
  };

  const filteredSubcategories = subcategories.filter(sub => {
    const name = sub.name || sub.subcategory_name || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '25px', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* ADD/EDIT SECTION */}
      <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', height: 'fit-content' }}>
        <h3 style={{ marginBottom: '20px' }}>{editId ? "✏️ Edit Subcategory" : "➕ Add New Subcategory"}</h3>
        
        {/* ERROR BOX: Sirf tab dikhega jab error state mein kuch hoga */}
        {error && (
          <div style={{ 
            backgroundColor: '#ffeeee', 
            color: '#d9534f', 
            padding: '12px', 
            borderRadius: '5px', 
            borderLeft: '5px solid #d9534f',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ fontSize: '13px', color: '#666' }}>Category</label>
            <select 
              value={selectedCatId} 
              onChange={(e) => setSelectedCatId(e.target.value)} 
              required
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            >
              <option value="">-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat.pro_cat_id} value={cat.pro_cat_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#666' }}>Subcategory Name</label>
            <input
              type="text"
              placeholder="Enter name..."
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 2, background: '#28a745', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
              {editId ? "Update Now" : "Save Subcategory"}
            </button>
            {editId && (
              <button 
                type="button" 
                onClick={() => { setEditId(null); setSubName(''); setSelectedCatId(''); setError(''); }}
                style={{ flex: 1, background: '#ccc', border: 'none', borderRadius: '4px' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* LIST SECTION */}
      <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', maxHeight: '600px', overflowY: 'auto' }}>
        <h3>Existing Subcategories</h3>
        <input 
          type="text" 
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom:"15px", padding:"10px", width:"100%", borderRadius:"4px", border: "1px solid #ccc" }}
        />
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f4f4f4' }}>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Main Category</th>
              <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
                <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>Loading data...</td></tr>
            ) : filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((sub) => (
                <tr key={sub.sub_cat_id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{sub.name || sub.subcategory_name}</td>
                  <td style={{ padding: '10px' }}>{sub.category_name}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button onClick={() => handleEdit(sub)} style={{ marginRight: '5px', padding: '5px 10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(sub.sub_cat_id)} style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '20px', fontWeight: 'bold' }}>No Subcategories Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AddSubcategory;