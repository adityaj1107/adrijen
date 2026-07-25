import { FadeIn } from "@/components/shared/FadeIn";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary-950 pb-20 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-x relative">
        <FadeIn>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sage-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-300" /> {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">{description}</p>}
        </FadeIn>
      </div>
    </section>
  );
}
