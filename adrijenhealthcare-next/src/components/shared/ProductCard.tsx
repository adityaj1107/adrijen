"use client";

import Image from "next/image";
import { Pill, MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { whatsappUrl } from "@/data/settings";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-glow group flex flex-col overflow-hidden rounded-2xl border border-ink-950/5 bg-white shadow-sm">
      <div className="relative h-40 overflow-hidden bg-surface-alt">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-primary-700/10 to-teal-500/10">
            <Pill className="h-10 w-10 text-primary-700/40" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-800 shadow-sm">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-sm font-bold leading-snug text-ink-950">{product.name}</h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-600">{product.composition}</p>
        <p className="mt-3 text-[11px] font-medium text-ink-400">{product.pack}</p>
        <a
          href={whatsappUrl(`Hello Adrijen Healthcare, I'd like to enquire about ${product.name} (${product.category}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary-700/10 px-4 py-2 text-xs font-semibold text-primary-800 transition-colors hover:bg-primary-700 hover:text-white"
        >
          Enquire <MessageCircle className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
