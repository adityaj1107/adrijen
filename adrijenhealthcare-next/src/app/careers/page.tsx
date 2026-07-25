import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { JOB_OPENINGS } from "@/data/careers";
import { SITE_SETTINGS, whatsappUrl } from "@/data/settings";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Careers — Join Adrijen Healthcare",
  description: "Explore open roles at Adrijen Healthcare and apply today. We're hiring across sales, quality, marketing and operations.",
};

function toPascalCase(kebab: string) {
  return kebab.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

const datePosted = new Date().toISOString().slice(0, 10);
const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const jobPostingSchemas = JOB_OPENINGS.map((job) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description,
  datePosted,
  validThrough,
  employmentType: job.type.toUpperCase().includes("FULL") ? "FULL_TIME" : "OTHER",
  hiringOrganization: {
    "@type": "Organization",
    name: "Adrijen Healthcare Pvt. Ltd.",
    sameAs: "https://adrijenhealthcare.com/",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location,
      addressCountry: "IN",
    },
  },
  experienceRequirements: job.experience,
}));

export default function CareersPage() {
  return (
    <>
      {jobPostingSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <PageHero
        eyebrow="Careers"
        title="Build your career with Adrijen Healthcare."
        description="We're growing across sales, quality assurance, marketing and operations. Explore open roles or send us your CV — we'd love to hear from you."
      />

      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Open Positions" title="Current openings." align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {JOB_OPENINGS.map((job, i) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[toPascalCase(job.icon)] ?? Icons.Briefcase;
              return (
                <FadeIn key={job.id} delay={i * 0.06}>
                  <div className="card-glow flex h-full flex-col rounded-2xl border border-ink-950/5 bg-white p-7 shadow-sm">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-500/10 text-teal-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink-950">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-ink-500">
                      <span>{job.location}</span>
                      <span>·</span>
                      <span>{job.type}</span>
                      <span>·</span>
                      <span>{job.experience}</span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{job.description}</p>
                    <a
                      href={whatsappUrl(`Hello Adrijen Healthcare, I'd like to apply for the ${job.title} position.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary-700/10 px-4 py-2 text-xs font-semibold text-primary-800 transition-colors hover:bg-primary-700 hover:text-white"
                    >
                      Apply on WhatsApp
                    </a>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Send Us Your CV</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-950">Don&apos;t see your role?</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Whether you&apos;re applying to a posted role or just exploring — we&apos;d love to hear from
              you. Our HR team replies within 5 business days.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-teal-600" />
                <a href={`mailto:${SITE_SETTINGS.email}`} className="text-primary-800">{SITE_SETTINGS.email}</a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-teal-600" /> {SITE_SETTINGS.phone}
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-teal-600" /> {SITE_SETTINGS.addressShort}
              </li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-7">
            <CareerApplicationForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
