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
            // Backend se aane wale data ko state mein set karein
            setBrands(res.data);
        } catch (err) {
            console.error("Error fetching brands:", err);
        }
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();
        
        // Duplication check (Local check before API call)
        const existing = brands.find(
            b => (b.name || "").toLowerCase() === brandName.toLowerCase()
        );

        if (existing) {
            alert("Brand already exists!");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/brands', { name: brandName });
            alert("Brand Added!");
            setBrandName('');
            fetchBrands();
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Error adding brand");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this brand?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/brands/${id}`);
            fetchBrands();
        } catch (err) {
            alert("Cannot delete. Brand is used in products.");
        }
    };

    const handleEdit = (brand) => {
        setEditId(brand.brand_id);
        setEditName(brand.name);
    };

    const handleUpdate = async () => {
        // Edit check for duplicates
        const existing = brands.find(b => 
            (b.name || "").toLowerCase() === editName.toLowerCase() && b.brand_id !== editId
        );
        
        if (existing) {
            alert("Brand name already exists!");
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/brands/${editId}`, { name: editName });
            alert("Brand name change successfully")
            setEditId(null);
            setEditName('');
            fetchBrands();
        } catch (err) {
            console.log(err);
            alert("Error updating brand");
        }
    };

    // --- SEARCH LOGIC ---
    // Hum brands array ko filter kar rahe hain search term ke basis parc
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
                    <button type="submit" style={{ cursor: 'pointer', padding: '8px' }}>Add Brand</button>
                </form>
            </section>

            {/* BRAND LIST SECTION */}
            <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8_px' }}>
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
                <table width="100%" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBrands.length > 0 ? (
                            filteredBrands.map((brand) => (
                                <tr key={brand.brand_id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td>{brand.brand_id}</td>
                                    <td>
                                        {editId === brand.brand_id ? (
                                            <input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                autoFocus
                                            />
                                        ) : (
                                            brand.name
                                        )}
                                    </td>
                                    <td>
                                        {editId === brand.brand_id ? (
                                            <>
                                                <button onClick={handleUpdate} style={{ marginRight: '5px' }}>Save</button>
                                                <button onClick={() => setEditId(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(brand)} style={{ marginRight: '5px' }}>Edit</button>
                                                <button onClick={() => handleDelete(brand.brand_id)} style={{ color: 'white' }}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>No brands found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AddBrand;