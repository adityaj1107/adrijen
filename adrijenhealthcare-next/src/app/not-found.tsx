import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-surface py-24">
      <div className="container-x flex flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-500/10 text-teal-600">
          <SearchX className="h-8 w-8" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-teal-600">404 — Page Not Found</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-sm text-ink-600">
          The page you&apos;re looking for may have been moved or removed. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-700/25 transition-all hover:-translate-y-0.5 hover:bg-primary-800"
        >
          Back to Home <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
