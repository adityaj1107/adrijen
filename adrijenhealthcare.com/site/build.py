#!/usr/bin/env python3
"""Adrijen Healthcare static site builder.

Reads page-content fragments from `pages/` and writes complete HTML
files into the site root, sharing one common <head>, header and footer.

Run:  python3 build.py
"""
from pathlib import Path
import re

ROOT = Path(__file__).parent
PAGES_DIR = ROOT / "pages"
OUT_DIR = ROOT  # write final HTML next to css/, js/

CONTACT = {
    "phone_display": "+91-8909392600",
    "phone_tel": "+918909392600",
    "whatsapp": "918909392600",
    "email": "md@adrijenhealthcare.com",
    "address_line1": "Plot No. 115, Industrial Area Phase-1,",
    "address_line2": "Panchkula, Haryana, India — 134113",
    "maps_query": "Adrijen+Healthcare+Pvt+Ltd,+Plot+No+115,+Industrial+Area+Phase+1,+Panchkula,+Haryana+134113",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Adrijen+Healthcare+Pvt+Ltd+Plot+No+115+Industrial+Area+Phase+1+Panchkula+Haryana+134113",
    "gst": "06AABCN7847E1ZF",
    "cin": "U21002PB2003PTC026377",
    "dl_20b": "WLF20B2026HR001104",
    "dl_21b": "WLF21B2026HR001102",
    "footer_blurb": (
        "A Panchkula-based PCD pharma company supplying WHO-GMP manufactured "
        "medicines to distributors, wholesalers and chemists across India."
    ),
}

WHATSAPP_TEXT = "Hello Adrijen Healthcare, I would like to know more about your products and PCD franchise opportunities."
WHATSAPP_URL = f"https://wa.me/{CONTACT['whatsapp']}?text=Hello%20Adrijen%20Healthcare%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20PCD%20franchise%20opportunities."

WHATSAPP_FLOAT = f"""<a href="{WHATSAPP_URL}" target="_blank" rel="noopener" class="whatsapp-float" aria-label="Chat with us on WhatsApp">
  <i data-lucide="message-circle"></i>
  <span class="whatsapp-tooltip">Chat with us on WhatsApp</span>
</a>
<button data-back-to-top class="back-to-top" aria-label="Back to top">
  <i data-lucide="arrow-up" class="w-5 h-5"></i>
</button>"""

SCROLL_PROGRESS = """<div class="scroll-progress"><div class="scroll-progress-bar" data-scroll-progress></div></div>"""

LOADING_SCREEN = """<div id="loadingScreen" class="loading-screen">
  <img src="/images/logo.png" alt="Adrijen Healthcare" class="loading-screen-logo" width="72" height="72" />
  <div class="loading-screen-bar"><span></span></div>
</div>
<script>
  if (sessionStorage.getItem('adrijenLoaded')) {
    document.documentElement.classList.add('no-loading-screen');
  }
</script>"""

COOKIE_BANNER = """<div class="cookie-banner" data-cookie-banner aria-hidden="true">
  <p>We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies.</p>
  <button type="button" class="btn btn-gold" data-cookie-accept>Accept</button>
</div>"""

# ---------- Shared <head> snippet (per-page title/desc/canonical injected) ----------
HEAD_TEMPLATE = """<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>{title}</title>
<meta name="description" content="{description}" />
<meta name="theme-color" content="#003366" />
<link rel="canonical" href="https://adrijenhealthcare.com{canonical}" />

<meta property="og:type" content="website" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:url" content="https://adrijenhealthcare.com{canonical}" />
<meta property="og:image" content="https://adrijenhealthcare.com/images/og.png" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="/favicon.ico?v=3" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png?v=3" />
<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png?v=3" />
<link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192.png?v=3" />
<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png?v=3" />
<link rel="manifest" href="/site.webmanifest?v=3" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800;900&display=swap" rel="stylesheet" />

<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {{
    theme: {{
      extend: {{
        colors: {{
          brand: {{50:'#eef3f8',100:'#d9e4f0',200:'#b3c9e1',300:'#82a6cb',400:'#4d7cae',500:'#2c5990',600:'#1a4372',700:'#003366',800:'#002a54',900:'#001f3d'}},
          gold:  {{50:'#fdf8ec',100:'#f9edc9',200:'#f3dd93',300:'#e9c766',400:'#ddb44a',500:'#d4af37',600:'#b8912a',700:'#8f6f20',800:'#6b5318',900:'#4a3910'}},
          ink:   {{100:'#e7ebf1',300:'#8b96a8',500:'#4d5b70',700:'#1e2938',900:'#0a121e'}}
        }},
        fontFamily: {{
          sans:    ['Inter','system-ui','sans-serif'],
          display: ['"Playfair Display"','Georgia','serif']
        }}
      }}
    }}
  }};
</script>

<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
<script src="https://unpkg.com/lucide@latest"></script>
<link rel="stylesheet" href="/css/styles.css" />
<script src="/js/data/settings.js"></script>
"""

