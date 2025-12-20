import React, { useState } from "react";
import axios from "axios";
import "./FarmerAuth.css";

const API_URL = "http://localhost:5000/api/auth/login";

function FarmerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(API_URL, {
        email,
        password,
        role: "farmer",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "farmer");

      window.location.href = "/farmer/dashboard";
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Farmer Login 🌾</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-link">
          New farmer? <a href="/farmer/register">Register here</a>
        </p>
      </form>
    </div>
  );
}

export default FarmerLogin;
