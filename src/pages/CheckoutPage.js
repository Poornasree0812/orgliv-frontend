import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api";
import "./CheckoutPage.css";

function CheckoutPage() {
  const {
    cart,
    clearCart,
    totalAmount,
    buildOrderPayload,
  } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // -------------------------------
  // PLACE ORDER (COD)
  // -------------------------------
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

      await API.post("/orders/place", {
        ...buildOrderPayload(),
        address: `${form.name}, ${form.phone}, ${form.address}`,
      });

      alert("Order placed successfully 🌱");
      clearCart();
      window.location.href = "/orders";
    } catch (err) {
      console.error("Order error:", err);
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
            placeholder="Delivery Address"
            rows="4"
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
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <p className="payment-note">
            💰 Payment Method: <b>Cash on Delivery</b>
          </p>

          <button
            className="place-order-btn"
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
