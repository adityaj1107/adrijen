import { ShieldCheck, BadgeCheck, FlaskConical, Globe2, Award, Microscope } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";

const badges = [
  { icon: ShieldCheck, label: "WHO-GMP Certified" },
  { icon: BadgeCheck, label: "ISO 9001:2015" },
  { icon: FlaskConical, label: "Batch-Tested Quality" },
  { icon: Globe2, label: "Pan-India Dispatch" },
  { icon: Award, label: "Trusted Since Inception" },
  { icon: Microscope, label: "In-House QA/QC" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-ink-950/5 bg-white py-10">
      <div className="container-x">
        <FadeIn>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {badges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2.5 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-teal-500/10 text-teal-600">
                  <b.icon className="h-5 w-5" />
                </span>
                <p className="text-xs font-semibold leading-tight text-ink-800">{b.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
