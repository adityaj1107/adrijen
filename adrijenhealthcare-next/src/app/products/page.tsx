import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { ProductsClient } from "@/components/products/ProductsClient";

export const metadata: Metadata = {
  title: "Our Products — Adrijen Healthcare",
  description:
    "Browse 157+ WHO-GMP manufactured formulations across 20 product categories — tablets, capsules, syrups, injectables, derma, dental and nutraceuticals.",
};

export default function ProductsPage() {
  return (
    <>
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
