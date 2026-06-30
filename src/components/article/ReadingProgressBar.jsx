import React from "react";
import { useReadingProgress } from "../../hooks/useReadingProgress";

export default function ReadingProgressBar() {
  const progress = useReadingProgress();

  return (
    <div 
      className="fixed top-[84px] left-0 w-full h-[3px] bg-surface-container-high/30 z-50 select-none pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-action-orange transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
