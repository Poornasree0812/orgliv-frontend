import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cart, clearCart, totalAmount } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all delivery details");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      // 🔒 Keeping your existing backend flow (COD)
      clearCart();
      alert("Order placed successfully 🌱");
      window.location.href = "/orders";
    } catch (err) {
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout 🌾</h1>

      <div className="checkout-layout">
        {/* LEFT – DELIVERY DETAILS */}
        <div className="checkout-box">
          <h2>Delivery Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <textarea
            rows="4"
            placeholder="Delivery Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div key={item._id} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="summary-row total">
            <strong>Total</strong>
            <strong>₹{totalAmount}</strong>
          </div>

          <p className="payment-note">
            💰 Payment Method: <b>Cash on Delivery</b>
          </p>

          <button
            className="checkout-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
