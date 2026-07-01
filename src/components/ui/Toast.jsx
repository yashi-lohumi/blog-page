import React, { useEffect, useRef } from "react";
import { CheckCircle, AlertCircle, Bookmark, Info, X } from "lucide-react";

/**
 * Toast with optional action buttons (e.g. Log In / Not Now).
 * Supports: info | success | error | auth
 */
export default function Toast({
  message,
  subMessage,
  type = "info",
  duration = 3500,
  onClose,
  visible = false,
  actions = [], // [{ label, onClick, variant: 'primary'|'ghost' }]
}) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (visible && onClose) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const styles = {
    info: "bg-white border-outline-variant/40 text-primary shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
    success: "bg-white border-green-200 text-primary shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
    error: "bg-white border-red-200 text-primary shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
    auth: "bg-white border-outline-variant/40 text-primary shadow-[0_8px_32px_rgba(0,0,0,0.14)]",
  };

  const iconMap = {
    success: { Icon: CheckCircle, color: "text-green-500" },
    error: { Icon: AlertCircle, color: "text-red-500" },
    auth: { Icon: Bookmark, color: "text-action-orange", fill: "currentColor" },
    info: { Icon: Info, color: "text-on-surface-variant" },
  };

  const { Icon, color, fill } = iconMap[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 px-5 py-4 rounded-xl border backdrop-blur-sm min-w-[280px] max-w-sm transition-all duration-300 animate-in ${styles[type]}`}
    >
      <div className="flex items-start gap-3">
        <Icon size={20} className={`mt-0.5 flex-shrink-0 ${color}`} fill={fill || "none"} />
        <div className="flex-1">
          <p className="font-semibold text-label-md text-primary leading-snug">{message}</p>
          {subMessage && (
            <p className="text-label-sm text-on-surface-variant mt-0.5 font-light leading-snug">{subMessage}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-outline hover:text-primary transition-colors flex-shrink-0 ml-1"
          aria-label="Dismiss notification"
        >
          <X size={18} />
        </button>
      </div>

      {actions.length > 0 && (
        <div className="flex items-center gap-2 justify-end border-t border-outline-variant/20 pt-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                action.onClick?.();
                onClose?.();
              }}
              className={`text-label-md font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 ${
                action.variant === "primary"
                  ? "bg-action-orange text-white hover:opacity-90 active:scale-95"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
