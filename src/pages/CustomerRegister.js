import React, { useState } from "react";
import axios from "axios";

function CustomerRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...form,
        role: "customer",
      });

      alert("Customer Registered Successfully!");
      window.location.href = "/customer/login";
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{ display: "block", margin: "10px" }}
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{ display: "block", margin: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{ display: "block", margin: "10px" }}
      />

      <button onClick={handleRegister} style={{ padding: "10px" }}>
        Register
      </button>
    </div>
  );
}

export default CustomerRegister;
