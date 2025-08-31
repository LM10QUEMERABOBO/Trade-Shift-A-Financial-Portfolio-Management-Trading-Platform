import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session logic here
    alert("Logged out successfully!");
    navigate("/"); 
  };

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">🚪 Logout</h2>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
