import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerProducts.css";

const API_URL = "https://orgliv-backend.onrender.com/api/products";

const CATEGORIES = [
  "All",
  "Vegetables",
  "Fruits",
  "Grains",
  "Pulses",
  "Leafy Greens",
  "Oil Seeds",
  "Organic Essentials",
];

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  // ⭐ Combined Filter Logic (Category + Search)
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="customer-products">
      <h1>Organic Products</h1>

      {/* ⭐ SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ⭐ CATEGORY FILTER BUTTONS */}
      <div className="category-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ⭐ PRODUCTS GRID */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <h3>No products found</h3>
        ) : (
          filteredProducts.map((p) => (
            <div
              key={p._id}
              className="product-card"
              onClick={() => (window.location.href = `/product/${p._id}`)}
            >
              <img src={p.imageUrl} alt={p.name} className="product-image" />

              <h3>{p.name}</h3>
              <p>
                ₹ {p.pricePerUnit} / {p.unit}
              </p>
              <p className="category-tag">{p.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CustomerProducts;
