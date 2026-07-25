import type { Metadata } from "next";
import Link from "next/link";
import {
  Handshake,
  Factory,
  TrendingUp,
  Megaphone,
  CheckCircle2,
  ShieldCheck,
  Package,
  Percent,
  Truck,
  Headset,
  ArrowRight,
  MessagesSquare,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { Accordion } from "@/components/shared/Accordion";

export const metadata: Metadata = {
  title: "Our Services — Adrijen Healthcare",
  description:
    "PCD pharma franchise, third-party manufacturing, product range expansion and marketing support — Adrijen Healthcare's distributor-first service portfolio.",
};

const services = [
  {
    tag: "Most popular",
    icon: Handshake,
    title: "PCD Pharma Franchise",
    description:
      "Take Adrijen's product range to your district as our exclusive partner. Sell under your own banner with our marketing kit, monopoly rights and reliable supply behind you.",
    points: [
      "District-wise monopoly rights",
      "Healthy margins (35–45%)",
      "Free promotional kit (visual aids, MR bag, samples, LBLs)",
      "157 products across 20 categories",
      "Fast, reliable dispatch",
    ],
    cta: "Apply for Franchise",
  },
  {
    tag: "For brand owners",
    icon: Factory,
    title: "Third-Party Manufacturing",
    description:
      "Get any formulation manufactured under your brand name in WHO-GMP certified facilities. From product design and packaging artwork to final dispatch — we handle it end-to-end.",
    points: [
      "Custom formulation development",
      "Brand-name & trademark assistance",
      "Low MOQs, flexible batch sizes",
      "Packaging artwork & design support",
      "Quick turn-around: 25–35 days",
    ],
    cta: "Get a Quote",
  },
  {
    tag: "For growing partners",
    icon: TrendingUp,
    title: "Product Range Expansion",
    description:
      "Already an Adrijen partner? Add new therapeutic categories to your territory as your business grows — from our full 157-product, 20-category portfolio.",
    points: [
      "Add categories without a new agreement",
      "Priority access to new launches",
      "Bundled terms for multi-category orders",
      "Dedicated account manager guidance",
    ],
    cta: "Expand My Range",
  },
  {
    tag: "Included with every partnership",
    icon: Megaphone,
    title: "Marketing & Promotional Support",
    description:
      "Every Adrijen partner launches with a complete, print-ready promotional kit — designed to help your field team convert from day one.",
    points: [
      "Visual aids & detailing folders",
      "MR bags, sample kits & leave-behind literature (LBLs)",
      "Product cards, brochures & reminder cards",
      "Digital assets for WhatsApp & social sharing",
    ],
    cta: "See What's Included",
  },
];

const benefits = [
  { icon: ShieldCheck, title: "WHO-GMP Quality", description: "Manufactured in WHO-GMP & ISO 9001:2015 certified facilities with batch-level QC documentation." },
  { icon: Package, title: "Wide Range", description: "157 formulations across capsules, tablets, syrups, injections, ointments, dental, ophthalmic & more." },
  { icon: Percent, title: "Distributor-First Terms", description: "Transparent terms with healthy margins for franchise partners and bulk buyers — shared on enquiry." },
  { icon: Megaphone, title: "Marketing Support", description: "Visual aids, MR bags, sample products, brochures, LBLs and digital assets — all covered." },
  { icon: Truck, title: "Pan-India Dispatch", description: "Same-day order confirmation and dispatch in 24–72 hours, pan-India." },
  { icon: Headset, title: "24×7 Support", description: "Dedicated account manager, fast grievance resolution and transparent invoicing." },
];

const steps = [
  { n: "01", title: "Enquire", description: "Fill the form or WhatsApp us with your area & product interest." },
  { n: "02", title: "Discuss & Lock", description: "Our team helps you select products and confirm monopoly area." },
  { n: "03", title: "Onboard", description: "Submit drug license & GST. Sign agreement. Receive welcome kit." },
  { n: "04", title: "Launch", description: "First dispatch within 72 hours. Start growing with Adrijen." },
];

const faqs = [
  {
    question: "What is the minimum investment to start a PCD franchise with Adrijen?",
    answer:
      "Investment depends on the area size and product range you choose. Most partners start with INR 25,000–50,000 worth of products plus a refundable security deposit.",
  },
  {
    question: "Do you offer monopoly rights?",
    answer: "Yes — we offer district-wise monopoly. Once you sign with us, no other Adrijen partner will be appointed in your area.",
  },
  {
    question: "What documents do I need to apply?",
    answer: "A valid Drug License (Wholesale or Retail) and GST registration are mandatory. You'll also share basic KYC documents.",
  },
  {
    question: "Do you support new pharma brand creation?",
    answer: "Absolutely. Through third-party manufacturing we help you develop, package and launch products under your own brand name.",
  },
  {
    question: "How long does first dispatch take?",
    answer: "Once your order is confirmed and payment is received, dispatch is typically within 24–72 hours pan-India.",
  },
  {
    question: "Do you supply directly to distributors and chemists too?",
    answer: "Yes — we welcome qualified distributors, retail chains, hospitals and institutional buyers. Talk to our team for direct supply terms.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Four services, one promise — quality you can trust."
        description="Whether you want to sell our products under monopoly rights, expand your existing range, get your own brand manufactured, or need promotional support — Adrijen Healthcare offers a clear, distributor-first service portfolio."
      />

      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="card-glow flex h-full flex-col rounded-2xl border border-ink-950/5 bg-white p-8 shadow-sm">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> {s.tag}
                </span>
                <span className="mt-4 grid h-14 w-14 place-items-center rounded-xl bg-primary-700/10 text-primary-700">
                  <s.icon className="h-7 w-7" />
                </span>
                <h2 className="mt-4 font-display text-xl font-bold text-ink-950">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{s.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" /> {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-800"
                >
                  {s.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Why Partner With Us" title="What you get with Adrijen." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.06}>
                <div className="card-glow h-full rounded-2xl border border-ink-950/5 bg-white p-7 shadow-sm">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-500/10 text-teal-600">
                    <b.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-ink-950">{b.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{b.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How Partnership Works" title="From enquiry to first dispatch in 7 days." />
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.08}>
                <div className="rounded-2xl border border-ink-950/5 bg-white p-7 text-center shadow-sm">
                  <p className="font-display text-4xl font-extrabold text-primary-700">{s.n}</p>
                  <h3 className="mt-2 font-display text-base font-bold text-ink-950">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-600">{s.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950">
              Common questions, clearly answered.
            </h2>
            <p className="mt-3 text-sm text-ink-600">Still have questions? Our partnership desk replies within 24 hours.</p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-800"
            >
              Ask us anything <MessagesSquare className="h-4 w-4" />
            </Link>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-7">
            <Accordion items={faqs} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
