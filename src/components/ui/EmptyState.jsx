import React from "react";
import Button from "./Button";

export default function EmptyState({
  title = "No Articles Found",
  description = "We couldn't find any articles matching your filters. Try adjusting your search keywords or choosing another category.",
  actionLabel,
  onAction,
  icon = "search_off"
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-outline select-none">
        <span className="material-symbols-outlined text-3xl font-light">{icon}</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
        {title}
      </h3>
      <p className="text-on-surface-variant text-body-md mb-6 font-light leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
