import React from "react";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="success-container">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for choosing healthy organic food and healthy life.</p>

        <button
          className="btn"
          onClick={() => (window.location.href = "/orders")}
        >
          View My Orders
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => (window.location.href = "/products")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
