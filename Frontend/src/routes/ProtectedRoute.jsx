import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/useAuth.js";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.isAuthed) return <Navigate to="/login" replace state={{ next: location.pathname }} />;
  return children;
}

