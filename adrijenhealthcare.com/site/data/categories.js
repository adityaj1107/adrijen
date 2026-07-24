/* Adrijen Healthcare — product category showcase (marketing grid on Home/Products).
   `image` points to real Adrijen pack-shot photography (images/products/) —
   one representative product per category. Where we don't yet have a
   photographed product for a category, `image` is null and `icon` (a
   lucide icon name, matching the vocabulary already used per-product in
   data/products.js) is used instead — see the icon-tile fallback in
   js/main.js. Do not swap these back for generic stock photos: an earlier
   pass used unrelated Unsplash placeholders and several didn't match the
   category at all (e.g. "Eye Drops" showed a cup of capsules, "Dental
   Care" showed a body-lotion tube) — some even carried a competitor's
   visible brand name. Real photos or icons only from here on.
   Note: this 13-category marketing list mirrors our sister brand Pykon's
   structure. Our full, real 20-category product catalogue (data/products.js)
   is more detailed — this file is the curated homepage/nav display layer. */
window.CATEGORIES = [
  {
    name: "Tablets",
    slug: "tablets",
    image: "/images/products/cephodri-200dt-tab.jpg",
    description: "Antibiotic, analgesic, cardio-diabetic and general-use tablets across 48+ formulations."
  },
  {
    name: "Capsules",
    slug: "capsules",
    image: "/images/products/becodri-b-cap.jpg",
    description: "Multivitamin, antioxidant, probiotic and soft-gel capsules for everyday and specialty care."
  },
  {
    name: "Syrups",
    slug: "syrups",
    image: "/images/products/adricuff-a-syrup.jpg",
    description: "Cough, cold, hematinic and multivitamin syrups in palatable, ready-to-dispense formats."
  },
  {
    name: "Injections",
    slug: "injections",
    image: "/images/products/adricef-500-inj.jpg",
    description: "Critical-care, anti-infective and vitamin injectables manufactured under sterile conditions."
  },
  {
    name: "Derma Products",
    slug: "derma-products",
    image: "/images/products/dermidri-oint.jpg",
    description: "Ointments, gels and creams for fungal, bacterial and inflammatory skin conditions."
  },
  {
    name: "Dental Care",
    slug: "dental-care",
    image: null,
    icon: "smile",
    description: "Toothpaste, mouthwash and oral gels for sensitivity, gum care and germicidal use."
  },
  {
    name: "Drops",
    slug: "drops",
    image: "/images/products/multivitdri-drops.jpg",
    description: "Paediatric and general oral drops — vitamin D3, multivitamin and colic-relief formats."
  },
  {
    name: "Eye Drops",
    slug: "eye-drops",
    image: null,
    icon: "eye",
    description: "Antibiotic, anti-inflammatory and lubricating ophthalmic solutions."
  },
  {
    name: "Energy Drink / ORS",
    slug: "energy-drink-ors",
    image: null,
    icon: "zap",
    description: "Instant energy and rehydration powders for active patients and recovery care."
  },
  {
    name: "Oils",
    slug: "oils",
    image: "/images/products/adrijen-pain-relief-oil.jpg",
    description: "Ayurvedic pain-relief and massage oils in clear, leak-proof packaging."
  },
  {
    name: "Paediatric",
    slug: "paediatric",
    image: "/images/products/mefadri-p-forte-susp.jpg",
    description: "Suspensions, drops and DT tablets formulated and dosed specifically for children."
  },
  {
    name: "Protein Powder",
    slug: "protein-powder",
    image: null,
    icon: "dumbbell",
    description: "Flavoured protein blends for nutritional support and muscle recovery."
  },
  {
    name: "Nano Shots / Sachets",
    slug: "nano-shots-sachets",
    image: null,
    icon: "package",
    description: "Single-dose nutritional and immunity shots in convenient sachet packs."
  }
];
