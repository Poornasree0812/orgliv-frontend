import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col">
          <h3>OrgLiv</h3>
          <p>
            Fresh food. Honest farming.
            <br />
            Supporting farmers & healthy families.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>Products</li>
            <li>Farmers</li>
            <li>Orders</li>
            <li>Cart</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>Contact</li>
            <li>Help</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} OrgLiv. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
