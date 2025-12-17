import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.log("Admin Products Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const approveProduct = async (id) => {
    try {
      await axios.put(
        `${API_URL}/products/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Remove from list after approval
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log("Approval Error:", err);
      alert("Failed to approve.");
    }
  };

  const rejectProduct = async (id) => {
    const reason = prompt("Enter rejection reason:");

    try {
      await axios.put(
        `${API_URL}/products/${id}/reject`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log("Reject Error:", err);
      alert("Failed to reject.");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!token) return <h2>Please login as admin.</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pending Products for Approval</h1>

      {products.length === 0 ? (
        <h3>No pending products.</h3>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h2>{product.title}</h2>
            <p>
              Farmer: <strong>{product.farmer?.name}</strong>  
              <br />
              Email: {product.farmer?.email}
            </p>

            <img
              src={product.images?.[0]?.url || "/placeholder.png"}
              alt=""
              style={{ width: "200px", borderRadius: "8px" }}
            />

            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>

            <button
              onClick={() => approveProduct(product._id)}
              style={{
                background: "green",
                color: "white",
                padding: "8px 12px",
                marginRight: "10px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Approve
            </button>

            <button
              onClick={() => rejectProduct(product._id)}
              style={{
                background: "red",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminProductsPage;
