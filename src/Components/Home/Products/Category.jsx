import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

// Category list with ID 0 for "All"
const categories = [
  { id: 0, name: "All", icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png", bg: "#efedff" },
  { id: 1, name: "Dog", icon: "https://cdn-icons-png.flaticon.com/512/194/194279.png", bg: "#e7f4dc" },
  { id: 2, name: "Cat", icon: "https://cdn-icons-png.flaticon.com/512/616/616430.png", bg: "#fff0cf" },
  { id: 3, name: "Kitten", icon: "https://cdn-icons-png.flaticon.com/512/616/616432.png", bg: "#fff5e1" },
  { id: 4, name: "Puppy", icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png", bg: "#f1f7ff" },
  { id: 5, name: "Toys", icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", bg: "#e7fbff" },
  { id: 6, name: "Grooming & Accessories", icon: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png", bg: "#ffe9ec" },
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
