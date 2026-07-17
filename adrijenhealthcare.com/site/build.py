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

# ---------- Shared <head> snippet (per-page title/desc/canonical injected) ----------
HEAD_TEMPLATE = """<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>{title}</title>
<meta name="description" content="{description}" />
<meta name="theme-color" content="#1d7e62" />
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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />

<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {{
    theme: {{
      extend: {{
        colors: {{
          brand: {{50:'#effaf6',100:'#d8f2e7',200:'#b3e5d2',300:'#82d1b6',400:'#4cb795',500:'#2a9d7a',600:'#1d7e62',700:'#186551',800:'#155142',900:'#114338'}},
          ink:   {{100:'#e6edf2',300:'#8aa1b3',500:'#4a6478',700:'#1f3a4d',900:'#0b1d2a'}}
        }},
        fontFamily: {{
          sans:    ['Inter','system-ui','sans-serif'],
          display: ['"Plus Jakarta Sans"','Inter','sans-serif']
        }}
      }}
    }}
  }};
</script>

<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
<script src="https://unpkg.com/lucide@latest"></script>
<link rel="stylesheet" href="/css/styles.css" />
"""

HEADER = """<header class="site-header">
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
      <a href="/contact.html" class="hidden md:inline-flex btn btn-primary">Become a Distributor <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
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
    <a href="/contact.html" class="btn btn-primary justify-center mt-2">Become a Distributor</a>
  </div>
</div>"""

FOOTER = """<footer class="site-footer pt-16">
  <div class="container-x grid md:grid-cols-2 lg:grid-cols-4 gap-10">
    <div>
      <a href="/" class="inline-flex items-center" aria-label="Adrijen Healthcare Pvt. Ltd. — Home">
        <span class="bg-white rounded-2xl p-3 shadow-lg shadow-black/20">
          <img src="/images/logo-header.png" alt="Adrijen Healthcare Pvt. Ltd." class="h-16 w-auto block" />
        </span>
      </a>
      <p class="mt-4 text-sm leading-relaxed">A Panchkula-based PCD pharma company supplying WHO-GMP manufactured medicines to distributors, wholesalers and chemists across India.</p>
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
        <li class="flex gap-3"><i data-lucide="map-pin" class="w-4 h-4 mt-1 text-brand-300"></i><span>Corporate Office<br/>Industrial Area Phase 1,<br/>Panchkula, Haryana, India</span></li>
        <li class="flex gap-3"><i data-lucide="phone" class="w-4 h-4 mt-1 text-brand-300"></i><a href="tel:+910000000000">+91-00000-00000</a></li>
        <li class="flex gap-3"><i data-lucide="mail" class="w-4 h-4 mt-1 text-brand-300"></i><a href="mailto:info@adrijenhealthcare.com">info@adrijenhealthcare.com</a></li>
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
        + HEADER
        + "\n"
        + body_html
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
