import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from "./context/CartContext";
import "./theme.css";   // ⭐ ADD THIS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>       {/* ⭐ WRAP APP HERE */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
