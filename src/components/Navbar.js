import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LEFT */}
        <Link to="/" className="nav-logo">
          <img src={logo} alt="OrgLiv" />
          <span>OrgLiv</span>
        </Link>

        {/* RIGHT */}
        <div className="nav-links">
          <Link to="/products" className={isActive("/products")}>
            Products
          </Link>

          <Link to="/cart" className={isActive("/cart")}>
            Cart
          </Link>

          <Link to="/customer/login" className={isActive("/customer/login")}>
            Customer
          </Link>

          <Link
            to="/farmer/login"
            className={`nav-cta ${isActive("/farmer/login")}`}
          >
            Farmer
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
