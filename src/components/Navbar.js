import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "customer" | "farmer" | "admin"

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        
        {/* LOGO */}
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="OrgLiv" />
          </Link>
        </div>

        {/* MENU BUTTON */}
        <button
          className={`hamburger ${open ? "is-active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* LINKS */}
        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>

          {!token && (
            <>
              <li><Link to="/customer/login">Customer</Link></li>
              <li><Link to="/farmer/login">Farmer</Link></li>
            </>
          )}

          {role === "farmer" && (
            <>
              <li><Link to="/farmer/dashboard">Dashboard</Link></li>
              <li><Link to="/farmer/orders">My Sales</Link></li>
            </>
          )}

          {role === "customer" && (
            <>
              <li><Link to="/orders">My Orders</Link></li>
            </>
          )}

          {role === "admin" && (
            <>
              <li><Link to="/admin/dashboard">Admin Panel</Link></li>
            </>
          )}

          {/* PROFILE */}
          {token && (
            <li className="profile-menu">
              <span className="profile-icon">👤</span>
              <div className="profile-dropdown">
                <button onClick={logout}>Logout</button>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
