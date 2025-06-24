import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primary: "#004aad",
    secondary: "#f0f0f0",
    font: "Arial"
  });

  // Load saved theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("companyTheme");
    if (stored) setTheme(JSON.parse(stored));
  }, []);

  // Apply theme to :root CSS
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secondary", theme.secondary);
    document.documentElement.style.setProperty("--font", theme.font);
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("companyTheme", JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
