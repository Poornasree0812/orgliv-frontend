import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

const API_URL = "http://localhost:5000/api/products";

function ProductDetails({ id }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const productId = window.location.pathname.split("/").pop();
    fetchProduct(productId);
  }, []);

  const fetchProduct = async (productId) => {
    try {
      const res = await axios.get(`${API_URL}/${productId}`);
      setProduct(res.data);
    } catch (err) {
      console.log("Error loading product:", err);
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-details">
      <div className="left">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="right">
        <h1>{product.name}</h1>
        <p className="category">{product.category}</p>

        <h2 className="price">₹ {product.pricePerUnit} / {product.unit}</h2>

        <p className="desc">{product.description}</p>

        <div className="qty-box">
          <label>Quantity:</label>
          <input
            type="number"
            value={qty}
            min="1"
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product, qty)}
        >
          Add to Cart
        </button>

        <hr />

        <h3>Farmer Details</h3>
        <p>Name: {product.farmerId?.name}</p>
        <p>Phone: {product.farmerId?.phone}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
