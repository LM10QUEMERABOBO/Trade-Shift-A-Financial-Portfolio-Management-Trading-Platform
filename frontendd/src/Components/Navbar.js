import React from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="TradeShift Logo" className="logo" />
      <h1 className="app-title">TradeShift</h1>
    </div>
  );
};

export default Navbar;
