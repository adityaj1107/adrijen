import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { BlogClient } from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog — Adrijen Healthcare",
  description: "Insights on PCD pharma franchise, regulatory updates and industry news from Adrijen Healthcare.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights for pharma partners & franchisees."
        description="Company updates, regulatory changes and practical guidance for distributors, wholesalers and PCD franchise partners."
      />
      <BlogClient />
    </>
  );
}
