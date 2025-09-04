import React, { useState } from "react";
import Navbar from "./Components/Navbar_noLog";
import Sidebar from "./Components/Sidebar";
import PortfolioTable from "./Components/PortfolioTable";
import HoldingsTable from "./Components/HoldingsTable";
import OrderHistory from "./Components/order_history";
import Transactions from "./Components/Transactions";
import Watchlist from "./Components/Watchlist";
import MyProfile from "./Components/MyProfile";
import Logout from "./Components/Logout";
// import marketNews from "./Components/marketNews";

function Dashboard() {
  const [activePage, setActivePage] = useState("home"); // default page

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        {/* Sidebar on left */}
        <Sidebar onSelect={setActivePage} />

        {/* Main content on right */}
        <div style={{ flex: 1, padding: "20px" }}>
          {activePage === "home" && <PortfolioTable />}
          {activePage === "holdings" && <HoldingsTable />}
          {activePage === "orders" && <OrderHistory/>}
          {activePage === "transactions" && <Transactions/>}
          {activePage === "watchlist" && <Watchlist/>}
          {activePage === "profile" && <MyProfile/>}
          {activePage === "logout" && <Logout/>}
          {/* {activePage === "marketNews" && <marketNews />} */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
