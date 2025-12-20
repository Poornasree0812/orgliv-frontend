import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrdersPage.css";

function AdminOrdersPage() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ------------------------
  // FETCH ORDERS
  // ------------------------
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/orders", authHeader);
      setOrders(res.data || []);
    } catch (err) {
      console.error("Admin Orders Error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ------------------------
  // UPDATE STATUS
  // ------------------------
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `/api/admin/orders/update-status/${orderId}`,
        { status },
        authHeader
      );
      fetchOrders();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="admin-orders-page dashboard-dark">
      <main className="admin-main">
        <h1>Orders Management</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                {/* HEADER */}
                <div className="order-top">
                  <span className="order-id">#{order._id}</span>
                  <span className={`status-pill ${order.status}`}>
                    {order.status}
                  </span>
                </div>

                {/* META */}
                <div className="order-meta">
                  <p>
                    <b>Total:</b> ₹{order.amount}
                  </p>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* ITEMS */}
                <div className="order-items">
                  <h4>Items</h4>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.product?.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ACTIONS */}
                <div className="status-buttons">
                  <button onClick={() => updateStatus(order._id, "pending")}>
                    Pending
                  </button>
                  <button onClick={() => updateStatus(order._id, "packed")}>
                    Packed
                  </button>
                  <button
                    onClick={() =>
                      updateStatus(order._id, "out_for_delivery")
                    }
                  >
                    Out
                  </button>
                  <button
                    className="btn"
                    onClick={() => updateStatus(order._id, "delivered")}
                  >
                    Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminOrdersPage;
