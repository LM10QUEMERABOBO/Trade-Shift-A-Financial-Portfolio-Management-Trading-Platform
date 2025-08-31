import React, { useState } from "react";
import "./OrderHistory.css";

const Settings = () => {
  const [theme, setTheme] = useState("Light");

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">⚙️ Settings</h2>
      <div style={{ padding: "20px" }}>
        <p><strong>Theme:</strong></p>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px" }}
        >
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
