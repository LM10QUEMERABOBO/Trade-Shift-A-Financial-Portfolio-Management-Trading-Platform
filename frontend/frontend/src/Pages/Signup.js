import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <-- Add this line

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example API call
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("fullname", data.firstName +" "+ data.lastName);
        navigate("/");
        // const data = await response.json();
        // alert("Signup response:", data);
        alert("Signup successful!, Login now!");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="login-page">
    <div style={{ display: "flex", justifyContent: "center"}}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: '#1976d2' }}>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error */}
        
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "8px", width: "250px" }}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "8px", width: "250px" }}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "8px", width: "250px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "8px", width: "250px" }}
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
    </div>
  );
}

export default Signup;
