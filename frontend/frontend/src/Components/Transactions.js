import React from "react";
import "./OrderHistory.css"; // Reuse same CSS

const Transactions = () => {
  const transactions = [
    {
      id: 1,
      user_id: 1,
      asset_symbol: "AAPL",
      transaction_type: 1, // SELL
      quantity: 5.0,
      price: 182.5,
      transaction_date: "2025-08-30 11:54:59",
    },
    {
      id: 2,
      user_id: 1,
      asset_symbol: "AAPL",
      transaction_type: 0, // BUY
      quantity: 10.0,
      price: 182.5,
      transaction_date: "2025-08-31 06:21:20",
    },
  ];

  const getType = (type) => (type === 1 ? "SELL" : "BUY");

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">💰 Transactions Details</h2>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            {/* <th>User ID</th> */}
            <th>Stock Symbol</th>
            <th>Transaction Type</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              {/* <td>{txn.user_id}</td> */}
              <td>{txn.asset_symbol}</td>
              <td className={txn.transaction_type === 1 ? "sell" : "buy"}>
                {getType(txn.transaction_type)}
              </td>
              <td>{txn.quantity}</td>
              <td>{txn.price}</td>
              <td>{txn.transaction_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
