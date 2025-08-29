import React, { useState } from "react";
import "./PortfolioTable.css";

const PortfolioTable = () => {
  const [portfolio] = useState([
    { name: "AAPL", quantity: 10, price: 200 },
    { name: "TSLA", quantity: 5, price: 700 },
    { name: "AMZN", quantity: 3, price: 3200 },
    { name: "MSFT", quantity: 8, price: 280 },
  ]);

  const [search, setSearch] = useState("");

  const filtered = portfolio.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portfolio-container">
      <h3 className="portfolio-title">🔍 Search Portfolio</h3>

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
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Total Value ($)</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((stock, index) => (
            <tr key={index}>
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
              <td>{stock.price}</td>
              <td>{stock.quantity * stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
