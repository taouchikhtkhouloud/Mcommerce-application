import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductInfo from "./pages/ProductInfo";
import Register from "./pages/Register";
import { Fragment, useState } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import './App.css'
function App() {
 
  return (
    <>
    
      <NavBar />
      <Router>
        <Routes>
        <Route index path="/" element={<Home  />} />

          <Route  path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productInfo/:productId" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}
export default App;
