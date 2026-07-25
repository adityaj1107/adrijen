import type { Metadata } from "next";
import { Handshake, Factory, Briefcase, Newspaper } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { InquirySection } from "@/components/home/InquirySection";
import { SITE_SETTINGS } from "@/data/settings";

export const metadata: Metadata = {
  title: "Contact Us — Adrijen Healthcare",
  description: "Get in touch with Adrijen Healthcare for distributor pricing, PCD franchise enquiries, third-party manufacturing and more.",
};

const departments = [
  { icon: Handshake, title: "Franchise Desk", email: SITE_SETTINGS.email },
  { icon: Factory, title: "Manufacturing", email: SITE_SETTINGS.email },
  { icon: Briefcase, title: "Careers", email: SITE_SETTINGS.email },
  { icon: Newspaper, title: "Media & Press", email: SITE_SETTINGS.email },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your requirements."
        description="Share your details and product categories of interest. We'll send our latest product list, sample options and onboarding steps."
      />

      <InquirySection />

      <section className="bg-surface-alt py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Reach The Right Team" title="Department directory." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d, i) => (
              <FadeIn key={d.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-ink-950/5 bg-white p-6 text-center shadow-sm">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-teal-500/10 text-teal-600">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink-950">{d.title}</h3>
                  <a href={`mailto:${d.email}`} className="mt-1 block text-sm text-primary-700">
                    {d.email}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
