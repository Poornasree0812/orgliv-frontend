import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Pure Food. <br />
            <span>Premium Farming.</span>
          </h1>

          <p>
            OrgLiv connects conscious consumers with trusted farmers,
            delivering clean, traceable, and responsibly grown food
            directly from farms to families.
          </p>

          <div className="hero-buttons">
            <a href="/products" className="btn-primary">
              Explore Products
            </a>
            <a href="/farmer-login" className="btn-secondary">
              Farmer Login
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="about">
        <h2>About OrgLiv</h2>
        <p>
          OrgLiv is a farm-to-consumer platform built to empower farmers
          and provide families with access to honest, healthy food.
          We believe transparency, fair pricing, and sustainability
          should be the foundation of food systems.
        </p>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="values">
        <div className="value-card">
          <h3>🌱 Farmer First</h3>
          <p>
            Farmers receive fair prices, visibility, and long-term
            support through direct market access.
          </p>
        </div>

        <div className="value-card">
          <h3>🧺 Clean Food</h3>
          <p>
            Food that is traceable, responsibly grown, and free from
            unnecessary chemicals.
          </p>
        </div>

        <div className="value-card">
          <h3>🤝 Trust & Transparency</h3>
          <p>
            Clear sourcing, honest pricing, and full transparency
            between farmers and consumers.
          </p>
        </div>
      </section>

      {/* ================= ROOTS SECTION ================= */}
      <section className="roots">
        <h2>Our Roots</h2>
        <p>
          <strong>Shri Annapurna Farms</strong> is the agricultural
          foundation behind OrgLiv. OrgLiv acts as the technology,
          logistics, and consumer-facing platform bringing farm-level
          produce directly to households and institutions.
        </p>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="cta">
        <h2>Eat Better. Support Farmers.</h2>
        <p>
          Join the movement toward honest food and sustainable farming.
        </p>
        <a href="/products" className="btn-primary">
          Start Shopping
        </a>
      </section>

    </div>
  );
}

export default Home;
