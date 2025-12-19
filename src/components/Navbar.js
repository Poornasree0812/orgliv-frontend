import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">OrgLiv</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/login">Customer</Link></li>
        <li><Link to="/farmer-login" className="farmer-btn">Farmer</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
