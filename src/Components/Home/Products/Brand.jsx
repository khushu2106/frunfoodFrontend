import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Brand.css";
const brands = [
  {
    brand_id: 1,
    name: "Drools",
    image: "https://tailsnaton.com/cdn/shop//Drools.jpg?v=1725857376",
    bg: "#f7f7f7",
  },
  {
    brand_id: 2,
    name: "Whiskas",
    image: "https://i.pinimg.com/736x/83/fd/97/83fd970e4b781411a69827b96d95b488.jpg",
    bg: "#fff0cf",
  },
  {
    brand_id: 3,
    name: "Pedigree",
    image: "https://cdn.prod.website-files.com/659a9ef71c962485037fcc8f/66835ea440901efbda1527ea_Screenshot%202024-07-02%20at%209.56.34%20AM.png",
    bg: "#e7f4dc",
  },
  {
    brand_id: 4,
    name: "Royal Canin",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Royal_Canin_logo.png",
    bg: "#fff5e1",
  },
  {
    brand_id: 5,
    name: "Pedigree Treats",
    image: "https://www.pinkpaws.co.in/rest/uploads/products/12704/2e76f4d0-dcb3-412c-a828-005adae0ae3f-.webp",
    bg: "#e7fbff",
  },
  {
    brand_id: 6,
    name: "Whiskas Kitten",
    image: "https://cdn-icons-png.flaticon.com/512/616/616432.png",
    bg: "#ffe9ec",
  },
];
const Brand = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/brands")
      .then(res => setBrands(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-brand-section">
      <h2 className="brand-title">Shop by Brand</h2>

      <div className="home-brand-wrapper">
        {brands.map((brand) => (
          <div
            key={brand.brand_id} // updated from brand.id
            className="home-brand-item"
            onClick={() => navigate(`/brands/${brand.brand_id}`)} // updated from brand.id
          >
            <div className="home-brand-logo">
              {/* <img src={brand.image} alt={brand.name} /> */}
              <img src="../src/assets/whiskas.png" alt="dog image" />
            </div>
            <p className="home-brand-name">{brand.name}</p>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Brand;
