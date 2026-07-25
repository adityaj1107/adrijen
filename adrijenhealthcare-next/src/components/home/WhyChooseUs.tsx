import { Factory, Handshake, Truck, HeartPulse } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";

const features = [
  {
    icon: Factory,
    title: "WHO-GMP Manufacturing",
    description: "Every formulation is manufactured in certified facilities under strict quality control, from raw material sourcing to final dispatch.",
  },
  {
    icon: Handshake,
    title: "Monopoly PCD Franchise",
    description: "District-wise monopoly rights, transparent net-rate pricing and a complete promotional kit for every partner.",
  },
  {
    icon: Truck,
    title: "Reliable Pan-India Dispatch",
    description: "Cold-chain-ready logistics and consistent stock availability across 100+ cities, so your business never waits.",
  },
  {
    icon: HeartPulse,
    title: "Patient-First Quality",
    description: "Batch-tested products backed by documentation you can show any regulator, chemist or institution with confidence.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-primary-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Why Partner With Us"
          title="Committed to global quality standards & patient well-being."
          description="A dependable manufacturing and supply partner for distributors, wholesalers, chemists and institutions across India."
          light
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-teal-400/50 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-10px_rgba(10,147,150,0.5)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-500/15 text-teal-300 transition-colors group-hover:bg-teal-500/25">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">{f.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
