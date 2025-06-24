import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";


export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
