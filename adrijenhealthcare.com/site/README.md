# Adrijen Healthcare Website — Editor's Guide

Static site: HTML5 / CSS3 / vanilla JS, no build step. Upload the contents of
this `site/` folder directly via cPanel File Manager to Harbinger hosting.

## What to edit for common updates

All frequently-changing content lives in `/data/*.js` as plain JavaScript
arrays/objects (`window.SOMETHING = [...]`). Edit these — never the page
HTML — to update content. No price field exists anywhere in `products.js`
by design; do not add one.

| To change...                          | Edit this file                          |
|----------------------------------------|------------------------------------------|
| Company phone/WhatsApp/email/address   | `data/settings.js`                        |
| Homepage hero carousel slides          | `data/slides.js`                          |
| Product category tiles/images (Home)   | `data/categories.js`                      |
| Product catalogue (157 products)       | `data/products.js`                        |
| Blog posts                             | `data/blogs.js`                           |
| Job openings                           | `data/careers.js`                         |
| Downloadable product list PDF          | `assets/docs/Adrijen-Product-List.pdf`    |

### Adding a product
Add an object to the array in `data/products.js`:
```js
{
  id: 158,
  name: "PRODUCT NAME",
  category: "Tablets",          // must match an existing category label
  categorySlug: "tablets",       // used for the filter tabs on Products page
  icon: "pill",                  // Lucide icon shown when no photo exists
  composition: "ACTIVE INGREDIENT MG",
  pack: "Pack type | Pack size",
  image: "/images/products/your-photo.jpg"   // or null — do NOT add a price key
}
```
The Products page (`pages/products.html`) is pre-rendered from this same
data at build time for SEO — see "Rebuilding" below whenever you edit
`data/products.js` or `data/careers.js`/`data/blogs.js`, since those two
pages are also pre-rendered from their data files for the same reason.

### Regenerating the product list PDF
The PDF at `assets/docs/Adrijen-Product-List.pdf` is generated from
`data/products.js` via a Python script (`reportlab`) — regenerate it
whenever products change so the download stays in sync. Columns are fixed
at S.No | Product Name | Composition | Pack Size | Category — no price
column should ever be added.

## Rebuilding after a data change

Pages under `pages/*.html` are fragments; `build.py` wraps them with the
shared header/footer/side-widget and writes the final files into the site
root (`about.html`, `products.html`, etc). `index.html` is the one page
that is hand-authored at the root (not templated) — when you change global
things like phone number, colors, or the footer, update both `build.py`
and `index.html` to keep them in sync (see the top of `build.py` for the
`CONTACT` dict which drives most of the templated pages).

Run this after any content or template change:
```
python3 build.py
```

## After changing CSS or JS — bump the cache version

`.htaccess` caches `.css`/`.js` files in the visitor's browser for **one
month**. Every asset URL therefore carries a `?v=N` query string
(e.g. `/css/styles.css?v=3`) so that a version bump forces browsers to
fetch the new file instead of silently reusing the month-old cached copy —
without this, a real fix can look like "it's still not working" simply
because the visitor's browser never re-downloaded it.

Whenever you edit `css/styles.css`, `js/main.js`, `js/carousel.js`, or any
`data/*.js` file:
1. Bump `ASSET_VERSION` at the top of `build.py`.
2. Also bump the matching `?v=` query strings by hand in `index.html`
   (it is not built from `build.py` — see below) and in the `<script>` tags
   at the top of `pages/products.html`, `pages/blog.html` and
   `pages/careers.html`.
3. Run `python3 build.py` again.

## Design tokens

Colors and fonts are defined in two places that must be kept in sync:
`build.py` (Tailwind config in `HEAD_TEMPLATE`, used by all templated
pages) and `index.html`'s own inline copy, plus CSS custom properties at
the top of `css/styles.css`. Current palette: primary green `#1b7a5a`,
charcoal `#0f2a22`, gold accent `#c9a227`, soft mint `#eaf5f0`.

## Key architecture notes

- **No pricing anywhere.** By design, per the current brief: no price/MRP/
  rate fields, no cart, no checkout. Every "buy" action is a WhatsApp
  enquiry or the no-price PDF download. Keep it this way.
- **Hero carousel** (`js/carousel.js` + `data/slides.js`) never crops —
  images use `object-fit: contain` inside a fixed-aspect, brand-colored
  letterboxed frame, with separate desktop/mobile image crops per slide.
- **Category images** (`data/categories.js`) currently use temporary
  Unsplash placeholder photos, clearly commented in that file — swap for
  real product/facility photography when available, keeping the same
  field names.
- **Sticky side widget** (Call / WhatsApp / Download List / Enquiry) and
  the **mobile bottom action bar** are injected site-wide from `build.py`
  and duplicated by hand in `index.html`.
