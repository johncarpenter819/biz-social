import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primary: "#004aad",
    secondary: "#f0f0f0",
    font: "Arial",
  });

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("companyTheme");
    if (stored) {
      setTheme(JSON.parse(stored));
    }
  }, []);

  // Apply theme variables to the document root
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secondary", theme.secondary);
    document.documentElement.style.setProperty("--font", theme.font);
  }, [theme]);

  // Update theme and save to localStorage
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

// Custom hook to consume the ThemeContext
export const useTheme = () => useContext(ThemeContext);
