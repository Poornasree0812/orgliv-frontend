import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerProducts from "./pages/CustomerProducts";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CustomerOrdersPage from "./pages/CustomerOrdersPage";
import CustomerProfile from "./pages/CustomerProfile";

import FarmerLogin from "./pages/FarmerLogin";
import FarmerRegister from "./pages/FarmerRegister";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerOrdersPage from "./pages/FarmerOrdersPage";
import FarmerProfile from "./pages/FarmerProfile";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import UpdateStock from "./pages/UpdateStock";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductsPage from "./pages/AdminProductsPage";

import ContainerManagementPage from "./pages/ContainerMangementPage";
import DeliveryPartnerDashboard from "./pages/DeliveryPartnerDashboard";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Customer */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/products" element={<CustomerProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<CustomerOrdersPage />} />
          <Route path="/profile" element={<CustomerProfile />} />

          {/* Farmer */}
          <Route path="/farmer/login" element={<FarmerLogin />} />
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/orders" element={<FarmerOrdersPage />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/farmer/add-product" element={<AddProduct />} />
          <Route path="/farmer/edit/:id" element={<EditProduct />} />
          <Route path="/farmer/update-stock/:id" element={<UpdateStock />} />
          <Route path="/farmer/register" element={<FarmerRegister />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />

          <Route path="/admin/containers" element={<ContainerManagementPage />} />
          <Route path="/delivery/dashboard" element={<DeliveryPartnerDashboard />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
