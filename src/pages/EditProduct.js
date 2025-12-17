import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    category: "",
    pricePerUnit: "",
    unit: "",
    stockQuantity: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      const p = res.data;

      setForm({
        name: p.name,
        category: p.category,
        pricePerUnit: p.pricePerUnit,
        unit: p.unit,
        stockQuantity: p.stockQuantity,
        description: p.description,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/products/update/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product updated successfully!");
      window.location.href = "/farmer/dashboard";
    } catch (err) {
      console.log(err);
      alert("Failed to update product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Product</h1>

      <form onSubmit={updateProduct} style={{ maxWidth: "400px" }}>
        
        <label>Product Name:</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Category:</label>
        <input
          type="text"
          required
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Unit (kg, piece, bunch):</label>
        <input
          type="text"
          required
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Price Per Unit (₹):</label>
        <input
          type="number"
          required
          value={form.pricePerUnit}
          onChange={(e) =>
            setForm({ ...form, pricePerUnit: Number(e.target.value) })
          }
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Stock Quantity:</label>
        <input
          type="number"
          required
          value={form.stockQuantity}
          onChange={(e) =>
            setForm({ ...form, stockQuantity: Number(e.target.value) })
          }
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Description:</label>
        <textarea
          required
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          style={{ width: "100%", height: "80px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            borderRadius: "5px",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
