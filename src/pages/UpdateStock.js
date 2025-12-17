import React, { useEffect, useState } from "react";
import axios from "axios";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/my/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product deleted!");
      fetchMyProducts();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Farmer Dashboard</h1>

      <a
        href="/farmer/add-product"
        style={{
          display: "inline-block",
          padding: "10px 15px",
          background: "green",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
          marginBottom: "20px",
        }}
      >
        + Add New Product
      </a>

      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />

            <h3>{p.name}</h3>
            <p>Category: {p.category}</p>
            <p>Price: ₹{p.pricePerUnit} / {p.unit}</p>
            <p>Stock: {p.stockQuantity}</p>

            <div style={{ marginTop: "10px" }}>
              <a
                href={`/farmer/edit/${p._id}`}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  background: "blue",
                  color: "white",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                Edit
              </a>

              <a
                href={`/farmer/update-stock/${p._id}`}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  background: "orange",
                  color: "white",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                Update Stock
              </a>

              <button
                onClick={() => deleteProduct(p._id)}
                style={{
                  padding: "5px 10px",
                  background: "red",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FarmerDashboard;
