import React from "react";

export default function ProfileCustomizer({ userTheme, setUserTheme, onSave }) {
  return (
    <div className="profile-customizer" style={{ maxWidth: 300, margin: "1rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: 8 }}>
      <h3 style={{ marginBottom: "1rem" }}>Your Profile Style</h3>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: 4 }}>
          Background Color:
        </label>
        <input
          type="color"
          value={userTheme.bgColor}
          onChange={(e) => setUserTheme({ ...userTheme, bgColor: e.target.value })}
          style={{ width: "100%", height: 40, borderRadius: 4, border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: 4 }}>
          Font Family:
        </label>
        <input
          type="text"
          value={userTheme.font}
          onChange={(e) => setUserTheme({ ...userTheme, font: e.target.value })}
          placeholder="e.g. Georgia"
          style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />
      </div>

      {onSave && (
        <button
          onClick={onSave}
          style={{
            backgroundColor: "#004aad",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            width: "100%",
          }}
        >
          Save
        </button>
      )}
    </div>
  );
}
