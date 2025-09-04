import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./Navbar_noLog.css";

const Navbar = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const fullName = localStorage.getItem("fullname");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);
  return (
    <div className="navbar">
      <img src={logo} alt="TradeShift Logo" className="logo" />
      <h1 className="app-title">Hello, {username || "User"}</h1>
    </div>
  );
};

export default Navbar;
