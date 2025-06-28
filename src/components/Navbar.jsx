import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "../styles/Navbar.css";

const DEFAULT_AVATAR = "/img/avatar1.svg";
const DOMAIN_LOGO = "/img/company.webp";

export default function Navbar({ companyInfo, user }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState(user?.avatar || DEFAULT_AVATAR);
  const [themeColor, setThemeColor] = useState("#a084ca");

  useEffect(() => {
    setAvatar(user?.avatar || DEFAULT_AVATAR);

    const loadColor = () => {
      const stored = localStorage.getItem("theme-color");
      setThemeColor(stored || "#a084ca");
    };

    // Initial load
    loadColor();

    // Sync with any theme color changes across tabs or components
    const handleStorage = (e) => {
      if (e.key === "theme-color") {
        loadColor();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [user]);

  // This catches changes from Profile.jsx in same tab too
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("theme-color");
      if (stored && stored !== themeColor) {
        setThemeColor(stored);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [themeColor]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatar(newAvatarUrl);
      // TODO: Persist avatar change to backend/localStorage
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <img
            src={companyInfo?.logo || DOMAIN_LOGO}
            alt="Logo"
            className="navbar-logo"
            style={{
              filter: `drop-shadow(0 0 4px ${themeColor})`,
              transition: "filter 0.3s ease, transform 0.3s ease",
            }}
          />
          <span className="company-name">{companyInfo?.name || "My Company"}</span>
        </div>

        <div className="navbar-center">
          {user ? (
            <>
              <Link to="/" className="nav-link">Feed</Link>
              <Link to={`/profile/${user.username}`} className="nav-link">Profile</Link>
              {user.role === "admin" && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>

        {user ? (
          <div className="navbar-right">
            <img
              src={avatar}
              alt="Avatar"
              className="navbar-avatar clickable"
              onClick={handleAvatarClick}
              title="Click to change avatar"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <span className="username">{user.username}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
