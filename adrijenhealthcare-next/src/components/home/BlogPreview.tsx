import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";

export function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="bg-surface-alt py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="From The Blog" title="Insights for pharma partners & franchisees." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.08}>
              <Link href="/blog" className="card-glow flex h-full flex-col rounded-2xl border border-ink-950/5 bg-white p-6 shadow-sm">
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
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
