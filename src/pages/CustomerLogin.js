import React, { useState } from "react";
import axios from "axios";

function CustomerLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Customer Login Successful");
      window.location.href = "/products";
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Login</h2>

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

      <button onClick={handleLogin} style={{ padding: "10px" }}>
        Login
      </button>

      <p>
        Don't have an account? <a href="/customer/register">Register</a>
      </p>
    </div>
  );
}

export default CustomerLogin;
