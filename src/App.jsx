import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage"; // New import for the cart page
import { CartProvider } from "./CartContext"; // New import for the CartProvider
import './App.css'

function App() {
  return (
    <>
      <Router>
        {/* Wrap the entire application in the CartProvider */}
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              {/* Add the new route for the cart page */}
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </Router>
    </>
  )
}

export default App
