import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar_dashboard.css";
const Navbar = () => {
  const navigate = useNavigate();
  // const navi_signup = useNavigate("/signup");
  return (
    <div className="navbar">
      <img src={logo} alt="TradeShift Logo" className="logo" onClick={() => navigate("/dashboard")}/>
      {/* <h1 className="app-title">TradeShift</h1> */}
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={() => navigate("/")}>Login</button>
        <button className="navbar-button" onClick={() => navigate("/signup")}>Signup</button>
      </div>
    </div>
  );
};

export default Navbar;
