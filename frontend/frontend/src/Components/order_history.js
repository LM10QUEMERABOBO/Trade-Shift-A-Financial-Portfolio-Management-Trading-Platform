import React,{useState,useEffect} from "react";
import "./OrderHistory.css"; // Import CSS file

const OrderHistory = () => {
    const storedUser = localStorage.getItem("userId");
    const [orders, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchOrderHistory = async () => {
    try{
      const res = await fetch(`http://localhost:8081/api/trades/history/${storedUser}`);
      const data = await res.json();
      setOrderHistory(data);
      } 
    catch (error) {
      console.error("Error fetching holdings:", error);  
    } finally {
    setLoading(false);
    }
  };
    useEffect(() => {
      fetchOrderHistory();
    }, []);
      if (loading) {
      return <p>Loading holdings...</p>;
    }

    if (orders.length === 0) {
      return <p>No holdings found.</p>;
    }
  // const orders = [
  //   {
  //     id: 1,
  //     asset_symbol: "AAPL",
  //     order_type: "SELL",
  //     quantity: 5,
  //     price: 182.5,
  //     status: "FILLED",
  //     created_at: "2025-08-30 17:24:59",
  //   },
  //   {
  //     id: 2,
  //     asset_symbol: "AAPL",
  //     order_type: "BUY",
  //     quantity: 10,
  //     price: 182.5,
  //     status: "FILLED",
  //     created_at: "2025-08-31 11:51:20",
  //   },
  // ];

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
              <td>{order.assetSymbol}</td>
              <td className={order.orderType === "BUY" ? "buy" : "sell"}>
                {order.orderType}
              </td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td className="filled">{order.status}</td>
              <td>{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
