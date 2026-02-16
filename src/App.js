import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="main-content">
        <Routes>

          {/* ✅ Redirect root "/" to "/products" */}
          <Route path="/" element={<Navigate to="/products" replace />} />

          {/* Main Pages */}
          <Route path="/products" element={<Products />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Optional: 404 Page (Recommended) */}
          <Route path="*" element={<h2>Page Not Found</h2>} />

        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
