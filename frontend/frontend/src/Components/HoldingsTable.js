import React, { useState } from "react";
import "./PortfolioTable.css"; // Reuse the same CSS

const HoldingsTable = () => {
  const [holdings] = useState([
    { name: "AAPL", quantity: 10, price: 200 },
    { name: "TSLA", quantity: 5, price: 700 },
    { name: "AMZN", quantity: 3, price: 3200 },
    { name: "MSFT", quantity: 8, price: 280 },
  ]);

  return (
    <div className="portfolio-container">
      <h3 className="portfolio-title">📊 My Holdings</h3>

      {/* Holdings Table */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Total Value ($)</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock, index) => (
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

export default HoldingsTable;
