import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ======================
// Card Component
// ======================

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const variantClasses = {
  default: "bg-white dark:bg-surface-900 shadow-sm border border-surface-200 dark:border-surface-800",
  elevated: "bg-white dark:bg-surface-900 shadow-lg shadow-surface-200/50 dark:shadow-surface-900/50",
  bordered: "bg-white dark:bg-surface-900 border-2 border-surface-200 dark:border-surface-700",
  glass: "glass",
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          variantClasses[variant],
          paddingClasses[padding],
          hover && "hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-primary-200/80 dark:hover:border-primary-700/60",
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
