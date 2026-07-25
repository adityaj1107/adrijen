import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { ProductsClient } from "@/components/products/ProductsClient";
import { JsonLd } from "@/components/shared/JsonLd";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Our Products — Adrijen Healthcare",
  description:
    "Browse 157+ WHO-GMP manufactured formulations across 20 product categories — tablets, capsules, syrups, injectables, derma, dental and nutraceuticals.",
};

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      category: p.category,
      description: p.composition,
      ...(p.image ? { image: `https://adrijenhealthcare.com${p.image}` } : {}),
      brand: { "@type": "Brand", name: "Adrijen Healthcare" },
    },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={productListSchema} />
      <PageHero
        eyebrow="Our Products"
        title="157 formulations across 20 categories."
        description="Every product is manufactured and batch-tested in WHO-GMP and ISO 9001:2015 certified facilities. Pricing shared on enquiry."
      />
      <Suspense fallback={null}>
        <ProductsClient />
      </Suspense>
    </>
  );
}
