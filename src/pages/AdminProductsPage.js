import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProductsPage.css";

function AdminProductsPage() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | pending | approved

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ------------------------
  // FETCH PRODUCTS
  // ------------------------
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/products/all", authHeader);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Admin Products Error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ------------------------
  // ACTIONS
  // ------------------------
  const approveProduct = async (id) => {
    if (!window.confirm("Approve this product?")) return;
    await axios.put(`/api/admin/products/approve/${id}`, {}, authHeader);
    fetchProducts();
  };

  const rejectProduct = async (id) => {
    const reason = prompt("Rejection reason:");
    if (!reason) return;
    await axios.put(
      `/api/admin/products/reject/${id}`,
      { reason },
      authHeader
    );
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product permanently?")) return;
    await axios.delete(`/api/admin/products/${id}`, authHeader);
    fetchProducts();
  };

  // ------------------------
  // FILTER
  // ------------------------
  const filteredProducts = products.filter((p) => {
    if (filter === "pending") return p.status === "pending";
    if (filter === "approved") return p.status === "approved";
    return true;
  });

  return (
    <div className="admin-products-page dashboard-dark">
      <main className="admin-main">
        <h1>Products Management</h1>

        {/* FILTER BAR */}
        <div className="products-filter">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
          <button onClick={() => setFilter("approved")}>Approved</button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <div key={p._id} className="product-card">
                {/* IMAGE */}
                <img
                  src={p.imageUrl || "/placeholder.png"}
                  alt={p.name}
                  className="product-thumb"
                />

                {/* INFO */}
                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="category">{p.category}</p>
                  <p className="price">
                    ₹{p.pricePerUnit} / {p.unit}
                  </p>

                  <p className={`status-pill ${p.status}`}>
                    {p.status}
                  </p>

                  <p className="farmer">
                    Farmer: {p.farmerId?.name || "N/A"}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="product-actions">
                  {p.status === "pending" && (
                    <>
                      <button onClick={() => approveProduct(p._id)}>
                        Approve
                      </button>
                      <button
                        className="btn danger"
                        onClick={() => rejectProduct(p._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    className="btn danger"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
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

export default AdminProductsPage;
