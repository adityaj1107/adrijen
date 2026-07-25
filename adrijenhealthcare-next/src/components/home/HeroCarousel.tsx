"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES } from "@/data/slides";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28 });
  const [selected, setSelected] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    SLIDES.forEach((slide) => {
      preload(slide.desktopImage, { as: "image" });
      preload(slide.mobileImage, { as: "image" });
    });
  }, []);

  const restartAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!emblaApi) return;
    autoplayRef.current = setInterval(() => emblaApi.scrollNext(), 6000);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i: number) => {
      emblaApi?.scrollTo(i);
      restartAutoplay();
    },
    [emblaApi, restartAutoplay]
  );
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    restartAutoplay();
  }, [emblaApi, restartAutoplay]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    restartAutoplay();
  }, [emblaApi, restartAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [restartAutoplay]);

  return (
    <section className="relative overflow-hidden">
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[560px] bg-gradient-to-br from-primary-900 via-primary-800 to-teal-700 sm:h-[620px] lg:h-[680px]">
                <div
                  role="img"
                  aria-label={slide.headline}
                  className="absolute inset-0 hidden bg-cover bg-center sm:block"
                  style={{ backgroundImage: `url(${slide.desktopImage})` }}
                />
                <div
                  role="img"
                  aria-label={slide.headline}
                  className="absolute inset-0 bg-cover bg-center sm:hidden"
                  style={{ backgroundImage: `url(${slide.mobileImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/40 to-primary-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-950/70 via-primary-950/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="container-x">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-dark pointer-events-auto max-w-xl rounded-3xl border border-white/10 p-8 sm:p-10"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-sage-300">
              {SLIDES[selected].eyebrow}
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {SLIDES[selected].headline}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              {SLIDES[selected].subline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-primary-950 shadow-lg shadow-gold-500/25 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-6 sm:bottom-8">
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i ? "w-8 bg-gold-500" : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
        <button
          onClick={scrollNext}
          aria-label="Next slide"
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
