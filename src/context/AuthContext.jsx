import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

// Mock user profile (no backend required)
const MOCK_USER = {
  id: "user-001",
  name: "Alex Rivera",
  email: "alex@martechadda.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80",
  initials: "AR",
};

const STORAGE_KEY = "martechadda_auth";
const BOOKMARKS_KEY = "martechadda_saved_articles";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [savedArticles, setSavedArticles] = useState(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist auth state
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch { /* noop */ }
  }, [user]);

  // Persist saved articles
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(savedArticles));
    } catch { /* noop */ }
  }, [savedArticles]);

  const login = useCallback(() => {
    setUser(MOCK_USER);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  const isSaved = useCallback((slug) => {
    return savedArticles.includes(slug);
  }, [savedArticles]);

  const toggleSave = useCallback((slug) => {
    if (!isAuthenticated) return false; // caller should show auth gate
    setSavedArticles((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      return [...prev, slug];
    });
    return true;
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, savedArticles, isSaved, toggleSave }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
