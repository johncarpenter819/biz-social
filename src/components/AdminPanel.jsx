<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { getContrastColor } from "../utils/colorUtils";

export default function AdminPanel() {
  const [primaryColor, setPrimaryColor] = useState("#004aad");
  const [secondaryColor, setSecondaryColor] = useState("#f5f6fa");
  const [sidebarColor, setSidebarColor] = useState("#2f3542");
  const [feedBgColor, setFeedBgColor] = useState("#ffffff"); // new state

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme")) || {};
    if (savedTheme.primaryColor) setPrimaryColor(savedTheme.primaryColor);
    if (savedTheme.secondaryColor) setSecondaryColor(savedTheme.secondaryColor);
    if (savedTheme.sidebarColor) setSidebarColor(savedTheme.sidebarColor);
    if (savedTheme.feedBgColor) setFeedBgColor(savedTheme.feedBgColor);

    if (savedTheme.primaryColor) {
      document.documentElement.style.setProperty("--primary", savedTheme.primaryColor);
      document.documentElement.style.setProperty("--primary-text", getContrastColor(savedTheme.primaryColor));
    }
    if (savedTheme.secondaryColor) {
      document.documentElement.style.setProperty("--secondary", savedTheme.secondaryColor);
      document.documentElement.style.setProperty("--secondary-text", getContrastColor(savedTheme.secondaryColor));
    }
    if (savedTheme.sidebarColor) {
      document.documentElement.style.setProperty("--admin-sidebar-bg", savedTheme.sidebarColor);
      document.documentElement.style.setProperty("--admin-sidebar-text", getContrastColor(savedTheme.sidebarColor));
    }
    if (savedTheme.feedBgColor) {
      document.documentElement.style.setProperty("--feed-bg", savedTheme.feedBgColor);
    }
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

  return (
    <div>
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
=======
import React from "react";
import { useTheme } from "./ThemeProvider";

export default function AdminPanel() {
  const { theme, updateTheme } = useTheme();

  const handle = (e) => updateTheme({ ...theme, [e.target.name]: e.target.value });

  return (
    <div className="admin-panel">
      <h2>Admin Branding</h2>
      <label>Primary: <input type="color" name="primary" value={theme.primary || "#000"} onChange={handle} /></label>
      <label>Secondary: <input type="color" name="secondary" value={theme.secondary || "#fff"} onChange={handle} /></label>
      <label>Font: <select name="font" value={theme.font || "Arial"} onChange={handle}>
        <option>Arial</option><option>Roboto</option><option>Georgia</option>
      </select></label>
>>>>>>> 25d6c4a36aeaddb07fc11549887fce68c1067d88
    </div>
  );
}
