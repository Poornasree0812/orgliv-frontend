import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://orgliv-backend.onrender.com/api";

export default function ContainerManagementPage() {
  const [orders, setOrders] = useState([]);
  const [containers, setContainers] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [creating, setCreating] = useState(false);
  const token = localStorage.getItem("token");
  const [code, setCode] = useState(`CON-${Date.now()}`);

  const fetchOrders = async () => {
    // fetch orders that are ready/packed (status = 'packed')
    const res = await axios.get(`${API_BASE}/orders?status=packed`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data.orders || []);
  };

  const fetchContainers = async () => {
    const res = await axios.get(`${API_BASE}/container`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setContainers(res.data.containers || []);
  };

  useEffect(() => {
    fetchOrders();
    fetchContainers();
  }, []);

  const toggleSelectOrder = (id) => {
    setSelectedOrders(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const createContainer = async () => {
    if (selectedOrders.length === 0) return alert("Select at least one order");
    try {
      setCreating(true);
      const res = await axios.post(`${API_BASE}/container`, {
        code,
        orderIds: selectedOrders
      }, { headers: { Authorization: `Bearer ${token}` }});
      alert("Container created");
      setSelectedOrders([]);
      fetchContainers();
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to create container");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Container Management</h2>

      <div style={{ marginBottom: 20 }}>
        <h3>Create Container</h3>
        <input value={code} onChange={e => setCode(e.target.value)} style={{ padding: 8, marginRight: 8 }} />
        <button onClick={createContainer} disabled={creating}>Create</button>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Available Packed Orders</h3>
          {orders.length === 0 ? <div>No packed orders</div> : orders.map(o => (
            <div key={o._id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
              <input type="checkbox" checked={selectedOrders.includes(o._id)} onChange={() => toggleSelectOrder(o._id)} />
              <strong> {o._id}</strong> — Customer: {o.customer?.name}
              <div>Items: {o.items.length}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h3>Existing Containers</h3>
          {containers.length === 0 ? <div>No containers</div> : containers.map(c => (
            <div key={c._id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
              <strong>{c.code}</strong> — Status: {c.status}
              <div>Orders: {c.orders.length}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
