import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyProducts();
    // eslint-disable-next-line
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(
        `${API}/api/products/my/products`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `${API}/api/products/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchMyProducts();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Farmer Dashboard</h1>

      <a href="/farmer/add-product">+ Add New Product</a>

      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>₹{p.pricePerUnit}</p>

          <a href={`/farmer/edit/${p._id}`}>Edit</a>
          <a href={`/farmer/update-stock/${p._id}`}>Update Stock</a>
          <button onClick={() => deleteProduct(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default FarmerDashboard;
