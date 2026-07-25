import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { SITE_SETTINGS } from "@/data/settings";
import { CATEGORIES } from "@/data/categories";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/shared/SocialIcons";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products" },
  { label: "Our Services", href: "/services" },
  { label: "Career", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const socials = [
  { icon: FacebookIcon, href: SITE_SETTINGS.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: SITE_SETTINGS.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: SITE_SETTINGS.social.linkedin, label: "LinkedIn" },
  { icon: YoutubeIcon, href: SITE_SETTINGS.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/images/logo.png" alt="Adrijen Healthcare" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="font-display text-lg font-bold">Adrijen Healthcare</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              A Panchkula-based pharmaceutical company supplying WHO-GMP manufactured medicines to
              distributors, wholesalers and chemists across India.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-teal-500/50 hover:text-teal-400"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Top Categories</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/products?category=${c.slug}`} className="text-white/70 transition-colors hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Reach Us</h3>
            <ul className="mt-4 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-teal-400" />
                {SITE_SETTINGS.address}
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-teal-400" />
                <a href={`tel:${SITE_SETTINGS.phoneTel}`} className="hover:text-white">
                  {SITE_SETTINGS.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-teal-400" />
                <a href={`mailto:${SITE_SETTINGS.email}`} className="hover:text-white">
                  {SITE_SETTINGS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-xs text-white/50 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-white/40">GST</p>
            <p className="mt-1 font-medium text-white/70">{SITE_SETTINGS.gst}</p>
          </div>
          <div>
            <p className="text-white/40">CIN</p>
            <p className="mt-1 font-medium text-white/70">{SITE_SETTINGS.cin}</p>
          </div>
          <div>
            <p className="text-white/40">Drug Licence (20B)</p>
            <p className="mt-1 font-medium text-white/70">{SITE_SETTINGS.dl20b}</p>
          </div>
          <div>
            <p className="text-white/40">Drug Licence (21B)</p>
            <p className="mt-1 font-medium text-white/70">{SITE_SETTINGS.dl21b}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Adrijen Healthcare Pvt. Ltd. All rights reserved.</p>
          <a href={SITE_SETTINGS.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white/70">
            View on Google Maps <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
