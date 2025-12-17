import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { CartContext } from "../context/CartContext";
import "./CustomerProducts.css";

function CustomerProducts() {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  // -------------------------------
  // FETCH PRODUCTS
  // -------------------------------
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products", {
        params: {
          search: filters.search || undefined,
          category: filters.category || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          sort: filters.sort || undefined,
        },
      });

      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Product Fetch Error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="products-page">
      <h1 className="page-title">Explore Organic Products 🌱</h1>

      {/* ---------------- FILTERS ---------------- */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="grains">Grains</option>
          <option value="pulses">Pulses</option>
          <option value="paddy">Paddy</option>
          <option value="oils">Oils</option>
          <option value="flowers">Flowers</option>
          <option value="eco-friendly">Eco Friendly</option>
          <option value="recycling">Recycling</option>
        </select>

        <input
          type="number"
          placeholder="Min ₹"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Max ₹"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
        />

        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
        >
          <option value="">Sort By</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="newest">Newest</option>
        </select>

        <button className="filter-btn" onClick={fetchProducts}>
          Apply
        </button>
      </div>

      {/* ---------------- PRODUCTS ---------------- */}
      {loading ? (
        <p className="status-text">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="status-text">No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p className="price">
                ₹{product.pricePerUnit} / {product.unit || "kg"}
              </p>

              <p className="category">{product.category}</p>

              <button
                className="add-btn"
                onClick={() =>
                  addToCart({
                    ...product,
                    price: product.pricePerUnit, // cart compatibility
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerProducts;
