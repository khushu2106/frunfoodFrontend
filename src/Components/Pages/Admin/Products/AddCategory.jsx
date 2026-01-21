import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCategory.css';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");

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

    const handleUpdateCategory = async () => {
        try {
            await axios.put('http://localhost:5000/api/categories/${editingID}', {
                name: editingName
            });
            alert("Category updated ! ");
            setEditingId(null)
            setEditingName("");
            fetchCategories();
        }
        catch (err) {
            alert("Update failed")
        }
    }

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure ?"))
            return;
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            alert("Category deleted!");
            fetchCategories()
        }
        catch (err) {
            if(err.response?.data?.code === "ER_ROW_IS_REFERENCED_2")
              alert("This category has subcategories. Please delete them first.")
        }
    }

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
                                    <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <tr key={cat.pro_cat_id}>
                                            <td>{cat.pro_cat_id}</td>

                                            <td>
                                                {editingId === cat.pro_cat_id ? (
                                                    <input
                                                        value={editingName}
                                                        onChange={(e) => setEditingName(e.target.value)}
                                                    />
                                                ) : (
                                                    cat.category_name
                                                )}
                                            </td>

                                            <td>
                                                {editingId === cat.pro_cat_id ? (
                                                    <button onClick={handleUpdateCategory}>Update</button>
                                                ) : (
                                                    <button onClick={() => handleEditClick(cat)}>Edit</button>
                                                )}

                                                <button
                                                    onClick={() => handleDeleteCategory(cat.pro_cat_id)}
                                                    style={{ marginLeft: "10px", color: "red" }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No categories found.</td>
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