import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { FadeIn } from "@/components/shared/FadeIn";

export function CategoryGrid() {
  return (
    <section className="bg-surface-alt py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Range"
          title="157 formulations across 20 product categories."
          description="Tablets, capsules, syrups, injectables, derma, dental and nutraceutical ranges — manufactured to consistent, batch-tested quality."
        />
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.slice(0, 8).map((cat, i) => (
            <FadeIn key={cat.slug} delay={i * 0.05}>
              <CategoryCard category={cat} />
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2} className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-ink-950/10 bg-white px-6 py-3 text-sm font-semibold text-primary-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-500/40"
          >
            View full catalogue <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
