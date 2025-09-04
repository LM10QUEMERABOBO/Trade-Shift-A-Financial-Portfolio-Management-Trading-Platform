import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar_noLog";
import {
  ChartCanvas,
  Chart,
  LineSeries,
  XAxis,
  YAxis,
  discontinuousTimeScaleProvider,
} from "react-financial-charts";
import "./TradeExecutionPage.css";

const API_KEY = "d2ngcdpr01qvm111r8ngd2ngcdpr01qvm111r8o0"; // Finnhub API Key
const API_BASE_URL = "http://localhost:8081/api";

const TradeExecutionPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [orderType, setOrderType] = useState("buy");
  const [quantity, setQuantity] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  /** ---------------------------
   * Fetch stock data (price & profile)
   * --------------------------- */
  const fetchStockData = async () => {
    try {
      setLoading(true);
      const [quoteRes, profileRes] = await Promise.all([
        fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`),
        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`),
      ]);

      const quote = await quoteRes.json();
      const profile = await profileRes.json();

      const assetData = {
        symbol,
        name: profile?.name || symbol,
        price: quote?.c || 0,
        prevClose: quote?.pc || 0,
      };

      setAsset(assetData);

      // Generate dummy chart data
      const now = Date.now();
      const history = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(now - (29 - i) * 24 * 60 * 60 * 1000),
        close: assetData.price + Math.sin(i / 3) * 5 * Math.random(),
      }));
      setChartData(history);
    } catch (error) {
      console.error("🚨 Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  /** ---------------------------
   * Fetch user watchlist
   * --------------------------- */
  const fetchWatchlist = async () => {
    if (!userId || !token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/watchlist/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setWatchlist(data);
      }
    } catch (error) {
      console.error("🚨 Error fetching watchlist:", error);
    }
  };

  /** ---------------------------
   * Toggle watchlist
   * --------------------------- */
  const toggleWatchlist = async (selectedAsset) => {
    const existingItem = watchlist.find(
      (item) => item.assetSymbol === selectedAsset.symbol
    );

    try {
      if (existingItem) {
        // Remove from watchlist
        await fetch(`${API_BASE_URL}/watchlist/${existingItem.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        setWatchlist((prev) =>
          prev.filter((item) => item.id !== existingItem.id)
        );
      } else {
        // Add to watchlist
        const response = await fetch(`${API_BASE_URL}/watchlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: parseInt(userId, 10),
            assetSymbol: selectedAsset.symbol,
            assetName: selectedAsset.name,
          }),
        });

        if (response.ok) {
          const savedItem = await response.json();
          setWatchlist((prev) => [...prev, savedItem]);
        }
      }
    } catch (error) {
      console.error("🚨 Error toggling watchlist:", error);
    }
  };

  /** ---------------------------
   * Execute a trade
   * --------------------------- */
  const handleTrade = async () => {
    if (!asset) return alert("⚠️ No asset selected");
    if (quantity <= 0) return alert("⚠️ Enter a valid quantity");

    const tradeRequest = {
      userId,
      symbol: asset.symbol,
      assetName: asset.name,
      type: orderType.toUpperCase(),
      quantity,
      price: asset.price,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/trades/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tradeRequest),
      });

      const text = await response.text();
      if (response.ok) {
        const result = JSON.parse(text);
        alert(`✅ Trade successful: ${result.quantity} ${result.assetSymbol} at $${result.price}`);
        setQuantity(0);
      } else {
        alert(`❌ Trade failed: ${text || "Unknown error"}`);
      }
    } catch (error) {
      console.error("🚨 Error placing trade:", error);
      alert("⚠️ Could not reach the server. Check console for details.");
    }
  };

  /** ---------------------------
   * Load data on mount & refresh periodically
   * --------------------------- */
  useEffect(() => {
    fetchStockData();
    fetchWatchlist();

    const interval = setInterval(fetchStockData, 10000);
    return () => clearInterval(interval);
  }, [symbol]);

  /** ---------------------------
   * Chart configuration
   * --------------------------- */
  const scaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data, xScale, xAccessor, displayXAccessor } = scaleProvider(chartData);

  /** ---------------------------
   * Render
   * --------------------------- */
  return (
    <div>
      <Navbar />
      <div className="trade-execution-container">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ⬅ Back
        </button>

        {loading ? (
          <p>Loading asset data...</p>
        ) : asset ? (
          <>
            <h2>{asset.name} ({asset.symbol})</h2>
            <p>Market Price: ${asset.price}</p>
            <p>Previous Close: ${asset.prevClose}</p>

            {/* Watchlist Button */}
            <button
              className={
                watchlist.find((a) => a.assetSymbol === asset.symbol)
                  ? "watchlist-btn active"
                  : "watchlist-btn"
              }
              onClick={() => toggleWatchlist(asset)}
            >
              {watchlist.find((a) => a.assetSymbol === asset.symbol)
                ? "Remove from Watchlist"
                : "Add to Watchlist"}
            </button>

            {/* Chart */}
            {chartData.length > 0 ? (
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
            ) : (
              <p>No chart data available</p>
            )}

            {/* Trade Form */}
            <div className="order-section">
              <label>
                Order Type:
                <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
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

            {/* Watchlist Display */}
            {watchlist.length > 0 && (
              <div className="watchlist-section">
                <h3>📌 Your Watchlist</h3>
                <ul>
                  {watchlist.map((item) => (
                    <li key={item.id}>
                      {item.assetName} ({item.assetSymbol})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p>❌ Unable to load asset information</p>
        )}
      </div>
    </div>
  );
};

export default TradeExecutionPage;
