import React from "react";
import { Link } from "react-router-dom";

// ── Brand SVG icons ──────────────────────────────────────────────────────────
function LinkedInIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FacebookIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const FOOTER_LINKS = {
  Home: [
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Comparison", href: "#" },
    { label: "Testimonials", href: "#" },
    { label: "FAQ's", href: "#" },
  ],
  Pages: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/martechadda/",
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://www.instagram.com/martechadda/",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.facebook.com/martechadda/",
    label: "Facebook",
    Icon: FacebookIcon,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white mt-auto" style={{ fontFamily: "'Inter Display', 'inter display placeholder', sans-serif" }}>
      {/* ── Main footer content ── */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[2.5fr_1fr_1fr_0.5fr] gap-10 md:gap-8 lg:gap-16">

          {/* ── Column 1: Brand ── */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
              {/* Logo + wordmark */}
              <Link to="/" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DC98E] rounded-sm w-fit shrink-0" aria-label="MarTechAdda Home">
                <img src="/logo.png" alt="MarTechAdda Logo" className="h-[52px] w-auto object-contain" />
              </Link>
  
              {/* Tagline */}
              <p className="text-[16px] md:text-[20px] text-white leading-snug font-light m-0">
                Neutral Marketing Discovery<span className="md:hidden"> </span><br className="hidden md:block" />
                &amp; Safe Engagement.
              </p>
            </div>

            {/* Email chip */}
            <a
              href="mailto:business@martechadda.com"
              className="mt-1 inline-block border border-white/30 rounded-md px-4 py-2 text-[13px] md:text-[16px] text-white hover:text-red-500 hover:border-red-500 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 w-full md:w-fit text-center md:text-left"
            >
              business@martechadda.com
            </a>
          </div>

          {/* ── Column 2: Home links ── */}
          <div className="col-span-1">
            <h5 className="text-[16px] md:text-[20px] font-medium capitalize text-white mb-4 md:mb-6 select-none">
              Home
            </h5>
            <ul className="space-y-3">
              {FOOTER_LINKS.Home.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[14px] md:text-[18px] text-white hover:text-red-500 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Pages ── */}
          <div className="col-span-1">
            <h5 className="text-[16px] md:text-[20px] font-medium capitalize text-white mb-4 md:mb-6 select-none">
              Pages
            </h5>
            <ul className="space-y-3">
              {FOOTER_LINKS.Pages.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[14px] md:text-[18px] text-white hover:text-red-500 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Social ── */}
          <div className="col-span-2 md:col-span-1 flex flex-row items-center justify-between md:flex-col md:items-start md:justify-start border-b border-white/10 md:border-none pb-6 md:pb-0 mb-2 md:mb-0">
            <h5 className="text-[16px] md:text-[20px] font-medium capitalize text-white mb-0 md:mb-6 select-none">
              Social
            </h5>
            <div className="flex flex-row md:flex-col gap-4">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow MarTechAdda on ${label}`}
                  className="flex items-center justify-center text-white hover:text-red-500 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 w-fit"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.07] pt-2 md:pt-0">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-5 sm:gap-3">
          <p className="text-[14px] md:text-[18px] text-white select-none">
            © 2025 MarTechAdda. All rights reserved.
          </p>
          <a
            href="#"
            className="text-[14px] md:text-[18px] text-white hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
