import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1>Fresh Food. Honest Farming.</h1>
        <p className="hero-sub">
          OrgLiv connects farmers and families through transparent,
          responsibly sourced agricultural produce.
        </p>

        <div className="hero-actions">
          <a href="/products" className="btn primary">Explore Products</a>
          <a href="/farmer/login" className="btn outline">Farmer Login</a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <h2>About OrgLiv</h2>
        <p>
          OrgLiv is a farm-to-consumer platform designed to support farmers
          while giving customers access to clean, traceable food.
        </p>
        <p>
          We promote transparency, fair pricing, and responsible farming —
          covering both organic and non-organic produce with clarity.
        </p>
      </section>

      {/* ROOTS */}
      <section className="section muted">
        <h2>Our Roots</h2>
        <p>
          <strong>Shri Annapurna Farms</strong> is the agricultural foundation
          behind OrgLiv.
        </p>
        <p>
          OrgLiv acts as the technology, logistics, and consumer-facing brand
          that brings farm-level produce directly to households and institutions.
        </p>
      </section>

      {/* TRUST */}
      <section className="section">
        <h2>Why Trust OrgLiv</h2>
        <ul className="trust-list">
          <li>✔ Direct sourcing from verified farmers</li>
          <li>✔ Clear organic & non-organic classification</li>
          <li>✔ Transparent pricing & product details</li>
          <li>✔ Lab testing & certifications (where applicable)</li>
          <li>✔ Fair value for both farmers & consumers</li>
        </ul>
      </section>

      {/* FOR WHOM */}
      <section className="section muted">
        <h2>Who Is OrgLiv For?</h2>
        <div className="for-grid">
          <div className="for-card">
            <h4>Consumers</h4>
            <p>Buy clean, traceable food with confidence.</p>
          </div>

          <div className="for-card">
            <h4>Farmers</h4>
            <p>Sell produce directly with fair margins.</p>
          </div>

          <div className="for-card">
            <h4>Institutions</h4>
            <p>Source agricultural produce responsibly at scale.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
