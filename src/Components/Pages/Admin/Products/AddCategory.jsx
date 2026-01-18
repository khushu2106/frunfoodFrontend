import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCategory.css'; 

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

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
            const res = await axios.post('http://localhost:5000/api/categories', { name: categoryName });
            alert("Category added successfully!");
            setCategoryName(''); 
            fetchCategories(); 
        } catch (err) {
            console.error("Error info:", err.response ? err.response.data : err.message);
            alert("Error: " + (err.response?.data?.message || "Server Error"));
        }
    };

    return (
        <div className="admin-container" style={{ padding: '20px' }}>
            <header className="admin-header" style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2>Category Management</h2>
                <p>Add new categories or view existing ones</p>
            </header>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                
                {/* SECTION 1: ADD NEW CATEGORY */}
                <section className="admin-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Add New Category</h3>
                    <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div className="form-group">
                            <label>Category Name:</label>
                            <input
                                type="text"
                                placeholder="e.g., Dogs, Cats, Birds"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                            Save Category
                        </button>
                    </form>
                </section>

                {/* SECTION 2: EXISTING CATEGORIES LIST */}
                <section className="admin-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Existing Categories</h3>
                    <div className="category-list" style={{ marginTop: '15px', maxHeight: '400px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                                    <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>ID</th>
                                    <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Category Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((cat, index) => (
                                        <tr key={cat.pro_cat_id || index}>
                                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{cat.pro_cat_id}</td>
                                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{cat.category_name}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" style={{ padding: '20px', textAlign: 'center' }}>No categories found.</td>
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