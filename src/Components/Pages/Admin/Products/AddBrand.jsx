import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddBrand.css";

const AddBrand = () => {
    const [brandName, setBrandName] = useState('');
    const [brands, setBrands] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');

    useEffect(() => { fetchBrands(); }, []);

    const fetchBrands = async () => {
        const res = await axios.get('http://localhost:5000/api/brands');
        setBrands(res.data);
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/brands', {brand_name: brandName});
            alert("Brand Added!");
            setBrandName('');
            fetchBrands();
        } catch (err) {
            console.log(err);
            alert("Error adding brand");

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
        setEditName(brand.brand_name);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/brands/${editId}`, { name: editName });
            setEditId(null);
            setEditName('');
            fetchBrands();
        } catch (err) {
            console.log(err)
            alert("Error updating brand");
        }
    };

    return (
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* ADD BRAND */}
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
                    <button type="submit">Add Brand</button>
                </form>
            </section>

            {/* BRAND LIST */}
            <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Existing Brands</h3>
                <table width="100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand) => (
                            <tr key={brand.brand_id}>
                                <td>{brand.brand_id}</td>
                                <td>
                                    {editId === brand.brand_id ? (
                                        <input
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                        />
                                    ) : (
                                        brand.name
                                    )}
                                </td>
                                <td>
                                    {editId === brand.brand_id ? (
                                        <>
                                            <button onClick={handleUpdate}>Save</button>
                                            <button onClick={() => setEditId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(brand)}>Edit</button>
                                            <button onClick={() => handleDelete(brand.brand_id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </div>
    );
};

export default AddBrand;
