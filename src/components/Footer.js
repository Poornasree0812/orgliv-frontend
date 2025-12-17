import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>OrgLiv</h3>
          <p>
            Connecting farmers and families through
            healthy, chemical-free organic food.
          </p>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>Products</li>
            <li>Farmers</li>
            <li>Organic Promise</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Trust</h4>
          <ul>
            <li>Eco-friendly</li>
            <li>Fair Pricing</li>
            <li>Direct from Farms</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} OrgLiv • Harvesting Health, Honoring Farmers
      </div>
    </footer>
  );
}

export default Footer;
