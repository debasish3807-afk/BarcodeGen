import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ======================
// Badge Component
// ======================

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variantClasses = {
  default: "bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300",
  primary: "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300",
  secondary: "bg-secondary-50 text-secondary-700 dark:bg-secondary-950 dark:text-secondary-300",
  accent: "bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300",
  success: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  warning: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  error: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
  lg: "px-4 py-1.5 text-sm",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
