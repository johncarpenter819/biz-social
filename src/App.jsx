import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getUser } from "./utils/auth";

function ProtectedRoute({ user, children, adminOnly = false }) {
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(getUser());

  // Manage posts state here, load from localStorage initially
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  // Persist posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Delete post handler that updates state
  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const latestUser = getUser();
      setUser((prev) =>
        JSON.stringify(prev) !== JSON.stringify(latestUser) ? latestUser : prev
      );
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider companyId={user?.companyId}>
        <Navbar user={user} />
        <Routes>
          {/* Public routes with setUser passed in */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Feed posts={posts} onDeletePost={handleDeletePost} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <ProtectedRoute user={user}>
                <Profile posts={posts} onDeletePost={handleDeletePost} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route
            path="*"
            element={<Navigate to={user ? "/" : "/login"} replace />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
