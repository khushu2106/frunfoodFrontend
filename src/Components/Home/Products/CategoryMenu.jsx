import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryMenu = () => {

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data));
  }, []);

  const loadSubCategories = (id) => {
    axios.get(`http://localhost:5000/api/categories/${id}`)
      .then(res => setSubCategories(res.data));
  };

  return (
    <div>

      <h3>Main Categories</h3>

      {categories.map(cat => (
        <div key={cat.category_id}>
          <p onClick={() => loadSubCategories(cat.category_id)}>
            {cat.name}
          </p>
        </div>
      ))}

      <h3>Sub Categories</h3>

      {subCategories.map(sub => (
        <Link
          key={sub.category_id}
          to={`/products/${sub.category_id}`}
        >
          <p>{sub.name}</p>
        </Link>
      ))}

    </div>
  );
};

export default CategoryMenu;
