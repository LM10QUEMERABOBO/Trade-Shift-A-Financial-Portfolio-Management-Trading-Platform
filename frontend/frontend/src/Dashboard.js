import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import PortfolioTable from "./Components/PortfolioTable";

function Dashboard() {
  const [activePage, setActivePage] = useState("portfolio"); // default page

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        {/* Sidebar on left */}
        <Sidebar onSelect={setActivePage} />

        {/* Main content on right */}
        <div style={{ flex: 1, padding: "20px" }}>
          {activePage === "portfolio" && <PortfolioTable />}
          {activePage === "profile" && <h2>User Profile Coming Soon...</h2>}
          {activePage === "settings" && <h2>Settings Page Coming Soon...</h2>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
