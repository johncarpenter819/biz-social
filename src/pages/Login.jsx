import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import "../styles/Login.css"; 

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.username, form.password);
    if (result.success) {
      setUser(result.user); // ✅ update user state in App
      navigate(`/profile/${result.user.username}`); // ✅ redirect to profile
    } else {
      setError("Invalid credentials");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
