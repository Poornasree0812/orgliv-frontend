import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "https://orgliv-backend.onrender.com/api";

export default function ContainerDashboardPage() {
  const { id } = useParams(); // container id from route /admin/container/:id
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${API_BASE}/container/${id}/dashboard`, { headers: { Authorization: `Bearer ${token}` }});
      setData(res.data);
    };
    fetch();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const { container, inventory, orders } = data;

  return (
    <div style={{ padding: 20 }}>
      <h2>Container {container.code} - {container.name}</h2>
      <div>Location: {container.lat}, {container.lng} • Radius: {container.radiusKm} km</div>

      <h3 style={{ marginTop: 20 }}>Inventory ({inventory.length})</h3>
      {inventory.map(p => (
        <div key={p._id} style={{ border: "1px solid #eee", padding: 8, marginBottom: 6 }}>
          <strong>{p.title}</strong> — {p.quantity} {p.unit} — Farmer: {p.farmer?.name}
        </div>
      ))}

      <h3 style={{ marginTop: 20 }}>Assigned Orders ({orders.length})</h3>
      {orders.map(o => (
        <div key={o._id} style={{ border: "1px dashed #ddd", padding: 8, marginBottom: 6 }}>
          <div><strong>Order:</strong> {o._id} • Status: {o.status}</div>
          <div>Customer: {o.customer?.name} • {o.customer?.address}</div>
          <div>Items:</div>
          <ul>
            {o.items.map((it, idx) => (
              <li key={idx}>{it.product?.title} × {it.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
