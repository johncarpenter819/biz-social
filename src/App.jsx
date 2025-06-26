import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import { getUser } from "./utils/auth";

const domainLogo = "/img/company.webp";

export default function App() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "My Company",
    logo: "" // admin can upload a new logo
  });

  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar companyInfo={companyInfo} user={user} />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard
                  companyInfo={companyInfo}
                  setCompanyInfo={setCompanyInfo}
                  fallbackLogo={domainLogo}
                  user={user}
                  setUser={setUser}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
