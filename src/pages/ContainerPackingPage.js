import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "https://orgliv-backend.onrender.com/api/packing";

export default function ContainerPackingPage() {
  const { containerId } = useParams();
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    const res = await axios.get(`${API_URL}/${containerId}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data.orders || []);
  };

  const updateStatus = async (orderId, status) => {
    await axios.put(
      `${API_URL}/order/${orderId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Container Packing</h2>

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "20px" }}>
          <h3>Order {order._id}</h3>

          <p>Customer: {order.customer?.name}</p>
          <p>Status: {order.status}</p>

          <h4>Items:</h4>
          <ul>
            {order.items.map((it, idx) => (
              <li key={idx}>
                {it.product?.name} × {it.quantity}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => updateStatus(order._id, "packing")}
              style={{ marginRight: 10 }}>Start Packing</button>

            <button onClick={() => updateStatus(order._id, "packed")}
              style={{ marginRight: 10 }}>Mark Packed</button>

            <button onClick={() => updateStatus(order._id, "ready_for_delivery")}
              style={{ background: "green", color: "white" }}>
              Ready for Delivery
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