HEADER = f"""<div class="contact-bar">
  <div class="container-x flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
    <span class="flex items-center gap-2 font-medium"><span class="live-dot" aria-hidden="true"></span> Now onboarding distributors — pan-India dispatch active</span>
    <div class="flex flex-wrap items-center gap-x-5 gap-y-1">
      <a href="tel:{CONTACT['phone_tel']}" class="inline-flex items-center gap-1.5 hover:text-brand-100 transition-colors"><i data-lucide="phone" class="w-3.5 h-3.5"></i> {CONTACT['phone_display']}</a>
      <a href="mailto:{CONTACT['email']}" class="inline-flex items-center gap-1.5 hover:text-brand-100 transition-colors"><i data-lucide="mail" class="w-3.5 h-3.5"></i> {CONTACT['email']}</a>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="container-x flex items-center justify-between py-4">
    <a href="/" class="flex items-center group" aria-label="Adrijen Healthcare Pvt. Ltd. — Home">
      <img src="/images/logo-header.png" alt="Adrijen Healthcare Pvt. Ltd." class="h-14 w-auto md:h-16 transition-transform duration-300 group-hover:scale-105" width="64" height="64" />
    </a>
    <nav class="hidden lg:flex items-center gap-7">
      <a class="nav-link" data-nav="index.html" href="/">Home</a>
      <a class="nav-link" data-nav="about.html" href="/about.html">About&nbsp;Us</a>
      <a class="nav-link" data-nav="products.html" href="/products.html">Our&nbsp;Products</a>
      <a class="nav-link" data-nav="services.html" href="/services.html">Our&nbsp;Services</a>
      <a class="nav-link" data-nav="careers.html" href="/careers.html">Career</a>
      <a class="nav-link" data-nav="blog.html" href="/blog.html">Blog</a>
      <a class="nav-link" data-nav="contact.html" href="/contact.html">Contact&nbsp;Us</a>
    </nav>
    <div class="flex items-center gap-2">
      <a href="{WHATSAPP_URL}" target="_blank" rel="noopener" class="hidden md:inline-flex btn btn-gold">Get a Quote <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
      <button id="menuOpen" class="lg:hidden p-2 rounded-xl border border-ink-100" aria-label="Open menu">
        <i data-lucide="menu" class="w-6 h-6 text-ink-900"></i>
      </button>
    </div>
  </div>
</header>

<div id="mobileMenu" class="mobile-menu lg:hidden" aria-hidden="true">
  <div class="mobile-menu-panel">
    <div class="flex items-center justify-between mb-2">
      <span class="font-display font-extrabold text-ink-900 text-lg">Menu</span>
      <button id="menuClose" class="p-2 rounded-xl border border-ink-100" aria-label="Close menu"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
    <a href="/">Home</a>
    <a href="/about.html">About Us</a>
    <a href="/products.html">Our Products</a>
    <a href="/services.html">Our Services</a>
    <a href="/careers.html">Career</a>
    <a href="/blog.html">Blog</a>
    <a href="/contact.html">Contact Us</a>
    <a href="{WHATSAPP_URL}" target="_blank" rel="noopener" class="btn btn-gold justify-center mt-2">Get a Quote</a>
  </div>
</div>"""

