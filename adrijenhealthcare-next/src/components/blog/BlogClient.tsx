"use client";

import { useMemo, useState } from "react";
import { Calendar, User, ArrowRight, X } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/data/blogs";
import { FadeIn } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";

const categories = ["All", "Company Updates", "Industry News", "Regulatory Updates", "Health Tips"];

export function BlogClient() {
  const [activeTab, setActiveTab] = useState("All");
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  const filtered = useMemo(
    () => (activeTab === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeTab)),
    [activeTab]
  );

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-x">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                activeTab === cat ? "bg-primary-700 text-white" : "bg-surface-alt text-ink-600 hover:bg-ink-950/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {featured && (
          <FadeIn className="mt-10">
            <button
              onClick={() => setOpenPost(featured)}
              className="card-glow flex w-full flex-col gap-2 rounded-3xl border border-ink-950/5 bg-white p-8 text-left shadow-sm lg:flex-row lg:items-center lg:gap-10"
            >
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-teal-600">{featured.category} · Featured</p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-ink-950">{featured.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-ink-400">
                  <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(featured.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </FadeIn>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <FadeIn key={post.id} delay={Math.min(i, 6) * 0.05}>
              <button
                onClick={() => setOpenPost(post)}
                className="card-glow flex h-full w-full flex-col rounded-2xl border border-ink-950/5 bg-white p-6 text-left shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-teal-600">{post.category}</p>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink-950">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-ink-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary-700">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {openPost && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setOpenPost(null)} />
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setOpenPost(null)}
              aria-label="Close"
              className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full border border-ink-950/10 text-ink-600 hover:bg-ink-950/5"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600">{openPost.category}</p>
            <h2 className="mt-3 pr-10 font-display text-2xl font-bold leading-snug text-ink-950">{openPost.title}</h2>
            <div className="mt-3 flex items-center gap-4 text-xs text-ink-400">
              <span>{openPost.author}</span>
              <span>
                {new Date(openPost.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
              <span>{openPost.readTime}</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink-700">{openPost.content}</p>
          </div>
        </div>
      )}
    </section>
  );
}
