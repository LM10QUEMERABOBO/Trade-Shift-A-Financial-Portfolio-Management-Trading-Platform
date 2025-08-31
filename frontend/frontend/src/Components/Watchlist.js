import React from "react";
import "./OrderHistory.css"; // Reuse same CSS styling

const Watchlist = () => {
  const watchlist = [
    { id: 1, symbol: "AAPL", price: 182.5 },
    { id: 2, symbol: "TSLA", price: 700 },
    { id: 3, symbol: "AMZN", price: 3200 },
  ];

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">👀 Watchlist</h2>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Stock Symbol</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.symbol}</td>
              <td>{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
