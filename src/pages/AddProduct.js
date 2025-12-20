import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [unit, setUnit] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // ⭐ image file

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ⭐ FormData for image upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("pricePerUnit", pricePerUnit);
    formData.append("unit", unit);
    formData.append("stockQuantity", stockQuantity);
    formData.append("description", description);
    formData.append("image", image); // ⭐ Important

    try {
      const res = await axios.post(
        "https://orgliv-backend.onrender.com/api/products/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product added successfully!");
      window.location.href = "/farmer/dashboard";

    } catch (err) {
      console.log(err);
      alert("Product adding failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New Product</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category (Fruits, Vegetables, Grains)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price Per Unit"
          value={pricePerUnit}
          onChange={(e) => setPricePerUnit(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Unit (kg, g, piece)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* ⭐ Image Upload Field */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit" style={{ padding: "10px", marginTop: "15px" }}>
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
