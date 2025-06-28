import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminPanel from "../components/AdminPanel";
import AdminUsers from "../components/AdminUsers";
import "../styles/AdminDashboard.css";

export default function AdminDashboard({ fallbackLogo }) {
  // Initialize companyInfo state with default empty values
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    logo: "",
  });

  const [selected, setSelected] = useState("users");

  return (
    <div className="admin-container">
      <AdminSidebar selected={selected} setSelected={setSelected} />
      <div className="admin-content">
        {selected === "users" && <AdminUsers />}
        {selected === "theme" && (
          <AdminPanel
            companyInfo={companyInfo}
            setCompanyInfo={setCompanyInfo}
            fallbackLogo={fallbackLogo}
          />
        )}
        {selected === "analytics" && <p>Coming Soon: Company analytics...</p>}
      </div>
    </div>
  );
}
