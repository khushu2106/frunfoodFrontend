import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddBrand.css"

const AddBrand = () => {
    const [brandName, setBrandName] = useState('');
    const [brands, setBrands] = useState([]);

    useEffect(() => { fetchBrands(); }, []);

    const fetchBrands = async () => {
        const res = await axios.get('http://localhost:5000/api/brands');
        setBrands(res.data);
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/brands', { name: brandName });
            alert("Brand Added!");
            setBrandName('');
            fetchBrands();
        } catch (err) { alert("Error adding brand"); }
    };

    return (
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Add New Brand</h3>
                <form onSubmit={handleAddBrand} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" placeholder="Brand Name (e.g., Pedigree)" value={brandName} onChange={(e) => setBrandName(e.target.value)} required style={{ padding: '10px' }} />
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>Add Brand</button>
                </form>
            </section>

            <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Existing Brands</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {brands.map(brand => (
                        <li key={brand.brand_id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                            {brand.brand_id}. {brand.name}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AddBrand;