import React, { useEffect } from "react";
import Button from "./Button";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = ""
}) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={`bg-surface-alt w-full max-w-md rounded-xl p-6 shadow-xl relative border border-outline-variant/30 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-headline-sm text-headline-sm text-primary">{title}</h3>
          <Button variant="icon" onClick={onClose} ariaLabel="Close dialog">
            <span className="material-symbols-outlined text-sm">close</span>
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
