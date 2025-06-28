import React, { useState, useEffect } from "react";
import { getContrastColor } from "../utils/colorUtils";
import "../styles/AdminPanel.css";

export default function AdminPanel({ companyInfo, setCompanyInfo, fallbackLogo }) {
  const [primaryColor, setPrimaryColor] = useState("#004aad");
  const [secondaryColor, setSecondaryColor] = useState("#f5f6fa");
  const [sidebarColor, setSidebarColor] = useState("#2f3542");
  const [feedBgColor, setFeedBgColor] = useState("#ffffff");
  const [navbarBgImagePreview, setNavbarBgImagePreview] = useState(null);
  const [navbarBgColor, setNavbarBgColor] = useState("#000000");

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme")) || {};

    // Clean up invalid navbarBgImage URLs that cause 404 errors
    if (
      savedTheme.navbarBgImage &&
      !savedTheme.navbarBgImage.startsWith("data:image")
    ) {
      delete savedTheme.navbarBgImage;
      localStorage.setItem("theme", JSON.stringify(savedTheme));
    }

    if (savedTheme.primaryColor) setPrimaryColor(savedTheme.primaryColor);
    if (savedTheme.secondaryColor) setSecondaryColor(savedTheme.secondaryColor);
    if (savedTheme.sidebarColor) setSidebarColor(savedTheme.sidebarColor);
    if (savedTheme.feedBgColor) setFeedBgColor(savedTheme.feedBgColor);

    if (savedTheme.navbarBgColor) {
      setNavbarBgColor(savedTheme.navbarBgColor);
      document.documentElement.style.setProperty("--navbar-bg", savedTheme.navbarBgColor);
      document.documentElement.style.setProperty(
        "--navbar-text",
        getContrastColor(savedTheme.navbarBgColor)
      );
    } else if (!savedTheme.navbarBgImage) {
      // Default navbar bg color if no image or color saved
      setNavbarBgColor("#000000");
      document.documentElement.style.setProperty("--navbar-bg", "#000000");
      document.documentElement.style.setProperty("--navbar-text", "#ffffff");
    }

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

    if (savedTheme.navbarBgImage) {
      updateNavbarBgImage(savedTheme.navbarBgImage);
      setNavbarBgImagePreview(savedTheme.navbarBgImage);
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

    if (key === "primaryColor") {
      document.documentElement.style.setProperty("--navbar-bg", value);
      document.documentElement.style.setProperty("--navbar-text", getContrastColor(value));
    }
  };

  // New: Update navbar background color and clear any navbar bg image
  const updateNavbarBgColor = (color) => {
    setNavbarBgColor(color);

    // Clear navbar background image CSS and localStorage
    document.documentElement.style.setProperty("--navbar-bg-image", "none");

    const currentTheme = JSON.parse(localStorage.getItem("theme")) || {};
    const updatedTheme = { ...currentTheme, navbarBgColor: color };
    delete updatedTheme.navbarBgImage; // remove image if present

    localStorage.setItem("theme", JSON.stringify(updatedTheme));

    document.documentElement.style.setProperty("--navbar-bg", color);
    document.documentElement.style.setProperty("--navbar-text", getContrastColor(color));

    setNavbarBgImagePreview(null);
  };

  const updateNavbarBgImage = (imageDataUrl) => {
    const cssValue = imageDataUrl ? `url(${imageDataUrl})` : "none";
    document.documentElement.style.setProperty("--navbar-bg-image", cssValue);

    const currentTheme = JSON.parse(localStorage.getItem("theme")) || {};
    const updatedTheme = { ...currentTheme, navbarBgImage: imageDataUrl };
    localStorage.setItem("theme", JSON.stringify(updatedTheme));
  };

  const handleNavbarBgImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      updateNavbarBgImage(imageDataUrl);
      setNavbarBgImagePreview(imageDataUrl);
      // Clear navbarBgColor state because image overrides color
      setNavbarBgColor("");
    };
    reader.readAsDataURL(file);
  };

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
      <br />

      <label>
        Navbar Background Color:
        <input
          type="color"
          value={navbarBgColor}
          onChange={(e) => updateNavbarBgColor(e.target.value)}
        />
      </label>
      <br />

      <label>
        Navbar Background Image:
        <input type="file" accept="image/*" onChange={handleNavbarBgImageChange} />
      </label>

      {navbarBgImagePreview && (
        <div className="preview">
          <p>Navbar Background Preview:</p>
          <img
            src={navbarBgImagePreview}
            alt="Navbar Background Preview"
            style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
          />
        </div>
      )}

      <hr />

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

      <div className="preview">
        <p>Live Preview:</p>
        <img
          src={companyInfo.logo || fallbackLogo}
          alt="Preview"
          style={{ height: "70px", borderRadius: "50%" }}
        />
        <p>{companyInfo.name || "My Company"}</p>
      </div>
    </div>
  );
}