FOOTER = f"""<footer class="site-footer pt-16">
  <div class="container-x grid md:grid-cols-2 lg:grid-cols-4 gap-10">
    <div>
      <a href="/" class="inline-flex items-center" aria-label="Adrijen Healthcare Pvt. Ltd. — Home">
        <span class="bg-white rounded-2xl p-3 shadow-lg shadow-black/20">
          <img src="/images/logo-header.png" alt="Adrijen Healthcare Pvt. Ltd." class="h-16 w-auto block" />
        </span>
      </a>
      <p class="mt-4 text-sm leading-relaxed">{CONTACT['footer_blurb']}</p>
      <div class="flex gap-2 mt-5">
        <a href="#" class="social" aria-label="Facebook"><i data-lucide="facebook" class="w-4 h-4"></i></a>
        <a href="#" class="social" aria-label="Instagram"><i data-lucide="instagram" class="w-4 h-4"></i></a>
        <a href="#" class="social" aria-label="LinkedIn"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
        <a href="#" class="social" aria-label="YouTube"><i data-lucide="youtube" class="w-4 h-4"></i></a>
      </div>
    </div>
    <div>
      <h4>Quick Links</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/about.html">About Us</a></li>
        <li><a href="/products.html">Our Products</a></li>
        <li><a href="/services.html">Our Services</a></li>
        <li><a href="/careers.html">Career</a></li>
        <li><a href="/blog.html">Blog</a></li>
        <li><a href="/contact.html">Contact Us</a></li>
      </ul>
    </div>
    <div>
      <h4>Top Categories</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/products.html">Tablets &amp; Capsules</a></li>
        <li><a href="/products.html">Syrups &amp; Suspensions</a></li>
        <li><a href="/products.html">Injectables</a></li>
        <li><a href="/products.html">Nutraceuticals</a></li>
        <li><a href="/products.html">Dermatology Range</a></li>
        <li><a href="/products.html">Pediatric Range</a></li>
      </ul>
    </div>
    <div>
      <h4>Reach Us</h4>
      <ul class="space-y-3 text-sm">
        <li class="flex gap-3"><i data-lucide="map-pin" class="w-4 h-4 mt-1 text-brand-300"></i><span>Corporate Office<br/>{CONTACT['address_line1']}<br/>{CONTACT['address_line2'].replace(' — ', ' ')}</span></li>
        <li class="flex gap-3"><i data-lucide="phone" class="w-4 h-4 mt-1 text-brand-300"></i><a href="tel:{CONTACT['phone_tel']}">{CONTACT['phone_display']}</a></li>
        <li class="flex gap-3"><i data-lucide="mail" class="w-4 h-4 mt-1 text-brand-300"></i><a href="mailto:{CONTACT['email']}">{CONTACT['email']}</a></li>
      </ul>
    </div>
  </div>
  <div class="container-x mt-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
    <p>© <span id="year"></span> Adrijen Healthcare. All rights reserved.</p>
    <p>Designed for healthcare excellence • <a href="#" class="hover:text-white">Privacy</a> • <a href="#" class="hover:text-white">Terms</a></p>
  </div>
</footer>

<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script src="/js/main.js" defer></script>
</body>
</html>
"""


def assemble(meta_block: str, body_html: str) -> str:
    """meta_block is the first front-matter style block in the page fragment."""
    meta = {}
    for line in meta_block.strip().splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    head = HEAD_TEMPLATE.format(
        title=meta.get("title", "Adrijen Healthcare"),
        description=meta.get("description", ""),
        canonical=meta.get("canonical", "/"),
    )
    return (
        "<!doctype html>\n<html lang=\"en\">\n<head>\n"
        + head
        + "\n</head>\n<body>\n"
        + LOADING_SCREEN
        + "\n"
        + SCROLL_PROGRESS
        + "\n"
        + HEADER
        + "\n"
        + body_html
        + "\n"
        + WHATSAPP_FLOAT
        + "\n"
        + COOKIE_BANNER
        + "\n"
        + FOOTER
    )


def build():
    if not PAGES_DIR.exists():
        print("No pages/ directory. Nothing to do.")
        return
    for src in sorted(PAGES_DIR.glob("*.html")):
        text = src.read_text(encoding="utf-8")
        m = re.match(r"---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
        if not m:
            print(f"  ! {src.name}: missing --- front-matter, skipping")
            continue
        meta_block = m.group(1)
        body = text[m.end():]
        out_name = src.name  # same filename
        (OUT_DIR / out_name).write_text(assemble(meta_block, body), encoding="utf-8")
        print(f"  ✓ built {out_name}")


if __name__ == "__main__":
    build()
