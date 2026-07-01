import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Bookmark, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { label: "Marketing Services", href: "#", external: true },
  { label: "How It Works", href: "#", external: true },
  { label: "Blog", href: "/blog", external: false },
  { label: "Resources", href: "#", external: true },
  { label: "For Experts", href: "#", external: true },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarBtnRef = useRef(null);

  const isBlogActive = location.pathname === "/" || location.pathname.startsWith("/blog");

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && dropdownOpen) {
        setDropdownOpen(false);
        avatarBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [dropdownOpen]);

  return (
    <header
      className="fixed top-0 w-full z-50 h-[84px] flex items-center"
      style={{
        background: "rgba(255,255,255,0.80)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center justify-between w-full mx-auto px-4 md:px-8">

        {/* ── Brand Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-extrabold text-xl text-black tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange rounded py-1 px-1 flex-shrink-0"
          aria-label="MarTechAdda — Home"
        >
          <img src="/logo.png" alt="MarTechAdda Logo" className="h-[38px] w-auto object-contain" />
          <span className="select-none">MarTechAdda</span>
        </Link>

        {/* ── Navigation Links (right-aligned) ── */}
        <nav
          className="hidden md:flex items-center ml-auto mr-2 md:mr-3"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ label, href, external }, index) => {
            const isActive = label === "Blog" && isBlogActive;

            const linkClass = `relative px-2 lg:px-3 py-1.5 text-[13.5px] rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange ${
              external
                ? "font-medium text-on-surface-variant hover:text-black hover:bg-black/[0.04]"
                : "font-semibold " + (isActive ? "text-action-orange" : "text-on-surface-variant hover:text-black hover:bg-black/[0.04]")
            }`;

            return (
              <React.Fragment key={label}>
                {external ? (
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                ) : (
                  <Link to={href} className={linkClass}>
                    {label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-action-orange rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                )}
                {/* Vertical separator between links */}
                <span className="w-[1px] h-3.5 bg-black/15 mx-1 lg:mx-1.5" aria-hidden="true" />
              </React.Fragment>
            );
          })}
        </nav>

        {/* ── Right Actions: Login / User Avatar ── */}
        <div className="flex items-center flex-shrink-0">
          <button
            className="md:hidden p-2 text-on-surface-variant hover:text-black focus:outline-none flex items-center justify-center rounded-md hover:bg-black/[0.04] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {!isAuthenticated ? (
            <button
              onClick={login}
              className="px-4 py-1.5 text-[13.5px] font-semibold text-on-surface-variant hover:text-black hover:bg-black/[0.04] rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange"
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar Button */}
              <button
                ref={avatarBtnRef}
                onClick={() => setDropdownOpen((o) => !o)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                aria-label={`User menu for ${user.name}`}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-black/[0.04] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange group"
              >
                {/* Avatar image or initials fallback */}
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-outline-variant/30 group-hover:border-action-orange/40 transition-all duration-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-action-orange text-white flex items-center justify-center text-[13px] font-bold select-none">
                    {user.initials}
                  </div>
                )}
                <span className="hidden lg:block text-[13.5px] font-medium text-on-surface-variant group-hover:text-black transition-colors">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-outline transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  role="menu"
                  aria-label="User account menu"
                  className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/[0.06] py-2 z-[100] overflow-hidden"
                  style={{ backdropFilter: "blur(12px)" }}
                >
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-outline-variant/15">
                    <p className="font-semibold text-[13px] text-primary leading-none">{user.name}</p>
                    <p className="text-[12px] text-on-surface-variant mt-1 font-light">{user.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      role="menuitem"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/saved");
                      }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium text-on-surface-variant hover:text-black hover:bg-black/[0.04] transition-colors duration-150 focus:outline-none focus-visible:bg-black/[0.06]"
                    >
                      <Bookmark size={18} fill="currentColor" className="text-action-orange" />
                      Saved Articles
                    </button>

                    <a
                      role="menuitem"
                      href="#"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium text-on-surface-variant hover:text-black hover:bg-black/[0.04] transition-colors duration-150 focus:outline-none focus-visible:bg-black/[0.06]"
                    >
                      <User size={18} className="text-outline" />
                      My Profile
                    </a>

                    <a
                      role="menuitem"
                      href="#"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium text-on-surface-variant hover:text-black hover:bg-black/[0.04] transition-colors duration-150 focus:outline-none focus-visible:bg-black/[0.06]"
                    >
                      <Settings size={18} className="text-outline" />
                      Settings
                    </a>
                  </div>

                  <div className="border-t border-outline-variant/15 py-1">
                    <button
                      role="menuitem"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium text-red-500 hover:bg-red-50 transition-colors duration-150 focus:outline-none focus-visible:bg-red-50"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[84px] left-0 w-full bg-white border-b border-black/[0.06] shadow-lg py-4 px-margin-mobile flex flex-col gap-2 z-40">
          {NAV_LINKS.map(({ label, href, external }) => {
            const isActive = label === "Blog" && isBlogActive;
            return external ? (
              <a
                key={label}
                href={href}
                className="px-4 py-3 rounded-lg text-[15px] font-medium text-on-surface-variant hover:bg-black/[0.04] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={href}
                className={`px-4 py-3 rounded-lg text-[15px] font-semibold transition-colors ${
                  isActive ? "text-action-orange bg-action-orange/10" : "text-on-surface-variant hover:bg-black/[0.04]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
