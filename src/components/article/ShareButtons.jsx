import React, { useState } from "react";
import Button from "../ui/Button";
import Toast from "../ui/Toast";
import { Share2, Twitter, MessageCircle, Mail, Copy } from "lucide-react";
import { copyToClipboard } from "../../utils/copyToClipboard";

export default function ShareButtons({ title, slug }) {
  const [showToast, setShowToast] = useState(false);
  const articleUrl = `${window.location.origin}/blog/${slug}`;

  const handleShare = async (platform) => {
    let shareUrl = "";

    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer");
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(articleUrl)}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer");
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + articleUrl)}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer");
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent("I thought you might find this article interesting: " + articleUrl)}`;
        window.location.href = shareUrl;
        break;
      case "copy":
        const copied = await copyToClipboard(articleUrl);
        if (copied) {
          setShowToast(true);
        }
        break;
      default:
        break;
    }
  };

  const shareItems = [
    { id: "linkedin", label: "LinkedIn", Icon: Share2, tooltip: "Share on LinkedIn" },
    { id: "x", label: "X / Twitter", Icon: Twitter, tooltip: "Share on X" },
    { id: "whatsapp", label: "WhatsApp", Icon: MessageCircle, tooltip: "Share on WhatsApp" },
    { id: "email", label: "Email", Icon: Mail, tooltip: "Share via Email" },
    { id: "copy", label: "Copy Link", Icon: Copy, tooltip: "Copy article link" }
  ];

  return (
    <div className="w-full">
      {/* Desktop Sticky Share actions (aligned right in page container) */}
      <div className="hidden lg:block sticky top-28 self-start text-right pl-4">
        <h4 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-6 font-bold select-none">
          Share
        </h4>
        <div className="flex flex-col gap-3 items-end">
          {shareItems.map((item) => (
            <Button
              key={item.id}
              variant="icon"
              onClick={() => handleShare(item.id)}
              className="w-10 h-10 border border-outline-variant/30 text-on-surface-variant hover:text-white hover:bg-action-orange transition-colors flex items-center justify-center rounded-full bg-surface-alt focus-visible:ring-2 focus-visible:ring-action-orange shadow-sm"
              ariaLabel={item.tooltip}
            >
              <item.Icon size={18} className="select-none" />
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Share actions */}
      <div className="lg:hidden flex flex-col items-start gap-4 p-stack-sm bg-surface-container/30 rounded-xl border border-outline-variant/10 my-stack-md text-left">
        <span className="font-bold text-label-md uppercase tracking-wider text-on-surface-variant select-none">
          Share this article
        </span>
        <div className="flex flex-wrap gap-2.5">
          {shareItems.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              onClick={() => handleShare(item.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 border border-outline-variant/35 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container-high transition-colors focus-visible:ring-2 focus-visible:ring-action-orange"
              ariaLabel={item.tooltip}
            >
              <item.Icon size={16} className="select-none" />
              <span className="text-label-sm">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <Toast
        message="Link copied to clipboard!"
        type="success"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
