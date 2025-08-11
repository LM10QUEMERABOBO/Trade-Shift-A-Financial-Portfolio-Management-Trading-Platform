import React from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="main">
          <h2>Portfolio Value: $120,000</h2>
          <p>Example chart and assets will be added here.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
