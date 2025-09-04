import React, { useState, useEffect } from "react";
import "./OrderHistory.css"; // Reuse same CSS styling

const Watchlist = () => {
  const userId = localStorage.getItem("userId"); // ✅ Correct variable name
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch watchlist data from API
  const fetchWatchlist = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/watchlist/user/${userId}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log("Watchlist API Response:", data); // 🔍 Debugging

      // ✅ Ensure it's always an array
      setWatchlist(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      setWatchlist([]); // ✅ Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  if (loading) {
    return <p>Loading watchlist...</p>;
  }

  if (!watchlist.length) {
    return <p>No stocks in your watchlist.</p>;
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">👀 Watchlist</h2>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Stock Symbol</th>
            {/* <th>Stock Name</th> */}
          </tr>
        </thead>
        <tbody>
          {watchlist.map((stock, index) => (
            <tr key={stock.id || index}>
              <td>{stock.id ?? "N/A"}</td>
              <td>{stock.assetSymbol ?? "N/A"}</td>
              {/* <td>{stock.assetName ?? "N/A"}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
