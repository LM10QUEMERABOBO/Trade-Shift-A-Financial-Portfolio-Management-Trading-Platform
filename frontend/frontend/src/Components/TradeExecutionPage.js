import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar_dashboard";
// import Sidebar from "./Sidebar";
import PortfolioTable from "./PortfolioTable";
import HoldingsTable from "./HoldingsTable";
import OrderHistory from "./order_history";
import Transactions from "./Transactions";
import Watchlist from "./Watchlist";
import MyProfile from "./MyProfile";
import Logout from "./Logout";
import {
  Chart,
  ChartCanvas,
  LineSeries,
  XAxis,
  YAxis,
  discontinuousTimeScaleProvider,
} from "react-financial-charts";
import "./TradeExecutionPage.css";

const assetsData = [
  { stock: "AAPL", name: "Apple", marketPrice: 200, totalVolume: 100000 },
  { stock: "TSLA", name: "Tesla", marketPrice: 700, totalVolume: 200000 },
  { stock: "AMZN", name: "Amazon", marketPrice: 3200, totalVolume: 130000 },
  { stock: "MSFT", name: "Microsoft", marketPrice: 280, totalVolume: 190000 },
];

// Mock chart data generator
const buildChartData = (price) => {
  const now = Date.now();
  return Array(30)
    .fill(0)
    .map((_, i) => ({
      date: new Date(now - (29 - i) * 24 * 60 * 60 * 1000),
      close: price + Math.sin(i / 3) * 5 * Math.random(),
    }));
};

const TradeExecutionPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const activePage = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [orderType, setOrderType] = useState("buy");
  const [quantity, setQuantity] = useState(0);

  // Load asset from symbol
  useEffect(() => {
    const asset = assetsData.find((a) => a.stock === symbol);
    if (asset) {
      setSelectedAsset(asset);
      setChartData(buildChartData(asset.marketPrice));
    }
  }, [symbol]);

  const toggleWatchlist = (asset) => {
    setWatchlist((prev) =>
      prev.find((a) => a.stock === asset.stock)
        ? prev.filter((a) => a.stock !== asset.stock)
        : [...prev, asset]
    );
  };

  const handleTrade = () => {
    if (!selectedAsset) return;
    if (quantity <= 0) return alert("Enter a valid quantity");
    alert(
      `Order executed: ${orderType.toUpperCase()} ${quantity} shares of ${
        selectedAsset.name
      } (${selectedAsset.stock}) at $${selectedAsset.marketPrice}`
    );
    setQuantity(0);
  };

  if (!selectedAsset) {
    return (
      <div className="trade-execution-container">
        <h2>❌ Asset not found</h2>
        <button onClick={() => navigate("/")}>⬅ Back to Portfolio</button>
      </div>
    );
  }

  // chart scale provider
  const scaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );
  const { data, xScale, xAccessor, displayXAccessor } = scaleProvider(chartData);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        {/* Sidebar on left */}
        {/* <Sidebar onSelect={setActivePage} /> */}

        {/* Main content on right */}
        <div style={{ flex: 1, padding: "20px" }}>
          {activePage === "home" && <PortfolioTable />}
          {activePage === "holdings" && <HoldingsTable />}
          {activePage === "orders" && <OrderHistory/>}
          {activePage === "transactions" && <Transactions/>}
          {activePage === "watchlist" && <Watchlist/>}
          {activePage === "profile" && <MyProfile/>}
          {activePage === "logout" && <Logout/>}
    <div className="trade-execution-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Back
      </button>

      <h2>
        {selectedAsset.name} ({selectedAsset.stock})
      </h2>

      <button
        className={
          watchlist.find((a) => a.stock === selectedAsset.stock)
            ? "watchlist-btn active"
            : "watchlist-btn"
        }
        onClick={() => toggleWatchlist(selectedAsset)}
      >
        {watchlist.find((a) => a.stock === selectedAsset.stock)
          ? "Remove from Watchlist"
          : "Add to Watchlist"}
      </button>

      {/* Chart */}
      <div className="chart-container">
        <ChartCanvas
          height={300}
          width={700}
          ratio={1}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          data={data}
          seriesName="PriceSeries"
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
        >
          <Chart id={0} yExtents={(d) => d.close}>
            <XAxis />
            <YAxis />
            <LineSeries yAccessor={(d) => d.close} />
          </Chart>
        </ChartCanvas>
      </div>

      {/* Order form */}
      <div className="order-section">
        <label>
          Order Type:
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>

        <label>
          Quantity:
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>

        <button className="trade-btn" onClick={handleTrade}>
          Execute Trade
        </button>
      </div>

      {/* Watchlist preview */}
      {watchlist.length > 0 && (
        <div className="watchlist-section">
          <h3>📌 Your Watchlist</h3>
          <ul>
            {watchlist.map((asset) => (
              <li key={asset.stock}>
                {asset.name} ({asset.stock})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div></div></div></div>
  );
};

export default TradeExecutionPage;
