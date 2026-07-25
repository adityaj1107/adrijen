"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useEnquiry } from "./EnquiryContext";
import { ENQUIRY_FORM, submitToGoogleForm } from "@/data/google-form";
import { trackLeadEvent } from "@/components/shared/GoogleAnalytics";

export function EnquiryDrawer() {
  const { isOpen, close } = useEnquiry();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [values, setValues] = useState({ fullName: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await submitToGoogleForm(ENQUIRY_FORM, { ...values, source: "Quick Enquiry Drawer" });
    trackLeadEvent("enquiry_drawer");
    setStatus("sent");
    setValues({ fullName: "", phone: "", message: "" });
    setTimeout(() => {
      setStatus("idle");
      close();
    }, 1800);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-ink-950/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Quick Enquiry</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink-950">Tell us what you need.</h3>
              </div>
              <button onClick={close} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-ink-950/10 text-ink-600 hover:bg-ink-950/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 text-sm text-ink-600">
              We reply within 24 hours. Pricing is shared on request — it varies by territory and order volume.
            </p>

            {status === "sent" ? (
              <div className="mt-10 flex flex-1 flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-14 w-14 text-teal-500" />
                <p className="mt-4 font-display text-xl font-semibold text-ink-950">Thank you!</p>
                <p className="mt-1 text-sm text-ink-600">Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-1 flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink-600">Full Name</label>
                  <input
                    required
                    value={values.fullName}
                    onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
                    placeholder="Your full name"
                    className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink-600">Phone</label>
                  <input
                    required
                    type="tel"
                    value={values.phone}
                    onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                    placeholder="+91 98XXXXXXXX"
                    className="mt-1.5 w-full rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-ink-600">Message</label>
                  <textarea
                    value={values.message}
                    onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                    placeholder="Products, territory, or franchise interest"
                    rows={4}
                    className="mt-1.5 w-full resize-none rounded-xl border border-ink-950/10 bg-surface-alt px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 rounded-full bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-800 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Enquiry"} <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
