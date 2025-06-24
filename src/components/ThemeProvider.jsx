import React, { createContext, useContext, useEffect, useState } from "react";
<<<<<<< HEAD

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
=======
const ThemeContext = createContext();

export const ThemeProvider = ({ children, companyId }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const cache = JSON.parse(localStorage.getItem("theme"));
    const cacheCompany = localStorage.getItem("companyId");

    if (cache && cacheCompany === companyId) {
      setTheme(cache);
    } else {
      fetch(`/api/company/${companyId}/settings`)
        .then(r => r.json())
        .then(d => {
          setTheme(d.theme);
          localStorage.setItem("theme", JSON.stringify(d.theme));
          localStorage.setItem("companyId", companyId);
        });
    }
  }, [companyId]);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
    fetch(`/api/company/${companyId}/settings`, {
      method: 'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ theme: newTheme })
    });
  };

  return (
    <ThemeContext.Provider value={{ theme: theme || {}, updateTheme }}>
>>>>>>> 25d6c4a36aeaddb07fc11549887fce68c1067d88
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
