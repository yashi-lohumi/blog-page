import React from "react";

export default function SkeletonLoader({ type = "card", count = 3 }) {
  const renderSkeletons = () => {
    const skeletons = [];
    
    for (let i = 0; i < count; i++) {
      if (type === "card") {
        skeletons.push(
          <div key={i} className="bg-surface-alt border border-outline-variant/15 rounded-lg overflow-hidden animate-pulse p-6 flex flex-col h-full text-left">
            <div className="aspect-[16/10] bg-surface-container-highest rounded mb-4 w-full" />
            <div className="h-4 bg-surface-container-highest rounded w-1/4 mb-3" />
            <div className="h-6 bg-surface-container-highest rounded w-3/4 mb-3" />
            <div className="h-4 bg-surface-container-highest rounded w-5/6 mb-2" />
            <div className="h-4 bg-surface-container-highest rounded w-2/3 mb-6" />
            <div className="mt-auto h-4 bg-surface-container-highest rounded w-1/2 pt-4 border-t border-outline-variant/10" />
          </div>
        );
      } else if (type === "hero") {
        skeletons.push(
          <div key={i} className="animate-pulse bg-surface-container-highest rounded-xl h-[450px] sm:h-[550px] md:h-[600px] w-full p-12 flex flex-col justify-end">
            <div className="h-4 bg-surface-container/30 rounded w-1/6 mb-4" />
            <div className="h-10 bg-surface-container/30 rounded w-2/3 mb-6" />
            <div className="h-4 bg-surface-container/30 rounded w-5/6 mb-2" />
            <div className="h-4 bg-surface-container/30 rounded w-1/2" />
          </div>
        );
      } else if (type === "sidebar") {
        skeletons.push(
          <div key={i} className="animate-pulse space-y-6">
            <div className="h-6 bg-surface-container-highest rounded w-1/3 mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-surface-container-highest rounded w-3/4" />
              <div className="h-4 bg-surface-container-highest rounded w-1/2" />
              <div className="h-4 bg-surface-container-highest rounded w-2/3" />
            </div>
          </div>
        );
      }
    }
    
    return skeletons;
  };

  return (
    <>
      {renderSkeletons()}
    </>
  );
}
