import React, { useEffect, useState } from "react";
import API from "../api";
import "./FarmerOrdersPage.css";

function FarmerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders/farmer");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Farmer orders error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="farmer-orders-page">
      <h1 className="page-title">Farmer Orders 🌾</h1>

      {loading ? (
        <p className="loading-text">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="empty-text">No orders assigned to you yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              {/* HEADER */}
              <div className="order-header">
                <span className="order-id">
                  Order ID: {order._id}
                </span>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>

              {/* CUSTOMER */}
              <div className="order-section">
                <h4>Customer</h4>
                <p>{order.customer?.name}</p>
              </div>

              {/* ITEMS */}
              <div className="order-section">
                <h4>Products</h4>
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="order-footer">
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FarmerOrdersPage;
