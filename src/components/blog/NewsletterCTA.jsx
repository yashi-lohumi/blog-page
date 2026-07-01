import React, { useState, useRef, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Toast from "../ui/Toast";

export default function NewsletterCTA({
  title = "The Monday Digest",
  description = "Get the week's most critical MarTech insights delivered directly to your inbox. No fluff, just strategy."
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const customStyles = `
    @keyframes sparkle-run {
      0% { stroke-dashoffset: 100; opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { stroke-dashoffset: 0; opacity: 0; }
    }
    .sparkle-path {
      stroke-dasharray: 15 100;
      stroke-dashoffset: 100;
      opacity: 0;
    }
    .group:hover .sparkle-path {
      animation: sparkle-run 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  `;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email address is required");
      return;
    }

    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate API request
    setToastMessage("Successfully subscribed! Welcome to the Adda.");
    setShowToast(true);
    setEmail("");
  };

  return (
    <section id="newsletter" className="w-full py-stack-lg" ref={sectionRef}>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div 
          className={`w-full bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm border border-action-orange relative overflow-hidden transition-all duration-[800ms] ease-out transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.92]"
          }`}
        >
          
          {/* Decorative background shape */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-action-orange opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-action-orange opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-xl relative z-10 text-left">
            <h4 className="font-headline-md text-primary text-3xl md:text-4xl mb-4 font-bold">{title}</h4>
            <p className="text-on-surface-variant text-body-lg md:text-xl font-medium leading-relaxed">{description}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg items-start relative z-10">
            <div className="w-full flex-grow">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                error={error}
                ariaLabel="Newsletter email address"
                className="bg-white border-outline-variant/30 text-primary placeholder:text-on-surface-variant/40 focus:ring-action-orange focus:border-action-orange transition-all h-12 md:h-14 text-base rounded-none shadow-sm"
              />
            </div>
            <div className="relative group self-stretch sm:self-start mt-0.5 md:mt-0 shadow-md">
              <style>{customStyles}</style>
              <Button
                type="submit"
                variant="primary"
                className="bg-action-orange text-white hover:bg-[#d96a0d] active:bg-[#d96a0d] font-bold text-base px-8 h-12 md:h-14 rounded-none whitespace-nowrap relative z-10 w-full transition-none"
              >
                Subscribe
              </Button>
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect 
                  width="100%" 
                  height="100%" 
                  fill="none" 
                  stroke="url(#sparkleGradient)" 
                  strokeWidth="2.5"
                  pathLength="100"
                  className="sparkle-path"
                  style={{ filter: "blur(1px)" }}
                />
                <defs>
                  <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#a5f3fc" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </form>
        </div>
      </div>

      <Toast
        message={toastMessage}
        type="success"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
