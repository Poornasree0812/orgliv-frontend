import React, { useEffect, useState } from "react";
import API from "../api";
import "./CustomerOrdersPage.css";

function CustomerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // FETCH CUSTOMER ORDERS
  // -------------------------------
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders/my");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Order fetch error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // -------------------------------
  // FORMAT STATUS (UI ONLY)
  // -------------------------------
  const formatStatus = (status) => {
    if (!status) return "Placed";
    return status.replace(/_/g, " ");
  };

  return (
    <div className="orders-page">
      <h1 className="page-title">My Orders 📦</h1>

      {loading ? (
        <p className="loading-text">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="empty-orders">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              {/* HEADER */}
              <div className="order-header">
                <span className="order-id">
                  Order ID: {order._id}
                </span>
                <span
                  className={`status ${order.status || "placed"}`}
                >
                  {formatStatus(order.status)}
                </span>
              </div>

              {/* META */}
              <div className="order-meta">
                <p>
                  <strong>Total Amount:</strong> ₹{order.amount}
                </p>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* ITEMS */}
              <div className="order-items">
                <h4>Items</h4>
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="order-footer">
                <p>
                  <strong>Payment:</strong>{" "}
                  Cash on Delivery (COD)
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerOrdersPage;
