import React from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="max-w-md mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center text-primary font-bold text-3xl mb-6 select-none border border-outline-variant/30">
          404
        </div>
        <h1 className="font-display-lg text-3xl sm:text-4xl text-primary font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-on-surface-variant text-body-lg font-light leading-relaxed mb-8">
          The page you requested does not exist or has been moved to another section.
        </p>
        <Link to="/blog">
          <Button variant="primary">Return to Blog Landing</Button>
        </Link>
      </div>
    </PageContainer>
  );
}
