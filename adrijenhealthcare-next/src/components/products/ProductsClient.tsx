"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";

export function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const tabs = useMemo(() => {
    const seen = new Map<string, string>();
    PRODUCTS.forEach((p) => seen.set(p.categorySlug, p.category));
    return [{ slug: "all", label: "All" }, ...Array.from(seen, ([slug, label]) => ({ slug, label }))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesTab = activeTab === "all" || p.categorySlug === activeTab;
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.composition.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [activeTab, query]);

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveTab(tab.slug)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  activeTab === tab.slug
                    ? "bg-primary-700 text-white"
                    : "bg-surface-alt text-ink-600 hover:bg-ink-950/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-ink-950/10 bg-surface-alt py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-teal-500"
            />
          </div>
        </div>

        <p className="mt-6 text-xs font-medium text-ink-400">{filtered.length} products found</p>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-sm text-ink-600">No products match your search.</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={Math.min(i, 8) * 0.03}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
