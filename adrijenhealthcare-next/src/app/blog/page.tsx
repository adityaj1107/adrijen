import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { BlogClient } from "@/components/blog/BlogClient";
import { JsonLd } from "@/components/shared/JsonLd";
import { BLOG_POSTS } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog — Adrijen Healthcare",
  description: "Insights on PCD pharma franchise, regulatory updates and industry news from Adrijen Healthcare.",
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Adrijen Healthcare Blog",
  url: "https://adrijenhealthcare.com/blog",
  blogPost: BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    articleSection: post.category,
    description: post.excerpt,
  })),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogListSchema} />
      <PageHero
        eyebrow="Blog"
        title="Insights for pharma partners & franchisees."
        description="Company updates, regulatory changes and practical guidance for distributors, wholesalers and PCD franchise partners."
      />
      <BlogClient />
    </>
  );
}
