import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function PrivateRoute({ children, requiredRole }) {
  const user = getUser();

  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;

  return children;
}
