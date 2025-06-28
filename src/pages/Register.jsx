import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";
import "../styles/Register.css";

export default function Register({ setUser }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    username: "",
    password: "",
    confirm: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName", "lastName", "email", "phone", "address",
      "birthday", "username", "password", "confirm"
    ];

    for (const field of requiredFields) {
      if (!form[field].trim()) {
        setError("Please fill in all fields.");
        return;
      }
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    const result = signup(form.username.trim(), form.password, {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      birthday: form.birthday,
    });

    if (result.success) {
      setUser(result.user); // ✅ set user globally
      navigate(`/profile/${result.user.username}`); // ✅ redirect to profile page
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <input name="birthday" type="date" placeholder="Birthday" value={form.birthday} onChange={handleChange} />
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <input name="confirm" type="password" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
