import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Supports old links like /plumber or /electrician by redirecting to /workers?category=...
export default function CategoryRedirectPage() {
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    if (!category) return;
    navigate(`/workers?category=${encodeURIComponent(category)}`, { replace: true });
  }, [category, navigate]);

  return null;
}

