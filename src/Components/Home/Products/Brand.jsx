import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Brand.css";

import Pedigree from "../../../assets/Pedigree.png";
import Whiskas from "../../../assets/Whiskas.png";
import RoyalCanin from "../../../assets/RoyalCanin.png";
import Drools from "../../../assets/Drools.png";
import Purepet from "../../../assets/Purepet.png";
import Felix from "../../../assets/Felix.png";
import Sheba from "../../../assets/Sheba.png";
import Himalaya from "../../../assets/Himalaya.png";
import me_o from "../../../assets/me_o.png";
// import logo from "../../../assets/logo.png";

const brandImages = {
  "Pedigree": Pedigree,
  "Whiskas": Whiskas,
  "Royal Canin": RoyalCanin,
  "Drools": Drools,
  "Purepet": Purepet,
  "Me-O": me_o,
  "Felix": Felix,
  "Sheba": Sheba,
  "Himalaya": Himalaya
};

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
      <h2 className="brand-title" style={{
        background: "#ffffff",
        color: "#c2410c"
      }}>
        Shop by Brand
      </h2>

      <div className="home-brand-wrapper">
        {brands.map((brand) => (
          <div
            key={brand.brand_id}
            className="home-brand-item"
            onClick={() => navigate(`/brands/${brand.brand_id}`)}
          >
            <div className="home-brand-logo">
              <img
                src={brandImages[brand.name] || "/logo.png"}
                alt={brand.name}
              />
            </div>
            <p className="home-brand-name">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
