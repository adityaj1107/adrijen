import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import type { Category } from "@/data/categories";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon ? (Icons as unknown as Record<string, Icons.LucideIcon>)[toPascalCase(category.icon)] : null;

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="card-glow group relative overflow-hidden rounded-2xl border border-ink-950/5 bg-white shadow-sm"
    >
      <div className="relative h-44 overflow-hidden bg-surface-alt">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-primary-700/10 to-teal-500/10">
            {Icon && <Icon className="h-12 w-12 text-primary-700/50" />}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-ink-950">{category.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-600">{category.description}</p>
      </div>
    </Link>
  );
}

function toPascalCase(kebab: string) {
  return kebab
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}
