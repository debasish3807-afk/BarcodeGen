"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ======================
// Button Component - Premium v2.0
// ======================

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "gradient";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm shadow-primary-600/20 hover:shadow-md hover:shadow-primary-600/30",
  secondary:
    "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-sm shadow-secondary-600/20 hover:shadow-md hover:shadow-secondary-600/30",
  accent:
    "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 shadow-sm shadow-accent-600/20 hover:shadow-md hover:shadow-accent-600/30",
  gradient:
    "bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-500 hover:to-secondary-500 shadow-md shadow-primary-600/20 hover:shadow-lg hover:shadow-primary-600/30",
  outline:
    "border-2 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30",
  ghost:
    "text-surface-700 hover:bg-surface-100 active:bg-surface-200 dark:text-surface-300 dark:hover:bg-surface-800",
  link:
    "text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline dark:text-primary-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-lg gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
  xl: "px-8 py-4 text-lg rounded-xl gap-2.5",
};


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      glow = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-surface-950",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "active:scale-[0.97]",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          glow && "btn-glow",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
