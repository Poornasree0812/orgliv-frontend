import React, { useState } from "react";
import axios from "axios";
import "./FarmerAuth.css";

const API_URL = "http://localhost:5000/api/auth/register";

function FarmerRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(API_URL, {
        ...form,
        role: "farmer",
      });

      alert("Registration successful. Wait for admin approval.");
      window.location.href = "/farmer/login";
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Farmer Registration 🌱</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="auth-link">
          Already registered? <a href="/farmer/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default FarmerRegister;
