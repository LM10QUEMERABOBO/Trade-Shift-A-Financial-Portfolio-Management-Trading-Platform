import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "250px",
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "250px",
          }}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "250px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "8px",
            width: "250px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            background: "#1976d2",
            color: "white",
            border: "none",
          }}
        >
          Sign Up
        </button>
        <p style={{ marginTop: "10px" }}>
          Already registered?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
