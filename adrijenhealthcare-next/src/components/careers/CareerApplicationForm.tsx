"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { JOB_OPENINGS } from "@/data/careers";
import { CAREER_FORM, submitToGoogleForm } from "@/data/google-form";
import { trackLeadEvent } from "@/components/shared/GoogleAnalytics";

const roles = [...JOB_OPENINGS.map((j) => j.title), "General application"];

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  role: roles[0],
  experience: "",
  resumeLink: "",
  message: "",
};

export function CareerApplicationForm() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function update<K extends keyof typeof initialState>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await submitToGoogleForm(CAREER_FORM, values);
    trackLeadEvent("career_application");
    setStatus("sent");
    setValues(initialState);
    setTimeout(() => setStatus("idle"), 5000);
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-ink-950/5 bg-white p-16 text-center shadow-sm">
        <CheckCircle2 className="h-14 w-14 text-teal-500" />
        <p className="mt-4 font-display text-xl font-semibold text-ink-950">Application received!</p>
        <p className="mt-1 text-sm text-ink-600">Our HR team replies within 5 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-ink-950/5 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
      <div>
        <label className="text-xs font-semibold text-ink-600">Full Name</label>
        <input
          required
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="Your full name"
          className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-ink-600">Email</label>
        <input
          required
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-ink-600">Phone</label>
        <input
          required
          type="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+91 98XXXXXXXX"
          className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-ink-600">Applying For</label>
        <select
          value={values.role}
          onChange={(e) => update("role", e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs font-semibold text-ink-600">Years of Experience</label>
        <input
          value={values.experience}
          onChange={(e) => update("experience", e.target.value)}
          placeholder="e.g. 3 years"
          className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs font-semibold text-ink-600">Resume Link</label>
        <input
          type="url"
          value={values.resumeLink}
          onChange={(e) => update("resumeLink", e.target.value)}
          placeholder="Google Drive / LinkedIn / portfolio link"
          className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs font-semibold text-ink-600">Cover Note</label>
        <textarea
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          placeholder="A few lines about yourself & why you'd like to join Adrijen."
          className="mt-1.5 w-full resize-none rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
        />
      </div>
      <div className="flex items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-800 disabled:opacity-60"
        >
          {status === "sending" ? "Submitting…" : "Submit Application"} <UploadCloud className="h-4 w-4" />
        </button>
        <span className="text-xs text-ink-500">By applying you agree to our privacy policy.</span>
      </div>
    </form>
  );
}
