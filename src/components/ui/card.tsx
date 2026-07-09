import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ======================
// Card Component - Premium v2.0
// ======================

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "glass" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  glow?: boolean;
}

const variantClasses = {
  default: "bg-white dark:bg-surface-900/60 border border-surface-200/60 dark:border-surface-700/30",
  elevated: "bg-white dark:bg-surface-900/60 shadow-xl shadow-surface-200/40 dark:shadow-surface-900/40 border border-surface-200/40 dark:border-surface-700/20",
  bordered: "bg-white dark:bg-surface-900/60 border-2 border-surface-200 dark:border-surface-700",
  glass: "bg-white/60 dark:bg-surface-800/40 backdrop-blur-2xl border border-surface-200/50 dark:border-surface-700/30",
  gradient: "bg-gradient-to-br from-white to-surface-50 dark:from-surface-900 dark:to-surface-800 border border-surface-200/60 dark:border-surface-700/30",
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", hover = false, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          variantClasses[variant],
          paddingClasses[padding],
          hover && "hover:shadow-xl hover:shadow-primary-500/[0.05] hover:-translate-y-1 hover:border-primary-200/60 dark:hover:border-primary-800/40",
          glow && "hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.15)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";


// ======================
// Card Header
// ======================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

// ======================
// Card Title
// ======================

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}

export function CardTitle({ className, as: Tag = "h3", children, ...props }: CardTitleProps) {
  return (
    <Tag
      className={cn("text-lg font-bold text-surface-900 dark:text-surface-100", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ======================
// Card Description
// ======================

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-surface-600 dark:text-surface-400", className)} {...props}>
      {children}
    </p>
  );
}
