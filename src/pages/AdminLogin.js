import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

const API_URL =
  process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api/auth/login`
    : "http://localhost:5000/api/auth/login";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(API_URL, {
        email,
        password,
        role: "admin",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Admin Login 🔐</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="admin-note">
          This page is restricted to OrgLiv administrators only.
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;
