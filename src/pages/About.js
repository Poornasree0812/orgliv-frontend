import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1>About OrgLiv</h1>

      <p>
        OrgLiv is a platform dedicated to connecting farmers directly with
        customers. We believe everyone deserves access to pure, chemical-free,
        organic food. Our mission is to improve farmer’s income while providing
        healthy, nutrient-rich food to every family.
      </p>

      <h2>Our Vision</h2>
      <p>
        To build a healthier India where farmers are respected, customers are
        healthy, and food is grown naturally — the way it should be.
      </p>

      <h2>Why Choose Us?</h2>
      <ul>
        <li>100% organic and chemical-free products</li>
        <li>Farmers earn directly without middlemen</li>
        <li>Lab-tested purity verification</li>
        <li>Fresh, nutrient-rich food</li>
        <li>Supporting rural communities</li>
      </ul>

      <p>Together, let's create a healthy generation.</p>
    </div>
  );
}

export default About;
