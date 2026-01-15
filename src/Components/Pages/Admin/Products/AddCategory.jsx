import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './AddCategory.css';

const AddCategory = () => {
    // States
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

    const [subName, setSubName] = useState('');
    const [selectedCatId, setSelectedCatId] = useState('');
    const [subcategories, setSubcategories] = useState([]);

    const [breedName, setBreedName] = useState('');
    const [selectedSubCatId, setSelectedSubCatId] = useState('');

    // 1. Fetch Categories & Subcategories on Load
    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/categories');
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };

    const fetchSubcategories = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/subcategories');
            setSubcategories(res.data);
        } catch (err) {
            console.error("Error fetching subcategories", err);
        }
    };

    // 2. Handle Add Category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/categories', { name: categoryName });
            console.log("Success:", res.data);
            alert("Category added!");
            setCategoryName('');
            fetchCategories();
        } catch (err) {
            console.error("Full Error Info:", err.response ? err.response.data : err.message);
            alert("Error: " + (err.response ? err.response.data.message : "Server not reachable"));
        }
    };
    // 3. Handle Add Subcategory
    const handleAddSubcategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/subcategories', {
                name: subName,
                category_id: selectedCatId
            });
            alert("Subcategory added!");
            setSubName('');
            fetchSubcategories();
        } catch (err) {
            alert("Error adding subcategory");
        }
    };

    // 4. Handle Add Breed 
    const handleAddBreed = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/breeds', {
                name: breedName,
                subcategory_id: selectedSubCatId
            });
            alert("Breed added!");
            setBreedName('');
        } catch (err) {
            alert("Error adding breed");
        }
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h2>Admin Setup</h2>
                <p>Manage your Pet Shop Database</p>
            </header>

            <div className="admin-grid">
                {/* FORM 1: CATEGORY */}
                <section className="admin-card">
                    <h3>1. Add Category</h3>
                    <form onSubmit={handleAddCategory}>
                        <input
                            type="text"
                            placeholder="e.g., Dog, Cat"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-primary">Add Category</button>
                    </form>
                </section>

                {/* FORM 2: SUBCATEGORY */}
                <section className="admin-card">
                    <h3>2. Add Subcategory</h3>
                    <form onSubmit={handleAddSubcategory}>
                        <select
                            value={selectedCatId}
                            onChange={(e) => setSelectedCatId(e.target.value)}
                            required
                        >
                            <option value="">Select Main Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="e.g., Food, Accessories"
                            value={subName}
                            onChange={(e) => setSubName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-secondary">Add Subcategory</button>
                    </form>
                </section>

                {/* FORM 3: BREED */}
                <section className="admin-card">
                    <h3>3. Add Breed</h3>
                    <form onSubmit={handleAddBreed}>
                        <select
                            value={selectedSubCatId}
                            onChange={(e) => setSelectedSubCatId(e.target.value)}
                            required
                        >
                            <option value="">Select Subcategory</option>
                            {subcategories.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="e.g., German Shepherd"
                            value={breedName}
                            onChange={(e) => setBreedName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-accent">Add Breed</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddCategory;