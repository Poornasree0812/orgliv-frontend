import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const API_URL = "https://orgliv-backend.onrender.com/api/products";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Product fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="product-loader">Loading product...</div>;
  }

  if (!product) {
    return <div className="product-error">Product not found</div>;
  }

  return (
    <div className="product-page">
      <div className="product-card">
        {/* IMAGE */}
        <div className="product-image">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div className="product-info">
          <h1>{product.name}</h1>

          <p className="product-category">
            Category: <span>{product.category}</span>
          </p>

          <p className="product-price">₹{product.pricePerUnit} / kg</p>

          <p className="product-description">
            {product.description || "Fresh farm product with assured quality."}
          </p>

          <div className="product-meta">
            <div>
              <strong>Farmer:</strong> {product.farmerName || "Verified Farmer"}
            </div>
            <div>
              <strong>Available:</strong>{" "}
              {product.stock > 0 ? `${product.stock} kg` : "Out of Stock"}
            </div>
          </div>

          <button
            className="add-to-cart-btn"
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
