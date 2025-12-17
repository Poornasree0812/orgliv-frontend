import React, { useEffect, useState } from "react";
import API from "../api";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/admin");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Admin Orders Error:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!user || user.role !== "admin") {
    return <h2 style={{ padding: 20 }}>Please login as Admin.</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>All Orders</h1>

      {orders.length === 0 ? (
        <h3>No orders found.</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 20,
            }}
          >
            <h3>Order ID: {order._id}</h3>

            <p>
              <b>Customer:</b> {order.customer?.name} <br />
              <b>Email:</b> {order.customer?.email}
            </p>

            <h4>Items</h4>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.product?.name} × {item.quantity} — ₹
                  {item.price * item.quantity}
                  <br />
                  <small>Farmer ID: {item.farmer}</small>
                </li>
              ))}
            </ul>

            <p>
              <b>Total Amount:</b> ₹{order.amount}
            </p>

            <p>
              <b>Status:</b> {order.status}
            </p>

            <p>
              <b>Date:</b>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrdersPage;
