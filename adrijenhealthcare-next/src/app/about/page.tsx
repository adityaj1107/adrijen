import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Target, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { TrustBadges } from "@/components/home/TrustBadges";

export const metadata: Metadata = {
  title: "About Us — Adrijen Healthcare",
  description:
    "Adrijen Healthcare Pvt. Ltd. is a Panchkula-based, WHO-GMP certified pharmaceutical company committed to global quality standards and patient well-being.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    description: "Every batch is manufactured and tested to WHO-GMP and ISO 9001:2015 standards before it leaves our partner facilities.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership",
    description: "We treat distributors, wholesalers and franchise partners as long-term partners, not one-time transactions.",
  },
  {
    icon: Target,
    title: "Reliability",
    description: "Consistent stock availability and dependable pan-India dispatch, so your business never has to compromise.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "A continuously expanding formulation range across tablets, injectables, derma, dental and nutraceutical categories.",
  },
];

const milestones = [
  { year: "Inception", label: "Founded as a Panchkula-based pharmaceutical supply company" },
  { year: "Growth", label: "Expanded to 157+ formulations across 20 product categories" },
  { year: "Certification", label: "WHO-GMP and ISO 9001:2015 certified manufacturing partnerships secured" },
  { year: "Today", label: "Supplying distributors, wholesalers and chemists across 100+ cities" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Adrijen Healthcare"
        title="Pioneering healthcare solutions & pharmaceutical excellence."
        description="A dependable manufacturing and supply partner committed to global quality standards and patient well-being."
      />

      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <FadeIn className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Our Story</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              Built on quality, trusted for consistency.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              Adrijen Healthcare Pvt. Ltd. is a Panchkula, Haryana-based pharmaceutical company supplying a
              wide range of tablets, capsules, syrups, injectables, derma, dental and nutraceutical products
              to distributors, wholesalers, chemists and institutions across India.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Every formulation is manufactured through WHO-GMP and ISO 9001:2015 certified partner
              facilities, with batch-level quality control that gives our partners documentation they can
              stand behind — whether they&apos;re serving a retail chemist or a hospital tender.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Beyond supply, we back every partnership with transparent net-rate pricing, promotional
              support and a dedicated onboarding manager — because a franchise or distribution relationship
              is only as strong as the support behind it.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=600&fit=crop&q=80&auto=format"
                  alt="Pharmaceutical manufacturing"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square translate-y-8 overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=600&fit=crop&q=80&auto=format"
                  alt="Sterile injectable manufacturing"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=600&fit=crop&q=80&auto=format"
                  alt="Quality-tested tablets"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square translate-y-8 overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&h=600&fit=crop&q=80&auto=format"
                  alt="Pharmaceutical quality control"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What We Stand For" title="Values that guide every partnership." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="card-glow h-full rounded-2xl border border-ink-950/5 bg-white p-7 shadow-sm">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-500/10 text-teal-600">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-950">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-950 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Our Journey" title="From regional supplier to pan-India partner." light />
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="font-display text-lg font-bold text-sage-300">{m.year}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{m.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2} className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: 157, suffix: "+", label: "Formulations" },
              { value: 20, suffix: "", label: "Categories" },
              { value: 100, suffix: "+", label: "Cities Served" },
              { value: 2, suffix: "", label: "GMP Facilities" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-white">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium text-white/60">{s.label}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <TrustBadges />

      <section className="bg-surface py-20 sm:py-24">
        <div className="container-x">
          <FadeIn className="flex flex-col items-center gap-6 rounded-3xl bg-primary-950 px-8 py-14 text-center sm:px-16">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to partner with Adrijen Healthcare?
            </h2>
            <p className="max-w-xl text-sm text-white/70">
              Inquire for bulk orders, PCD franchise partnerships or third-party manufacturing opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-primary-950 shadow-lg shadow-gold-500/25 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
