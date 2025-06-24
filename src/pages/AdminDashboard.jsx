import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminPanel from "../components/AdminPanel";
import AdminUsers from "../components/AdminUsers";
import "../styles/AdminDashboard.css";


export default function AdminDashboard() {
  const [selected, setSelected] = useState("users");

  return (
    <div className="admin-container">
      <AdminSidebar selected={selected} setSelected={setSelected} />
      <div className="admin-content">
        {selected === "users" && <AdminUsers />}
        {selected === "theme" && <AdminPanel />}
        {selected === "analytics" && <p>Coming Soon: Company analytics...</p>}
      </div>
    </div>
  );
}
