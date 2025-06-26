import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import "../styles/Navbar.css";

// Default avatar image URL (replace with your own default if needed)
const DEFAULT_AVATAR = "/img/avatar1.svg";
const domainLogo = "/img/company.webp";

export default function Navbar({ companyInfo }) {
  const userFromAuth = getUser();
  const navigate = useNavigate();

  // Local avatar state — start with user avatar or default
  const [avatar, setAvatar] = useState(userFromAuth?.avatar || DEFAULT_AVATAR);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // On avatar file select, preview locally
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatar(newAvatarUrl);

      // TODO: Upload file to backend and update user avatar persistently
    }
  };

  // Define whether current user can edit their avatar
  const canEditAvatar = !!userFromAuth; // or add more conditions for admin

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={companyInfo?.logo || domainLogo}
          alt="Company Logo"
          className="navbar-logo"
        />
        <div className="navbar-company-name">
          {companyInfo?.name || "My Company"}
        </div>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Feed
        </Link>

        {userFromAuth && (
          <Link to={`/profile/${userFromAuth.username}`} className="nav-link">
            My Profile
          </Link>
        )}

        {userFromAuth?.role === "admin" && (
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        )}

        {userFromAuth ? (
          <button onClick={handleLogout} className="nav-button">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>

      {userFromAuth && (
        <div className="navbar-profile">
          <div className="avatar-wrapper">
            {/* Clicking avatar opens file picker */}
            <label
              htmlFor="avatar-upload"
              style={{ cursor: canEditAvatar ? "pointer" : "default", display: "block" }}
            >
              <img
                src={avatar}
                alt="Profile"
                className="navbar-avatar"
              />
            </label>

            {/* Edit icon bottom-right overlay */}
            {canEditAvatar && (
              <>
                <label
                  htmlFor="avatar-upload"
                  className="avatar-edit-label"
                  title="Change avatar"
                >
                  &#9998;
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>

          <div className="navbar-username">{userFromAuth.username}</div>
        </div>
      )}
    </nav>
  );
}
