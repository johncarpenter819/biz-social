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
    </div>
  );
}
