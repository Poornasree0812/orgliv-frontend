import React, { useState } from "react";
import "./FarmerRegister.css";

function FarmerRegister() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    crops: "",
    farmingType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you! Your details have been recorded. Our team will contact you."
    );
    setForm({
      name: "",
      phone: "",
      location: "",
      crops: "",
      farmingType: "",
    });
  };

  return (
    <div className="farmer-register">
      <h1>Farmer Registration</h1>
      <p className="subtitle">
        Join OrgLiv to sell your produce directly and fairly.
      </p>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="name"
          placeholder="Farmer Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Village / District"
          value={form.location}
          onChange={handleChange}
        />

        <input
          name="crops"
          placeholder="Crops Grown (eg: Rice, Vegetables)"
          value={form.crops}
          onChange={handleChange}
        />

        <select
          name="farmingType"
          value={form.farmingType}
          onChange={handleChange}
          required
        >
          <option value="">Farming Type</option>
          <option value="organic">Organic</option>
          <option value="non-organic">Non-Organic</option>
          <option value="transition">Transitioning to Organic</option>
        </select>

        <button type="submit">Submit Details</button>
      </form>
    </div>
  );
}

export default FarmerRegister;
