import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md select-text">
      {/* Accessibility: Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-150 focus:px-6 focus:py-3 focus:bg-action-orange focus:text-white focus:font-bold focus:rounded focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar />

      <main 
        id="main-content" 
        className="flex-grow pt-[84px] pb-stack-lg transition-all duration-300"
        tabIndex="-1"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
