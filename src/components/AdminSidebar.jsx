import React from "react";

export default function AdminSidebar({ selected, setSelected }) {
  return (
    <div className="admin-sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li
          className={selected === "users" ? "active" : ""}
          onClick={() => setSelected("users")}
        >
          Users
        </li>
        <li
          className={selected === "theme" ? "active" : ""}
          onClick={() => setSelected("theme")}
        >
          Customize Theme
        </li>
        <li
          className={selected === "analytics" ? "active" : ""}
          onClick={() => setSelected("analytics")}
        >
          Analytics
        </li>
      </ul>
    </div>
  );
}
