import React from "react";
import "./OrderHistory.css"; // Import CSS file

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      asset_symbol: "AAPL",
      order_type: "SELL",
      quantity: 5,
      price: 182.5,
      status: "FILLED",
      created_at: "2025-08-30 17:24:59",
    },
    {
      id: 2,
      asset_symbol: "AAPL",
      order_type: "BUY",
      quantity: 10,
      price: 182.5,
      status: "FILLED",
      created_at: "2025-08-31 11:51:20",
    },
  ];

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">📜 Order History</h2>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Stock Symbol</th>
            <th>Order Type</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Status</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.asset_symbol}</td>
              <td className={order.order_type === "BUY" ? "buy" : "sell"}>
                {order.order_type}
              </td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td className="filled">{order.status}</td>
              <td>{order.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
