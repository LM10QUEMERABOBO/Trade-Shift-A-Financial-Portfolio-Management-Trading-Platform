import React, { useState, useEffect } from "react";
import "./OrderHistory.css"; // Reuse same CSS

const Transactions = () => {
  const storedUser = localStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/analytics/transactions/${storedUser}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Transactions API Response:", data);

      // ✅ Set transactions from 'recent' key
      if (data && Array.isArray(data.recent)) {
        setTransactions(data.recent);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (!transactions.length) {
    return <p>No transactions found.</p>;
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">💰 Transactions Details</h2>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Stock Symbol</th>
            <th>Transaction Type</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={txn.id || index}>
              <td>{txn.id ?? "N/A"}</td>
              <td>{txn.assetSymbol ?? "N/A"}</td>
              <td className={txn.transactionType === "SELL" ? "sell" : "buy"}>
                {txn.transactionType}
              </td>
              <td>{txn.quantity ?? "N/A"}</td>
              <td>{txn.price ?? "N/A"}</td>
              <td>{txn.transactionDate ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
