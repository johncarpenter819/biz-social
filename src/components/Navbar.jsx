import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import "./Navbar.css"; // create this CSS file for navbar styles

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Feed</Link>

      {user && (
        <Link to={`/profile/${user.username}`} className="nav-link">
          My Profile
        </Link>
      )}

      {user?.role === "admin" && (
        <Link to="/admin" className="nav-link">
          Admin
        </Link>
      )}

      {user ? (
        <button onClick={handleLogout} className="nav-button">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </>
      )}
    </nav>
  );
}
