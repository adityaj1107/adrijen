"use client";

import { useState } from "react";
import { Send, CheckCircle2, Phone, Mail, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { SITE_SETTINGS } from "@/data/settings";
import { ENQUIRY_FORM, submitToGoogleForm } from "@/data/google-form";

const subjects = [
  "Distributor / Wholesaler enquiry",
  "Retail Chemist enquiry",
  "PCD Franchise enquiry",
  "Third-party Manufacturing",
  "Hospital / Institution",
  "General Enquiry",
];

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  state: "",
  subject: subjects[0],
  message: "",
};

export function InquirySection() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function update<K extends keyof typeof initialState>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await submitToGoogleForm(ENQUIRY_FORM, { ...values, source: "Homepage Inquiry Section" });
    setStatus("sent");
    setValues(initialState);
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Inquire for bulk orders & partnering opportunities."
          description="Share your details and we'll respond with product information, pricing and onboarding steps within 24 hours."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <div className="rounded-3xl border border-ink-950/5 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-8">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="h-14 w-14 text-teal-500" />
                  <p className="mt-4 font-display text-xl font-semibold text-ink-950">Thank you!</p>
                  <p className="mt-1 text-sm text-ink-600">Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required value={values.fullName} onChange={(v) => update("fullName", v)} placeholder="Your full name" />
                  <Field label="Email" type="email" value={values.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
                  <Field label="Phone" required type="tel" value={values.phone} onChange={(v) => update("phone", v)} placeholder="+91 8909392600" />
                  <Field label="Company Name" value={values.company} onChange={(v) => update("company", v)} placeholder="Your firm / company" />
                  <Field label="City" required value={values.city} onChange={(v) => update("city", v)} placeholder="e.g. Pune" />
                  <Field label="State" required value={values.state} onChange={(v) => update("state", v)} placeholder="e.g. Maharashtra" />
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-ink-600">Subject</label>
                    <select
                      value={values.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
                    >
                      {subjects.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-ink-600">Message</label>
                    <textarea
                      value={values.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={4}
                      placeholder="Mention product categories of interest, expected volumes, or any questions"
                      className="mt-1.5 w-full resize-none rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
                    />
                  </div>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-800 disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Send Enquiry"} <Send className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-ink-600">We reply within 24 hours.</span>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-3xl bg-primary-950 p-8 text-white">
              <h3 className="font-display text-xl font-bold">Corporate Office</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{SITE_SETTINGS.address}</p>
              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href={`tel:${SITE_SETTINGS.phoneTel}`} className="text-sm font-medium hover:text-teal-300">
                    {SITE_SETTINGS.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href={`mailto:${SITE_SETTINGS.email}`} className="text-sm font-medium hover:text-teal-300">
                    {SITE_SETTINGS.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{SITE_SETTINGS.hours}</span>
                </div>
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl">
                <iframe
                  title="Adrijen Healthcare — Map"
                  src={SITE_SETTINGS.mapsEmbed}
                  width="100%"
                  height="200"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink-600">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
      />
    </div>
  );
}
