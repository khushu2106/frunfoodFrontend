import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";
import toy from "../../../assets/toy.png";
import dog from "../../../assets/dog1.png";
import cat from "../../../assets/cat.png";
import kitten from "../../../assets/kitten.png";
import puppy from "../../../assets/puppy.png";
import Grooming from "../../../assets/grooming.png";

// Category list with ID 0 for "All"
const categories = [
  { id: 0, name: "All", icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png", bg: "#efedff" },
  { id: 1, name: "Dog", icon: dog, bg: "#e7f4dc" },
  { id: 2, name: "Cat", icon: cat, bg: "#fff0cf" },
  { id: 3, name: "Kitten", icon: kitten, bg: "#fff5e1" },
  { id: 4, name: "Puppy", icon: puppy, bg: "#f1f7ff" },
  { id: 5, name: "Toys", icon: toy, bg: "#e7fbff" },
  { id: 6, name: "Grooming & Accessories", icon: Grooming, bg: "#ffe9ec" },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    if (cat.id === 0) {
      navigate("/products"); // All products
    } else {
      navigate(`/category/${cat.id}`); // Specific category
    }
  };

  return (
    <>
      <h2 className="category">Shop by category </h2>
      <div className="home-category-wrapper">
        {categories.map((cat) => (
          <div
            className="home-category-item"
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
          >
            <div className="home-category-icon" style={{ backgroundColor: cat.bg }}>
              <img src={cat.icon} alt={cat.name} />
            </div>
            <p className="home-category-name">{cat.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
