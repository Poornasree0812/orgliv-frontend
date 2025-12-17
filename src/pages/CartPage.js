import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1 className="page-title">Your Cart 🧺</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🌱</p>
      ) : (
        <div className="cart-layout">
          {/* LEFT – ITEMS */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-card">
                <img
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.name}
                />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="price">
                    ₹{item.pricePerUnit} / {item.unit}
                  </p>

                  <div className="qty-row">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, Number(e.target.value))
                      }
                    />
                  </div>

                  <p className="subtotal">
                    Subtotal: ₹{item.pricePerUnit * item.quantity}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT – SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => (window.location.href = "/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
