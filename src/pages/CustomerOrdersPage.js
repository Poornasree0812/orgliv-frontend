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

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <h3>No orders found</h3>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>

            <p>
              <b>Total Amount:</b> ₹{order.amount}
            </p>

            <p>
              <b>Order Date:</b>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <h4>Items:</h4>
            {order.items.map((item, i) => (
              <p key={i}>
                {item.product?.name} — {item.quantity} × ₹{item.price}
              </p>
            ))}

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${order.status}`}>
                {order.status}
              </span>
            </p>

            <p>
              <b>Payment Method:</b> Cash on Delivery (COD)
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerOrdersPage;
