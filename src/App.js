import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Payment from "./components/Payment";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/products/ProductDetail";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import CartPage from "./components/cart/CartPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <Box sx={{ backgroundColor: "#F7F7F7" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Box>
  );
};

export default App;
