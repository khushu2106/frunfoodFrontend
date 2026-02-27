import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCategory.css';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/categories');
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/categories', {
                category_name: categoryName.trim()
            });
            alert("Category added successfully!");
            setCategoryName('');
            fetchCategories();
        } catch (err) {
            if (err.response?.status === 409) {
                alert("Category already exists");
            } else {
                alert("Server error");
            }
        }
    };

    const handleEditClick = (cat) => {
        setEditingId(cat.pro_cat_id);
        setEditingName(cat.category_name);
    };

    const handleUpdateCategory = async () => {
        try {
            await axios.put(`http://localhost:5000/api/categories/${editingId}`, { category_name: editingName });
            alert("Updated!");
            setEditingId(null);
            setEditingName("");
            fetchCategories();
        } catch (err) {
            alert("Update failed");
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            fetchCategories();
        } catch (err) {
            alert("Delete failed");
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-container" style={{ padding: '40px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
            {/* <header style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 style={{ color: '#333', fontSize: '2rem' }}>Category Management</h2>
                <p style={{ color: '#666' }}>Manage your product inventory categories efficiently</p>
            </header> */}

            <div className="admin-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '30px',
                alignItems: 'start'
            }}>

                {/* --- ADD CATEGORY SECTION --- */}
                <section className="admin-card" style={{
                    padding: '25px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    position: 'sticky',
                    top: '20px'
                }}>
                    <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Add New Category</h3>
                    <form onSubmit={handleAddCategory} style={{ marginTop: '20px' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Category Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Electronics, Pet Food"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
                                required
                            />
                        </div>
                        <button type="submit" style={{
                            width: '100%', padding: '12px', backgroundColor: '#28a745', color: '#fff',
                            border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                        }}>
                            Save Category
                        </button>
                    </form>
                </section>

                {/* --- EXISTING CATEGORIES SECTION (WITH SCROLL) --- */}
                <section className="admin-card" style={{
                    padding: '25px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    maxHeight: '600px', // Fixed Height
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Existing Categories</h3>

                    <input
                        type="text"
                        placeholder="🔍 Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%", padding: "10px", margin: "15px 0",
                            borderRadius: "6px", border: "1px solid #ddd", fontSize: '14px'
                        }}
                    />

                    {/* SCROLLABLE TABLE CONTAINER */}
                    <div style={{ overflowY: 'auto', flexGrow: 1, border: '1px solid #eee' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 1 }}>
                                <tr>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>ID</th>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Name</th>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6', textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((cat) => (
                                        <tr key={cat.pro_cat_id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '12px' }}>{cat.pro_cat_id}</td>
                                            <td style={{ padding: '12px' }}>
                                                {editingId === cat.pro_cat_id ? (
                                                    <input
                                                        value={editingName}
                                                        onChange={(e) => setEditingName(e.target.value)}
                                                        style={{ padding: '5px', width: '80%' }}
                                                    />
                                                ) : (
                                                    cat.category_name
                                                )}
                                            </td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                                                    {editingId === cat.pro_cat_id ? (
                                                        <button
                                                            onClick={handleUpdateCategory}
                                                            style={{
                                                                backgroundColor: '#007bff',
                                                                color: 'white',
                                                                border: 'none',
                                                                padding: '5px 10px',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Update
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEditClick(cat)}
                                                            style={{
                                                                backgroundColor: '#0783ff',
                                                                border: 'none',
                                                                padding: '5px 10px',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => handleDeleteCategory(cat.pro_cat_id)}
                                                        style={{
                                                            backgroundColor: "#dc3545",
                                                            color: "white",
                                                            border: "none",
                                                            padding: "5px 10px",
                                                            borderRadius: "4px",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No categories found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AddCategory;