import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const stats = [
  { value: 157, suffix: "+", label: "Formulations" },
  { value: 20, suffix: "", label: "Product Categories" },
  { value: 100, suffix: "+", label: "Cities Served" },
  { value: 2, suffix: "", label: "GMP Facilities" },
];

export function AboutSplit() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <FadeIn className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-primary-900/10">
            <Image
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=900&h=1125&fit=crop&q=80&auto=format"
              alt="Pharmaceutical quality control at Adrijen Healthcare"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="glass absolute -bottom-8 -right-6 flex items-center gap-3 rounded-2xl border border-white/60 p-5 shadow-xl sm:-right-10">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-600">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ink-950">WHO-GMP</p>
              <p className="text-xs text-ink-600">Certified Manufacturing</p>
            </div>
          </div>
        </FadeIn>

        <div className="lg:col-span-7">
          <FadeIn>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> About Adrijen Healthcare
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              Pioneering healthcare solutions &amp; pharmaceutical excellence.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600">
              Adrijen Healthcare Pvt. Ltd. is a Panchkula-based pharmaceutical company committed to global
              quality standards and patient well-being. We manufacture and supply a wide range of tablets,
              capsules, syrups, injectables and nutraceuticals through WHO-GMP and ISO 9001:2015 certified
              partner facilities — trusted by distributors, wholesalers and chemists across India.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">
              From third-party manufacturing to PCD franchise partnerships, our team supports every stage
              of the relationship with transparent documentation, batch-tested quality and dependable
              pan-India dispatch.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink-950/5 bg-white p-5 shadow-sm">
                <p className="font-display text-3xl font-bold text-primary-800">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium text-ink-600">{s.label}</p>
              </div>
            ))}
          </FadeIn>

          <FadeIn delay={0.25} className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-700/25 transition-all hover:-translate-y-0.5 hover:bg-primary-800"
            >
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
