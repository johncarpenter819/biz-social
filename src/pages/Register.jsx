import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    const result = signup(form.username.trim(), form.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
