import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogLanding from "../pages/BlogLanding";
import BlogDetails from "../pages/BlogDetails";
import SavedArticles from "../pages/SavedArticles";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Route '/' to BlogLanding */}
      <Route path="/" element={<BlogLanding />} />
      
      {/* Route '/blog' to BlogLanding */}
      <Route path="/blog" element={<BlogLanding />} />
      
      {/* Route '/blog/:slug' to BlogDetails */}
      <Route path="/blog/:slug" element={<BlogDetails />} />
      
      {/* Route '/saved' — Saved Articles (was /bookmarks) */}
      <Route path="/saved" element={<SavedArticles />} />
      
      {/* Backwards compat: /bookmarks → /saved */}
      <Route path="/bookmarks" element={<SavedArticles />} />
      
      {/* Catch-all Route for NotFound */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
