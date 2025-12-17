import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [view, setView] = useState("pending"); // pending | products | orders | farmers
  const [pendingProducts, setPendingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingProducts: 0,
    totalOrders: 0,
  });

  // -----------------------
  // EFFECT
  // -----------------------
  useEffect(() => {
    if (view === "pending") fetchPending();
    if (view === "products") fetchAllProducts();
    if (view === "orders") fetchOrders();
    if (view === "farmers") fetchFarmers();
    // eslint-disable-next-line
  }, [view]);

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  // -----------------------
  // API HELPERS
  // -----------------------
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // -----------------------
  // PENDING PRODUCTS
  // -----------------------
  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "/api/admin/products/pending",
        authHeader
      );
      setPendingProducts(res.data || []);
    } catch (err) {
      console.error(err);
      setPendingProducts([]);
    }
    setLoading(false);
  };

  const approveProduct = async (id) => {
    if (!window.confirm("Approve this product?")) return;
    try {
      await axios.put(
        `/api/admin/products/approve/${id}`,
        {},
        authHeader
      );
      fetchPending();
      fetchStats();
    } catch (err) {
      alert("Approve failed");
    }
  };

  const rejectProduct = async (id) => {
    const reason = prompt("Rejection reason:");
    if (!reason) return;
    try {
      await axios.put(
        `/api/admin/products/reject/${id}`,
        { reason },
        authHeader
      );
      fetchPending();
      fetchStats();
    } catch (err) {
      alert("Reject failed");
    }
  };

  // -----------------------
  // ALL PRODUCTS
  // -----------------------
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "/api/admin/products/all",
        authHeader
      );
      setAllProducts(res.data || []);
    } catch (err) {
      setAllProducts([]);
    }
    setLoading(false);
  };

  const adminDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      await axios.delete(
        `/api/admin/products/${id}`,
        authHeader
      );
      fetchAllProducts();
      fetchStats();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // -----------------------
  // ORDERS
  // -----------------------
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "/api/admin/orders",
        authHeader
      );
      setOrders(res.data || []);
    } catch (err) {
      setOrders([]);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `/api/admin/orders/update-status/${orderId}`,
        { status },
        authHeader
      );
      fetchOrders();
    } catch (err) {
      alert("Status update failed");
    }
  };

  // -----------------------
  // FARMERS
  // -----------------------
  const fetchFarmers = async () => {
    try {
      const res = await axios.get(
        "/api/admin/farmers",
        authHeader
      );
      setFarmers(res.data || []);
    } catch (err) {
      setFarmers([]);
    }
  };

  const approveFarmer = async (id) => {
    await axios.put(
      `/api/admin/farmers/approve/${id}`,
      {},
      authHeader
    );
    fetchFarmers();
  };

  const rejectFarmer = async (id) => {
    await axios.put(
      `/api/admin/farmers/reject/${id}`,
      {},
      authHeader
    );
    fetchFarmers();
  };

  // -----------------------
  // STATS
  // -----------------------
  const fetchStats = async () => {
    try {
      const pending = await axios.get("/api/admin/products/pending", authHeader);
      const products = await axios.get("/api/admin/products/all", authHeader);
      const ordersRes = await axios.get("/api/admin/orders", authHeader);

      setStats({
        totalProducts: products.data.length,
        pendingProducts: pending.data.length,
        totalOrders: ordersRes.data.length,
      });
    } catch {}
  };

  // -----------------------
  // STATUS STYLE
  // -----------------------
  const statusClass = (s) => {
    if (s === "pending") return "status-pill placed";
    if (s === "packed") return "status-pill packed";
    if (s === "out_for_delivery") return "status-pill out";
    if (s === "delivered") return "status-pill delivered";
    return "status-pill";
  };

  // -----------------------
  // JSX
  // -----------------------
  return (
    <div className="admin-page dashboard-dark">
      <aside className="admin-sidebar">
        <div className="admin-brand">OrgLiv — Admin</div>

        <div className="admin-nav">
          <button onClick={() => setView("pending")}>
            Pending Products ({stats.pendingProducts})
          </button>
          <button onClick={() => setView("products")}>
            All Products ({stats.totalProducts})
          </button>
          <button onClick={() => setView("orders")}>
            Orders ({stats.totalOrders})
          </button>
          <button onClick={() => setView("farmers")}>
            Farmers
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/admin/login";
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {/* ---------------- PENDING PRODUCTS ---------------- */}
        {view === "pending" && (
          <>
            <h2>Pending Products</h2>
            {pendingProducts.map((p) => (
              <div key={p._id} className="card">
                <h3>{p.name}</h3>
                <p>{p.category}</p>
                <p>₹{p.pricePerUnit} / {p.unit}</p>
                <p>Farmer: {p.farmerId?.name}</p>
                <button onClick={() => approveProduct(p._id)}>Approve</button>
                <button onClick={() => rejectProduct(p._id)}>Reject</button>
              </div>
            ))}
          </>
        )}

        {/* ---------------- ALL PRODUCTS ---------------- */}
        {view === "products" && (
          <>
            <h2>All Products</h2>
            {allProducts.map((p) => (
              <div key={p._id} className="card">
                <b>{p.name}</b> — {p.isApproved ? "Approved" : "Pending"}
                <button onClick={() => adminDeleteProduct(p._id)}>Delete</button>
              </div>
            ))}
          </>
        )}

        {/* ---------------- ORDERS ---------------- */}
        {view === "orders" && (
          <>
            <h2>Orders</h2>
            {orders.map((o) => (
              <div key={o._id} className="card">
                <div><b>Order:</b> {o._id}</div>
                <div><b>Total:</b> ₹{o.amount}</div>
                <div><b>Status:</b> <span className={statusClass(o.status)}>{o.status}</span></div>

                <ul>
                  {o.items.map((it, i) => (
                    <li key={i}>
                      {it.product?.name} × {it.quantity}
                    </li>
                  ))}
                </ul>

                <button onClick={() => updateOrderStatus(o._id, "pending")}>Pending</button>
                <button onClick={() => updateOrderStatus(o._id, "packed")}>Packed</button>
                <button onClick={() => updateOrderStatus(o._id, "out_for_delivery")}>Out</button>
                <button onClick={() => updateOrderStatus(o._id, "delivered")}>Delivered</button>
              </div>
            ))}
          </>
        )}

        {/* ---------------- FARMERS ---------------- */}
        {view === "farmers" && (
          <>
            <h2>Farmers</h2>
            {farmers.map((f) => (
              <div key={f._id} className="card">
                {f.name} — {f.isVerified ? "Verified" : "Not Verified"}
                {!f.isVerified ? (
                  <button onClick={() => approveFarmer(f._id)}>Approve</button>
                ) : (
                  <button onClick={() => rejectFarmer(f._id)}>Reject</button>
                )}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
