import React from "react";
import "./Category.css";

const categories = [
  {
    id: 1,
    name: "All",
    icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    bg: "#efedff",
  },
  {
    id: 2,
    name: "Cat",
    icon: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
    bg: "#fff0cf",
  },
  {
    id: 3,
    name: "Dog",
    icon: "https://cdn-icons-png.flaticon.com/512/194/194279.png",
    bg: "#e7f4dc",
  },
  {
    id: 4,
    name: "Kitten",
    icon: "https://cdn-icons-png.flaticon.com/512/616/616432.png",
    bg: "#fff5e1",
  },
  {
    id: 5,
    name: "Puppy",
    icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    bg: "#f1f7ff",
  },
  {
    id: 6,
    name: "Toys",
    icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
    bg: "#e7fbff",
  },
  {
    id: 7,
    name: "Grooming & Accessories",
    icon: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
    bg: "#ffe9ec",
  },
];

const Category = () => {
  return (
    <div className="home-category-wrapper">
      {categories.map((cat) => (
        <div className="home-category-item" key={cat.id}>
          <div
            className="home-category-icon"
            style={{ backgroundColor: cat.bg }}
          >
            <img src={cat.icon} alt={cat.name} />
          </div>

          <p className="home-category-name">{cat.name}</p>

          {/* API call can be triggered here on click
              Example:
              onClick={() => fetchProductsByCategory(cat.name)} */}
        </div>
      ))}
    </div>
  );
};

export default Category;
