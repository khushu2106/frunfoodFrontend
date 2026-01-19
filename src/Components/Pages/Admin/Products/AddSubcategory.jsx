import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubcategory = () => {
    const [subName, setSubName] = useState('');
    const [selectedCatId, setSelectedCatId] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

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

    const handleAddSub = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/subcategories', {
                name: subName,
                pro_cat_id: selectedCatId
            });
            alert("Subcategory Added!");
            setSubName('');
            fetchData(); 
        } catch (err) { alert("Error adding subcategory"); }
    };

    return (
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
            <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Add New Subcategory</h3>
                <form onSubmit={handleAddSub} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <select value={selectedCatId} onChange={(e) => setSelectedCatId(e.target.value)} required style={{ padding: '10px' }}>
                        <option value="">Select Main Category</option>
                        {categories.map(cat => <option key={cat.pro_cat_id} value={cat.pro_cat_id}>{cat.category_name}</option>)}
                    </select>
                    <input type="text" placeholder="Subcategory Name" value={subName} onChange={(e) => setSubName(e.target.value)} required style={{ padding: '10px' }} />
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}>Save</button>
                </form>
            </section>

            <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Existing Subcategories</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f4f4f4' }}>
                            <th style={{ padding: '10px' }}>Name</th>
                            <th style={{ padding: '10px' }}>Main Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategories.map(sub => (
                            <tr key={sub.sub_cat_id}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{sub.name}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{sub.category_name || sub.pro_cat_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AddSubcategory;