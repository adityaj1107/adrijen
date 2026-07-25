"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_SETTINGS } from "@/data/settings";
import { CATEGORIES } from "@/data/categories";
import { useEnquiry } from "./EnquiryContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products", mega: true },
  { label: "Our Services", href: "/services" },
  { label: "Career", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const { open } = useEnquiry();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-primary-950 text-white/80 lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE_SETTINGS.phoneTel}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5" /> {SITE_SETTINGS.phone}
            </a>
            <a href={`mailto:${SITE_SETTINGS.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5" /> {SITE_SETTINGS.email}
            </a>
          </div>
          <p className="tracking-wide text-white/60">WHO-GMP &amp; ISO 9001:2015 Certified Manufacturing</p>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "glass shadow-[0_4px_30px_-10px_rgba(15,23,42,0.15)]" : "bg-transparent"
        )}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center group" aria-label="Adrijen Healthcare — Home">
            <Image
              src="/images/logo-header.png"
              alt="Adrijen Healthcare Pvt. Ltd."
              width={140}
              height={140}
              priority
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 md:h-16"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              if (link.mega) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                        active ? "text-teal-600" : "text-ink-800 hover:text-teal-600"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Link>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="glass absolute left-1/2 top-full w-[640px] -translate-x-1/2 rounded-2xl border border-white/60 p-5 shadow-2xl"
                        >
                          <div className="grid grid-cols-3 gap-1">
                            {CATEGORIES.slice(0, 9).map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/products?category=${cat.slug}`}
                                className="rounded-xl px-3 py-2 text-sm text-ink-800 transition-colors hover:bg-teal-500/10 hover:text-teal-700"
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/products"
                            className="mt-3 flex items-center justify-between rounded-xl bg-primary-700/5 px-4 py-3 text-sm font-semibold text-primary-800 hover:bg-primary-700/10"
                          >
                            View full catalogue — 157 formulations
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    active ? "text-teal-600" : "text-ink-800 hover:text-teal-600"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={open}
              className="hidden items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-700/25 transition-all hover:-translate-y-0.5 hover:bg-primary-800 md:inline-flex"
            >
              Quick Enquiry <Send className="h-3.5 w-3.5" />
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-950/10 text-ink-800 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-20 z-40 overflow-hidden border-b border-ink-950/10 bg-white shadow-lg lg:hidden"
          >
            <nav className="container-x flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink-800 hover:bg-teal-500/10"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  open();
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white"
              >
                Quick Enquiry <Send className="h-3.5 w-3.5" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
