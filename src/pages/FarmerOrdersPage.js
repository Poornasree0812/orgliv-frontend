import React, { useEffect, useState } from "react";
import API from "../api";

function FarmerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/farmer");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Farmer Orders Error:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Status Update Error:", err);
      alert("Failed to update status");
    }
  };

  if (!user || user.role !== "farmer") {
    return <h2 style={{ padding: 20 }}>Please login as Farmer.</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No orders yet.</h3>
      ) : (
        orders.map((order) => {
          const myItems = order.items.filter(
            (item) => String(item.farmer) === String(user.id)
          );

          return (
            <div
              key={order._id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 20,
                borderRadius: 6,
              }}
            >
              <h3>Order ID: {order._id}</h3>

              <p>
                <b>Customer:</b> {order.customer?.name} <br />
                <b>Email:</b> {order.customer?.email}
              </p>

              <h4>Your Products</h4>
              <ul>
                {myItems.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>
                    {item.product?.name} × {item.quantity} — ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <p>
                <b>Total Earned:</b> ₹
                {myItems.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}
              </p>

              <p>
                <b>Status:</b> {order.status}
              </p>

              <div style={{ marginTop: 10 }}>
                <button onClick={() => updateStatus(order._id, "accepted")}>
                  Accept
                </button>{" "}
                <button onClick={() => updateStatus(order._id, "packed")}>
                  Packed
                </button>{" "}
                <button
                  onClick={() =>
                    updateStatus(order._id, "out_for_delivery")
                  }
                >
                  Out for Delivery
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default FarmerOrdersPage;
