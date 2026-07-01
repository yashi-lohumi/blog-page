import React, { useState } from "react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { copyToClipboard } from "../../utils/copyToClipboard";
import Toast from "../ui/Toast";
import Button from "../ui/Button";
import { List, ChevronDown } from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────
export function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Real brand SVG icons ────────────────────────────────────────────────────
function LinkedInIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}


function LinkIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

// ─── Share panel (used below TOC) ────────────────────────────────────────────
function SharePanel({ title, slug }) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const articleUrl = `${window.location.origin}/blog/${slug}`;

  const handleShare = async (platform) => {
    switch (platform) {
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`, "_blank", "noopener,noreferrer");
        break;
      case "x":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(articleUrl)}`, "_blank", "noopener,noreferrer");
        break;
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " – " + articleUrl)}`, "_blank", "noopener,noreferrer");
        break;
      case "copy":
        const ok = await copyToClipboard(articleUrl);
        if (ok) {
          setCopied(true);
          setShowToast(true);
          setTimeout(() => setCopied(false), 2500);
        }
        break;
    }
  };

  const shareItems = [
    { id: "linkedin", label: "LinkedIn",    Icon: LinkedInIcon,  color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5" },
    { id: "x",        label: "X (Twitter)", Icon: XIcon,         color: "hover:text-black hover:border-black/30 hover:bg-black/5" },
    { id: "whatsapp", label: "WhatsApp",    Icon: WhatsAppIcon,  color: "hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5" },
    { id: "copy",     label: copied ? "Copied!" : "Copy Link", Icon: LinkIcon, color: copied ? "text-green-600 border-green-400/40 bg-green-50" : "hover:text-primary hover:border-outline-variant hover:bg-surface-container-low" },
  ];

  return (
    <>
      <div className="mt-6 pt-5 border-t border-outline-variant/20">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3 select-none">
          Share with your network
        </p>
        <div className="flex gap-2 flex-wrap">
          {shareItems.map(({ id, label, Icon, color }) => (
            <button
              key={id}
              onClick={() => handleShare(id)}
              title={label}
              aria-label={`Share on ${label}`}
              className={`w-9 h-9 rounded-xl border border-outline-variant/25 bg-surface-container-low/60 text-on-surface-variant flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-action-orange ${color}`}
            >
              <Icon className="w-[15px] h-[15px]" />
            </button>
          ))}
        </div>
      </div>

      <Toast
        message="Link copied to clipboard!"
        type="success"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}

// ─── Main TOC + Share (sticky left column) ───────────────────────────────────
export default function TableOfContents({ contentBlocks = [], title = "", slug = "" }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const headings = contentBlocks
    .filter((block) => block.type === "h2")
    .map((block) => ({ text: block.text, id: slugify(block.text) }));

  const headingIds = headings.map((h) => `#${h.id}`);
  const activeId = useScrollSpy(headingIds);

  const handleScrollTo = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpenMobile(false);
    }
  };

  const renderLinks = () =>
    headings.length > 0 ? (
      <ul className="space-y-0.5" role="list" aria-label="Table of Contents">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleScrollTo(h.id, e)}
                className={`block text-[12.5px] transition-all duration-200 border-l-2 pl-3 py-1.5 leading-snug focus:outline-none focus-visible:ring-1 focus-visible:ring-action-orange rounded-r ${
                  isActive
                    ? "text-action-orange font-semibold border-action-orange"
                    : "text-on-surface-variant/70 border-transparent hover:text-primary hover:border-outline-variant"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    ) : null;

  return (
    <div className="w-full h-full">
      {/* ── Mobile collapsible ── */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsOpenMobile((p) => !p)}
          className="w-full flex justify-between items-center px-4 py-2.5 border border-outline-variant/30 text-primary focus-visible:ring-action-orange"
          aria-expanded={isOpenMobile}
          aria-controls="mobile-toc"
        >
          <span className="flex items-center gap-2 font-bold text-label-md">
            <List size={18} className="select-none" />
            Contents
          </span>
          <ChevronDown
            size={20}
            className="select-none transition-transform duration-200"
            style={{ transform: isOpenMobile ? "rotate(180deg)" : "none" }}
          />
        </Button>
        {isOpenMobile && (
          <div id="mobile-toc" className="p-4 bg-surface-container rounded-lg border border-outline-variant/20 mt-2">
            {renderLinks()}
          </div>
        )}
      </div>

      {/* ── Desktop sticky panel ── */}
      <div className="hidden lg:block sticky top-[100px] self-start max-h-[calc(100vh-120px)] overflow-y-auto">
        {/* TOC + Share card */}
        {headings.length > 0 && (
          <nav className="bg-surface-container-low/50 rounded-xl border border-outline-variant/15 p-4" aria-label="Table of Contents">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3 select-none">
              In This Article
            </p>
            {renderLinks()}

            {/* Share panel — embedded below TOC links */}
            {slug && <SharePanel title={title} slug={slug} />}
          </nav>
        )}
      </div>
    </div>
  );
}
