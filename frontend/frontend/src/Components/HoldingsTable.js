import React, { useState, useEffect } from "react";
import "./PortfolioTable.css"; // Reuse the same CSS

const HoldingsTable = () => {
  const storedUser = localStorage.getItem("userId");
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch holdings from API
  const fetchHoldings = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/portfolio/${storedUser}`);
      const data = await res.json();

      console.log("Holdings API Response:", data); // 🔍 Debug

      // ✅ Ensure we always set an array
      if (Array.isArray(data)) {
        setHoldings(data);
      } else if (data && Array.isArray(data.holdings)) {
        // If API wraps it inside "holdings"
        setHoldings(data.holdings);
      } else {
        setHoldings([]);
      }
    } catch (error) {
      console.error("Error fetching holdings:", error);
      setHoldings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  if (loading) {
    return <p>Loading holdings...</p>;
  }

  if (!Array.isArray(holdings) || holdings.length === 0) {
    return <p>No holdings found.</p>;
  }

  return (
    <div className="portfolio-container">
      <h3 className="portfolio-title">📊 My Holdings</h3>
      {/* <h3 className="portfolio-title" >Total P&L today:</h3> */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Quantity</th>
            <th>Current Price ($)</th>
            <th>P&L Value($)</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock, index) => (
            <tr key={index}>
              <td>{stock.name || stock.symbol || "N/A"}</td>
              <td>{stock.quantity ?? "N/A"}</td>
              <td>{stock.currentPrice ?? "N/A"}</td>
              <td>{stock.pnl ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
