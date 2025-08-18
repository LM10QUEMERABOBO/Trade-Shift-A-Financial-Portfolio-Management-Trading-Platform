import React from "react";
import "./Sidebar.css";

function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelect("portfolio")}>Portfolio</li>
        <li onClick={() => onSelect("profile")}>Profile</li>
        <li onClick={() => onSelect("settings")}>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
