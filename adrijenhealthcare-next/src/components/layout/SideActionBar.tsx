"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Send, ArrowUp } from "lucide-react";
import { SITE_SETTINGS, whatsappUrl } from "@/data/settings";
import { useEnquiry } from "./EnquiryContext";

function ActionButton({
  icon: Icon,
  label,
  href,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-700 text-white shadow-lg shadow-primary-900/30 transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </span>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full glass px-3.5 py-2 text-xs font-semibold text-ink-950 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:mr-4">
        {label}
      </span>
    </>
  );

  const className = "group relative flex items-center";

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={className} aria-label={label}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={className} aria-label={label}>
      {content}
    </button>
  );
}

export function SideActionBar() {
  const { open } = useEnquiry();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop: right-edge floating pill rail */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        <ActionButton icon={Phone} label="Call Us Today" href={`tel:${SITE_SETTINGS.phoneTel}`} />
        <ActionButton icon={MessageCircle} label="Chat on WhatsApp" href={whatsappUrl()} />
        <ActionButton icon={Send} label="Quick Enquiry" onClick={open} />
        <AnimatePresence>
          {showTop && (
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
              <ActionButton icon={ArrowUp} label="Back to Top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: bottom action bar */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/40 lg:hidden">
        <a href={`tel:${SITE_SETTINGS.phoneTel}`} className="flex flex-col items-center gap-1 py-3 text-primary-800">
          <Phone className="h-5 w-5" />
          <span className="text-[11px] font-medium">Call</span>
        </a>
        <button onClick={open} className="flex flex-col items-center gap-1 border-x border-ink-950/10 py-3 text-primary-800">
          <Send className="h-5 w-5" />
          <span className="text-[11px] font-medium">Enquiry</span>
        </button>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 text-primary-800">
          <MessageCircle className="h-5 w-5" />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
      </div>
    </>
  );
}
