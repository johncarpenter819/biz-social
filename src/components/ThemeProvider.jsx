import React, { createContext, useContext, useEffect, useState } from "react";
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
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
