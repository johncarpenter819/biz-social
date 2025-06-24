import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { companyId, role } = user;

  if (!user.id) return <Navigate to="/login" />;
  
  return (
    <ThemeProvider companyId={companyId}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/profile/:username" element={<Profile />} />
          {role === "admin" && <Route path="/admin" element={<AdminDashboard />} />}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
