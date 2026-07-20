/* Adrijen Healthcare — product category showcase (marketing grid on Home/Products).
   Swap `image` for real product photography whenever it's ready — these are
   temporary Unsplash placeholders (direct CDN URLs, verified reachable at
   time of writing). Keep the same field names when you replace them.
   Note: this 13-category marketing list mirrors our sister brand Pykon's
   structure. Our full, real 20-category product catalogue (data/products.js)
   is more detailed — this file is the curated homepage/nav display layer. */
window.CATEGORIES = [
  {
    name: "Tablets",
    slug: "tablets",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=75&auto=format&fit=crop",
    description: "Antibiotic, analgesic, cardio-diabetic and general-use tablets across 48+ formulations."
  },
  {
    name: "Capsules",
    slug: "capsules",
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=75&auto=format&fit=crop",
    description: "Multivitamin, antioxidant, probiotic and soft-gel capsules for everyday and specialty care."
  },
  {
    name: "Syrups",
    slug: "syrups",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=75&auto=format&fit=crop",
    description: "Cough, cold, hematinic and multivitamin syrups in palatable, ready-to-dispense formats."
  },
  {
    name: "Injections",
    slug: "injections",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=75&auto=format&fit=crop",
    description: "Critical-care, anti-infective and vitamin injectables manufactured under sterile conditions."
  },
  {
    name: "Derma Products",
    slug: "derma-products",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=75&auto=format&fit=crop",
    description: "Ointments, gels and creams for fungal, bacterial and inflammatory skin conditions."
  },
  {
    name: "Dental Care",
    slug: "dental-care",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=75&auto=format&fit=crop",
    description: "Toothpaste, mouthwash and oral gels for sensitivity, gum care and germicidal use."
  },
  {
    name: "Drops",
    slug: "drops",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=75&auto=format&fit=crop",
    description: "Paediatric and general oral drops — vitamin D3, multivitamin and colic-relief formats."
  },
  {
    name: "Eye Drops",
    slug: "eye-drops",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&q=75&auto=format&fit=crop",
    description: "Antibiotic, anti-inflammatory and lubricating ophthalmic solutions."
  },
  {
    name: "Energy Drink / ORS",
    slug: "energy-drink-ors",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=75&auto=format&fit=crop",
    description: "Instant energy and rehydration powders for active patients and recovery care."
  },
  {
    name: "Oils",
    slug: "oils",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=75&auto=format&fit=crop",
    description: "Ayurvedic pain-relief and massage oils in clear, leak-proof packaging."
  },
  {
    name: "Paediatric",
    slug: "paediatric",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=75&auto=format&fit=crop",
    description: "Suspensions, drops and DT tablets formulated and dosed specifically for children."
  },
  {
    name: "Protein Powder",
    slug: "protein-powder",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=75&auto=format&fit=crop",
    description: "Flavoured protein blends for nutritional support and muscle recovery."
  },
  {
    name: "Nano Shots / Sachets",
    slug: "nano-shots-sachets",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&q=75&auto=format&fit=crop",
    description: "Single-dose nutritional and immunity shots in convenient sachet packs."
  }
];
