import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import Toast from "../ui/Toast";
import { useAuth } from "../../context/AuthContext";

/**
 * Bookmark icon button — used on BlogCard and BlogDetails.
 * Auth-aware: shows a login gate toast if user is not authenticated.
 *
 * Props:
 *   slug        — article slug to save/unsave
 *   className   — optional wrapper className
 *   size        — 'sm' | 'md' (default)
 */
export default function BookmarkButton({ slug, className = "", size = "md" }) {
  const { isAuthenticated, isSaved, toggleSave } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ visible: false, type: "info", message: "", subMessage: "", actions: [] });

  const saved = isSaved(slug);

  const closeToast = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      // Show auth gate toast
      setToast({
        visible: true,
        type: "auth",
        message: "Log in to save articles for later.",
        subMessage: "Create a free account to build your reading list.",
        actions: [
          {
            label: "Log In",
            variant: "primary",
            onClick: () => navigate("/login"),
          },
          {
            label: "Not Now",
            variant: "ghost",
            onClick: closeToast,
          },
        ],
      });
      return;
    }

    // Optimistic update
    const wasSaved = isSaved(slug);
    toggleSave(slug);

    setToast({
      visible: true,
      type: "success",
      message: wasSaved ? "Article removed from saved." : "Article saved.",
      subMessage: wasSaved ? "" : "Find it anytime in Saved Articles.",
      actions: [],
    });
  }, [isAuthenticated, isSaved, toggleSave, slug, navigate, closeToast]);

  const iconSize = size === "sm" ? 18 : 22;
  const btnSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <div className={`inline-block ${className}`}>
      <button
        onClick={handleClick}
        aria-label={saved ? "Remove from saved articles" : "Save this article"}
        aria-pressed={saved}
        title={saved ? "Remove from saved" : "Save for later"}
        className={`
          ${btnSize} rounded-full flex items-center justify-center
          border transition-all duration-300 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-action-orange focus-visible:ring-offset-1
          ${saved
            ? "bg-action-orange/10 border-action-orange/40 text-action-orange shadow-sm"
            : "bg-white/70 border-outline-variant/30 text-on-surface-variant hover:text-action-orange hover:border-action-orange/40 hover:bg-action-orange/5"
          }
        `}
      >
        <Bookmark
          size={iconSize}
          fill={saved ? "currentColor" : "none"}
          className={`transition-all duration-300 select-none ${saved ? "scale-110 text-action-orange" : "scale-100"}`}
        />
      </button>

      <Toast
        message={toast.message}
        subMessage={toast.subMessage}
        type={toast.type}
        visible={toast.visible}
        onClose={closeToast}
        actions={toast.actions}
        duration={3500}
      />
    </div>
  );
}
