import React from "react";

export default function ProfileCustomizer({ userTheme, setUserTheme }) {
  return (
    <div className="profile-customizer">
      <h3>Your Profile Style</h3>
      <label>Background: <input type="color" value={userTheme.bgColor} onChange={e => setUserTheme({ ...userTheme, bgColor: e.target.value })} /></label>
      <label>Font: <input type="text" value={userTheme.font} onChange={e => setUserTheme({ ...userTheme, font: e.target.value })} placeholder="e.g. Georgia" /></label>
    </div>
  );
}
