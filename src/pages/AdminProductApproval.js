import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/admin/products";

export default function AdminProductApproval() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${API}/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approve = async (id) => {
    await axios.put(
      `${API}/approve/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchPending();
  };

  const reject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    await axios.put(
      `${API}/reject/${id}`,
      { reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchPending();
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Pending Product Approvals</h2>

      {products.length === 0 ? (
        <p>No pending products.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: 20,
              padding: 15,
              borderRadius: 8
            }}
          >
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.pricePerUnit} / {product.unit}</p>
            <p>Stock: {product.stockQuantity}</p>
            <p>Farmer: {product.farmerId?.name}</p>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => approve(product._id)}
                style={{ marginRight: 10 }}
              >
                Approve
              </button>

              <button
                onClick={() => reject(product._id)}
                style={{ background: "red", color: "white" }}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
