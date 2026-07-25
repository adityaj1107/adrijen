import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "gold" | "ghost" | "outline-light";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-700 text-white hover:bg-primary-800 shadow-lg shadow-primary-700/25",
  gold: "bg-gold-500 text-primary-950 hover:bg-gold-400 shadow-lg shadow-gold-500/30",
  ghost: "bg-white text-primary-800 border border-ink-950/10 hover:border-teal-500/40 hover:bg-teal-500/5",
  "outline-light": "border border-white/40 text-white hover:bg-white/10",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";

export function Button({
  href,
  variant = "primary",
  className,
  children,
  onClick,
  type = "button",
  ...rest
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variantClasses[variant], className);

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
