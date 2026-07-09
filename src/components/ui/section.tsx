import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ======================
// Section Component - Premium v5.0
// ======================

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: "default" | "muted" | "primary" | "dark";
  spacing?: "sm" | "md" | "lg" | "xl";
}

const variantClasses = {
  default: "bg-white dark:bg-surface-950",
  muted: "bg-surface-50 dark:bg-surface-900/50",
  primary: "bg-primary-50 dark:bg-primary-950/20",
  dark: "bg-surface-900 dark:bg-surface-950",
};

const spacingClasses = {
  sm: "py-14 md:py-18",
  md: "py-18 md:py-24",
  lg: "py-22 md:py-32",
  xl: "py-24 md:py-36",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", spacing = "md", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(variantClasses[variant], spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";


// ======================
// Section Header - Premium Typography v5.0
// ======================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14 md:mb-18", centered && "text-center", className)}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-600 bg-primary-50/80 dark:bg-primary-950/40 dark:text-primary-400 rounded-2xl border border-primary-200/60 dark:border-primary-800/40">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white text-balance leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg md:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-balance leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
