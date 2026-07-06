import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ======================
// Section Component
// ======================

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: "default" | "muted" | "primary" | "dark";
  spacing?: "sm" | "md" | "lg" | "xl";
}

const variantClasses = {
  default: "bg-white dark:bg-surface-950",
  muted: "bg-surface-50 dark:bg-surface-900",
  primary: "bg-primary-50 dark:bg-primary-950/30",
  dark: "bg-surface-900 dark:bg-surface-950",
};

const spacingClasses = {
  sm: "py-14 md:py-18",
  md: "py-18 md:py-24",
  lg: "py-22 md:py-32",
  xl: "py-28 md:py-40",
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
// Section Header
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
    <div className={cn("mb-14 md:mb-20", centered && "text-center", className)}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50/80 dark:bg-primary-950/40 dark:text-primary-400 rounded-full border border-primary-200/60 dark:border-primary-800/40">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-900 dark:text-white text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg md:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-balance leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
