import React from "react";
import {
  Home,
  BarChart3,
  ListOrdered,
  FileText,
  Eye,
  User,
  LogOut,
  // Settings,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelect("home")}>
          <Home size={14} /> Home
        </li>
        <li onClick={() => onSelect("holdings")}>
          <BarChart3 size={14} /> My Holdings
        </li>
        <li onClick={() => onSelect("orders")}>
          <ListOrdered size={14} /> View Order History
        </li>
        <li onClick={() => onSelect("transactions")}>
          <FileText size={14} /> Transaction Details
        </li>
        <li onClick={() => onSelect("watchlist")}>
          <Eye size={14} /> Watchlist
        </li>
        <li onClick={() => onSelect("profile")}>
          <User size={14} /> My Profile
        </li>
        <li onClick={() => onSelect("logout")}>
          <LogOut size={14} /> Logout
        </li>
        {/* <li onClick={() => onSelect("marketNews")}>
          <marketNews size={18} /> Market News
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
