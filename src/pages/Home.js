import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <img src={logo} alt="OrgLiv" className="hero-logo" />

          <h1>Fresh Food. Honest Farming.</h1>

          <p className="hero-text">
            OrgLiv connects farmers and families through transparent,
            responsibly sourced agricultural produce.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="btn primary">
              Explore Products
            </Link>
            <Link to="/farmer-login" className="btn outline">
              Farmer Login
            </Link>
          </div>
        </div>
      </section>

      {/* WHY ORGLIV */}
      <section className="section light">
        <h2 className="section-title">Why OrgLiv?</h2>

        <div className="features">
          <div className="feature-card">
            <h3>🌱 Direct From Farmers</h3>
            <p>
              No middlemen involved. Farmers receive fair prices while customers
              enjoy fresher produce.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔍 Full Transparency</h3>
            <p>
              Understand where your food comes from, how it is grown, and who
              grows it.
            </p>
          </div>

          <div className="feature-card">
            <h3>📦 Smart Logistics</h3>
            <p>
              Efficient packing, storage, and delivery handled with utmost care.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="content-box">
          <h2>About OrgLiv</h2>
          <p>
            OrgLiv is a farm-to-consumer platform designed to support farmers
            while giving customers access to clean, traceable food.
          </p>
          <p>
            We promote transparency, fair pricing, and responsible farming —
            covering both organic and non-organic produce with clarity.
          </p>
        </div>
      </section>

      {/* ROOTS */}
      <section className="section highlight">
        <div className="content-box">
          <h2>Our Roots</h2>
          <p>
            <strong>Shri Annapurna Farms</strong> is the agricultural foundation
            behind OrgLiv.
          </p>
          <p>
            OrgLiv acts as the technology, logistics, and consumer-facing brand
            that brings farm-level produce directly to households and
            institutions.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Eat Better. Support Farmers.</h2>
        <p>
          Join the movement towards honest food and sustainable farming.
        </p>

        <Link to="/products" className="btn primary large">
          Start Shopping
        </Link>
      </section>
    </div>
  );
};

export default Home;
