import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PortfolioTable.css";

const PortfolioTable = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const apiKey = "d2ngcdpr01qvm111r8ngd2ngcdpr01qvm111r8o0"; // 🔹 Replace with your Finnhub API key

  // List of 20 stock symbols
  const stockSymbols = [
    "AAPL", "TSLA", "AMZN", "MSFT", "GOOGL", "META",
    "NFLX", "NVDA", "AMD", "INTC", "IBM", "ORCL",
    "BA", "JPM", "V", "MA", "PYPL", "DIS", "NKE", "PEP"
  ];

  // Fetch stock data + company profile
  const fetchData = async () => {
    try {
      const results = await Promise.all(
        stockSymbols.map(async (symbol) => {
          const [quoteRes, profileRes] = await Promise.all([
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`),
            fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`)
          ]);

          const quote = await quoteRes.json();
          const profile = await profileRes.json();

          return {
            symbol,
            name: profile.name || symbol, // fallback if API doesn’t return name
            price: quote.c,   // current price
            volume: quote.pc, // prev close (using as placeholder for volume)
          };
        })
      );
      setPortfolio(results);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  // Run when page loads + auto-refresh every 10s
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Filtered search
  const filtered = portfolio.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Click handler
  const handleRowClick = (stockSymbol) => {
    navigate(`/trade/${stockSymbol}`);
  };

  return (
    <div className="portfolio-container">
      <h3 className="portfolio-title">🔍 Search Assets</h3>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search stocks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {/* Portfolio Table */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Name</th>
            <th>Market Price ($)</th>
            <th>Previous Close</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((stock, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(stock.symbol)}
              style={{ cursor: "pointer" }}
            >
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.price}</td>
              <td>{stock.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
