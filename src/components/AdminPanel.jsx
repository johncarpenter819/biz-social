import React, { useState, useEffect } from "react";
import { getContrastColor } from "../utils/colorUtils";
import "../styles/AdminPanel.css";

export default function AdminPanel({ companyInfo, setCompanyInfo, fallbackLogo }) {
  const [primaryColor, setPrimaryColor] = useState("#004aad");
  const [secondaryColor, setSecondaryColor] = useState("#f5f6fa");
  const [sidebarColor, setSidebarColor] = useState("#2f3542");
  const [feedBgColor, setFeedBgColor] = useState("#ffffff");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme")) || {};
    if (savedTheme.primaryColor) setPrimaryColor(savedTheme.primaryColor);
    if (savedTheme.secondaryColor) setSecondaryColor(savedTheme.secondaryColor);
    if (savedTheme.sidebarColor) setSidebarColor(savedTheme.sidebarColor);
    if (savedTheme.feedBgColor) setFeedBgColor(savedTheme.feedBgColor);

    const applyThemeVar = (cssVar, value, textVar) => {
      if (value) {
        document.documentElement.style.setProperty(cssVar, value);
        if (textVar) {
          document.documentElement.style.setProperty(textVar, getContrastColor(value));
        }
      }
    };

    applyThemeVar("--primary", savedTheme.primaryColor, "--primary-text");
    applyThemeVar("--secondary", savedTheme.secondaryColor, "--secondary-text");
    applyThemeVar("--admin-sidebar-bg", savedTheme.sidebarColor, "--admin-sidebar-text");
    applyThemeVar("--feed-bg", savedTheme.feedBgColor);
  }, []);

  const updateTheme = (key, value) => {
    if (key === "primaryColor") setPrimaryColor(value);
    else if (key === "secondaryColor") setSecondaryColor(value);
    else if (key === "sidebarColor") setSidebarColor(value);
    else if (key === "feedBgColor") setFeedBgColor(value);

    const currentTheme = JSON.parse(localStorage.getItem("theme")) || {};
    const updatedTheme = { ...currentTheme, [key]: value };
    localStorage.setItem("theme", JSON.stringify(updatedTheme));

    const cssVarMap = {
      primaryColor: "--primary",
      secondaryColor: "--secondary",
      sidebarColor: "--admin-sidebar-bg",
      feedBgColor: "--feed-bg",
    };

    const textVarMap = {
      primaryColor: "--primary-text",
      secondaryColor: "--secondary-text",
      sidebarColor: "--admin-sidebar-text",
    };

    document.documentElement.style.setProperty(cssVarMap[key], value);
    if (textVarMap[key]) {
      document.documentElement.style.setProperty(textVarMap[key], getContrastColor(value));
    }
  };

  // === 🆕 Company Branding ===
  const handleNameChange = (e) => {
    setCompanyInfo({ ...companyInfo, name: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCompanyInfo(prev => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-panel">
      <h2>Customize Company Theme</h2>

      <label>
        Primary Color:
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => updateTheme("primaryColor", e.target.value)}
        />
      </label>
      <br />

      <label>
        Secondary Color:
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) => updateTheme("secondaryColor", e.target.value)}
        />
      </label>
      <br />

      <label>
        Sidebar Color:
        <input
          type="color"
          value={sidebarColor}
          onChange={(e) => updateTheme("sidebarColor", e.target.value)}
        />
      </label>
      <br />

      <label>
        Feed Background Color:
        <input
          type="color"
          value={feedBgColor}
          onChange={(e) => updateTheme("feedBgColor", e.target.value)}
        />
      </label>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Company Branding</h2>
      <label>
        Company Name:
        <input
          type="text"
          value={companyInfo.name}
          onChange={handleNameChange}
          placeholder="My Company"
          style={{ marginLeft: "0.5rem" }}
        />
      </label>
      <br />
      <label>
        Company Logo:
        <input type="file" accept="image/*" onChange={handleLogoChange} />
      </label>

      <div style={{ marginTop: "1rem" }}>
        <p>Live Preview:</p>
        <img
          src={companyInfo.logo || fallbackLogo}
          alt="Preview"
          style={{ height: "70px", borderRadius: "50%" }}
        />
        <p style={{ fontWeight: "bold" }}>{companyInfo.name || "My Company"}</p>
      </div>
    </div>
  );
}
