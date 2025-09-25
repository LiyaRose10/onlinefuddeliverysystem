import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ConfirmOrder from "./components/ConfirmOrder";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
<Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
