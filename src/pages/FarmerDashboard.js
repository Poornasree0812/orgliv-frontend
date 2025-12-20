import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FarmerDashboard.css";

const API_URL = "http://localhost:5000/api";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyProducts();
    fetchMyOrders();
    // eslint-disable-next-line
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error("Product fetch error", err);
    }
  };

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/farmer`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Order fetch error", err);
    }
  };

  if (!token) {
    return <h2 style={{ padding: 40 }}>Please login as Farmer</h2>;
  }

  return (
    <div className="farmer-dashboard">
      <h1>Farmer Dashboard 🌾</h1>

      {/* ===== STATS ===== */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>{products.length}</h2>
          <p>Total Products</p>
        </div>

        <div className="stat-card">
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h2>
            ₹
            {orders.reduce(
              (sum, o) =>
                sum +
                o.items.reduce(
                  (s, i) => s + i.price * i.quantity,
                  0
                ),
              0
            )}
          </h2>
          <p>Total Earnings</p>
        </div>
      </div>

      {/* ===== PRODUCTS ===== */}
      <section className="dashboard-section">
        <h2>My Products</h2>

        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <div key={p._id} className="product-card">
                <img
                  src={p.images?.[0]?.url || "/placeholder.png"}
                  alt={p.name}
                />

                <h3>{p.name}</h3>
                <p>₹{p.pricePerUnit} / kg</p>
                <p>Stock: {p.stockQuantity}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== ORDERS ===== */}
      <section className="dashboard-section">
        <h2>Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default FarmerDashboard;
