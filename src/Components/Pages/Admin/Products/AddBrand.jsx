import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddBrand.css";

const AddBrand = () => {
    const [brandName, setBrandName] = useState('');
    const [brands, setBrands] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => { 
        fetchBrands(); 
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/brands');
            setBrands(res.data);
        } catch (err) {
            console.error("Error fetching brands:", err);
            // Optional: Yahan alert tabhi dein agar data load hi na ho raha ho
        }
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();
        
        // Local Check
        const existing = brands.find(
            b => (b.name || "").toLowerCase() === brandName.trim().toLowerCase()
        );

        if (existing) {
            alert("Local Error: Brand already exists in the list!");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/brands', { name: brandName.trim() });
            alert("Brand Added Successfully!");
            setBrandName('');
            fetchBrands();
        } catch (err) {
            // BACKEND ERROR HANDLING
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "Error adding brand";
            alert("Server Error: " + errorMsg);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this brand?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/brands/${id}`);
            alert("Brand Deleted!");
            fetchBrands();
        } catch (err) {
            // Specific backend error message (e.g., Foreign Key constraint)
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "Cannot delete. Brand is used in products.";
            alert("Delete Error: " + errorMsg);
        }
    };

    const handleEdit = (brand) => {
        setEditId(brand.brand_id);
        setEditName(brand.name);
    };

    const handleUpdate = async () => {
        if (!editName.trim()) {
            alert("Brand name cannot be empty");
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/brands/${editId}`, { name: editName.trim() });
            alert("Brand updated successfully!");
            setEditId(null);
            setEditName('');
            fetchBrands();
        } catch (err) {
            // Backend update error (e.g., updated name already exists)
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "Error updating brand";
            alert("Update Error: " + errorMsg);
        }
    };

    const filteredBrands = brands.filter(brd =>
        (brd.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* ADD BRAND SECTION */}
            <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Add New Brand</h3>
                <form onSubmit={handleAddBrand} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Brand Name (e.g., Pedigree)"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                    />
                    <button type="submit" style={{ cursor: 'pointer', padding: '8px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                        Add Brand
                    </button>
                </form>
            </section>

            {/* BRAND LIST SECTION */}
            <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Existing Brands</h3>
                <input 
                    type="text"
                    placeholder='Search brand...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        marginBottom: "10px",
                        padding: "8px",
                        width: "100%",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                />
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table width="100%" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '10px' }}>ID</th>
                                <th style={{ padding: '10px' }}>Brand</th>
                                <th style={{ padding: '10px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBrands.length > 0 ? (
                                filteredBrands.map((brand) => (
                                    <tr key={brand.brand_id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>{brand.brand_id}</td>
                                        <td style={{ padding: '10px' }}>
                                            {editId === brand.brand_id ? (
                                                <input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    autoFocus
                                                    style={{ padding: '4px' }}
                                                />
                                            ) : (
                                                brand.name
                                            )}
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            {editId === brand.brand_id ? (
                                                <>
                                                    <button onClick={handleUpdate} style={{ marginRight: '5px', background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Save</button>
                                                    <button onClick={() => setEditId(null)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEdit(brand)} style={{ marginRight: '5px', background: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Edit</button>
                                                    <button onClick={() => handleDelete(brand.brand_id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No brands found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AddBrand;