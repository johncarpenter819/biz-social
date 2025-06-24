<<<<<<< HEAD
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
=======
import React from "react";
import AdminPanel from "../components/AdminPanel";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <AdminPanel />
>>>>>>> 25d6c4a36aeaddb07fc11549887fce68c1067d88
    </div>
  );
}
