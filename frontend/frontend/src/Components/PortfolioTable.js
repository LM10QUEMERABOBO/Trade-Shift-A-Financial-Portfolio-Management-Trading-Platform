import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PortfolioTable.css";

const PortfolioTable = () => {
  const [portfolio] = useState([
    { symbol: "AAPL", name: "Apple", price: 200, volume: 100000 },
    { symbol: "TSLA", name: "Tesla", price: 700, volume: 200000 },
    { symbol: "AMZN", name: "Amazon", price: 3200, volume: 130000 },
    { symbol: "MSFT", name: "Microsoft", price: 280, volume: 190000 },
  ]);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = portfolio.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  // Click handler function for rows
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
            <th>Market Price($)</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((stock, index) => (
            <tr
              key={index}
              data-stock={stock.symbol}
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
