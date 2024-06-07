import React from "react";
import { BrowserRouter as Router, Route, Routes, Form } from "react-router-dom";
import './index.css'
// import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Hotels from "./components/pages/Hotels";
import Transportation from "./components/pages/Transportation";
import Budget from "./components/pages/Budget";
import Favourites from "./components/pages/Favourites";
import Rentals from "./components/pages/Rentals";
import Login from "./components/login-singin/Login";
import Register from "./components/login-singin/Register";
import Home from "./components/home/home"
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <>
      <Router>
        {/* <NavBar /> */}
        <div className="bg-[#f8fafc] w-full min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
