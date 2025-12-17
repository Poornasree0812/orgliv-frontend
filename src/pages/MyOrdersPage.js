import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrdersPage.css";

const API_URL = "http://localhost:5000/api/orders/my";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Order fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!token) {
    return <h2 style={{ padding: 20 }}>Please login to view your orders.</h2>;
  }

  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading your orders...</h2>;
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${order.status}`}>
                {order.status.replace(/_/g, " ")}
              </span>
            </p>

            <h4>Items</h4>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.product?.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <p className="total">
              <strong>Total Paid:</strong> ₹{order.amount}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrdersPage;
