import React, { useState } from 'react';
import './CategoryProduct.css';

const CategoryProduct = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Dogs', 'Cats', 'Birds', 'Fish'];

  const products = [
    { id: 1, name: "Puppy Kibble", cat: "Dogs", price: "$25", img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400" },
    { id: 2, name: "Cat Scratch Post", cat: "Cats", price: "$45", img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400" },
    { id: 3, name: "Bird Swing Toy", cat: "Birds", price: "$12", img: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=400" },
    { id: 4, name: "Goldfish Flakes", cat: "Fish", price: "$10", img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400" },
    { id: 5, name: "Dog Leather Leash", cat: "Dogs", price: "$18", img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400" },
    { id: 6, name: "Catnip Mouse", cat: "Cats", price: "$8", img: "https://images.unsplash.com/photo-1591768793355-74d7af73d72a?w=400" },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.cat === activeCategory);

  return (
    <section className="category-page">
      <div className="cat-header">
        <h2>Browse by <span className="highlight">Category</span></h2>
        <div className="cat-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="cat-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="cat-card">
            <div className="cat-img-box">
              <img src={product.img} alt={product.name} />
              <span className="cat-tag">{product.cat}</span>
            </div>
            <div className="cat-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="add-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProduct;