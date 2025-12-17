import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FarmerDashboard.css";

const API_URL = "http://localhost:5000/api/products";

function FarmerDashboard() {
  const token = localStorage.getItem("token");

  // -------------------------
  // STATES
  // -------------------------
  const [form, setForm] = useState({
    name: "",
    category: "",
    pricePerUnit: "",
    unit: "",
    stockQuantity: "",
    description: ""
  });

  const [image, setImage] = useState(null);        // image file
  const [myProducts, setMyProducts] = useState([]); 
  const [loading, setLoading] = useState(false);

  // -------------------------
  // FETCH MY PRODUCTS
  // -------------------------
  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/my/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  // -------------------------
  // ADD PRODUCT
  // -------------------------
  const handleAddProduct = async () => {
    if (!form.name || !form.category || !form.pricePerUnit || !form.unit || !form.stockQuantity) {
      return alert("Please fill all fields");
    }

    if (!image) return alert("Please select an image");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("category", form.category);
    fd.append("pricePerUnit", form.pricePerUnit);
    fd.append("unit", form.unit);
    fd.append("stockQuantity", form.stockQuantity);
    fd.append("description", form.description);
    fd.append("image", image);

    try {
      setLoading(true);
      await axios.post(`${API_URL}/add`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully!");
      setForm({
        name: "",
        category: "",
        pricePerUnit: "",
        unit: "",
        stockQuantity: "",
        description: ""
      });
      setImage(null);

      fetchMyProducts();
    } catch (err) {
      console.log("Add product error:", err);
      alert("Product add failed!");
    }
    setLoading(false);
  };

  // -------------------------
  // UPDATE STOCK
  // -------------------------
  const updateStock = async (id) => {
    const qty = prompt("Enter new stock quantity:");
    if (!qty) return;

    try {
      await axios.put(
        `${API_URL}/stock/${id}`,
        { stockQuantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMyProducts();
    } catch (err) {
      console.log("Stock update error:", err);
      alert("Failed to update stock");
    }
  };

  // -------------------------
  // DELETE PRODUCT
  // -------------------------
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyProducts();
    } catch (err) {
      console.log("Delete error:", err);
      alert("Failed to delete");
    }
  };

  // -------------------------
  // JSX RETURN
  // -------------------------
  return (
    <div className="farmer-dashboard">

      <h1>Farmer Dashboard</h1>

      {/* --------------------------------------------------- */}
      {/* ADD PRODUCT SECTION */}
      {/* --------------------------------------------------- */}
      <div className="add-product-box">
        <h2>Add New Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Leafy Greens</option>
          <option>Grains</option>
          <option>Pulses</option>
          <option>Oil Seeds</option>
          <option>Organic Essentials</option>
        </select>

        <input
          type="number"
          placeholder="Price Per Unit"
          value={form.pricePerUnit}
          onChange={(e) => setForm({ ...form, pricePerUnit: e.target.value })}
        />

        <input
          type="text"
          placeholder="Unit (kg, packet, dozens)"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={form.stockQuantity}
          onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* ------------------ FILE INPUT ------------------ */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* ------------------ IMAGE PREVIEW ------------------ */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="preview-img"
          />
        )}

        <button onClick={handleAddProduct} disabled={loading}>
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </div>

      {/* --------------------------------------------------- */}
      {/* MY PRODUCTS LIST */}
      {/* --------------------------------------------------- */}
      <h2 style={{ marginTop: "40px" }}>My Products</h2>

      <div className="my-products-grid">
        {myProducts.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.imageUrl} alt={p.name} />

            <h3>{p.name}</h3>
            <p>{p.category}</p>
            <p>
              ₹ {p.pricePerUnit} / {p.unit}
            </p>
            <p>Stock: {p.stockQuantity}</p>

            <p>Status:  
              <span style={{ color: p.isApproved ? "green" : "orange" }}>
                {p.isApproved ? "Approved" : "Pending"}
              </span>
            </p>

            <div className="product-actions">
              <button onClick={() => updateStock(p._id)}>Update Stock</button>
              <button className="danger" onClick={() => deleteProduct(p._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default FarmerDashboard;
