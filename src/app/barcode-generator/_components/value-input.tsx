"use client";

import { AlertCircle, CheckCircle2, Keyboard } from "lucide-react";
import type { BarcodeFormat, ValidationResult } from "../_types";
import { getFormatConfig } from "../_lib/barcode-formats";
import { cn } from "@/lib/utils";

interface ValueInputProps {
  value: string;
  format: BarcodeFormat;
  validation: ValidationResult;
  onChange: (value: string) => void;
}

export function ValueInput({ value, format, validation, onChange }: ValueInputProps) {
  const config = getFormatConfig(format);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Keyboard className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        <label
          htmlFor="barcode-value"
          className="text-sm font-bold text-surface-900 dark:text-white"
        >
          Barcode Value
        </label>
      </div>

      <div className="relative">
        <input
          id="barcode-value"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={config?.placeholder || "Enter barcode value"}
          className={cn(
            "w-full px-4 py-3 pr-10 rounded-xl border-2 text-base font-mono transition-all duration-200",
            "bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder:text-surface-400",
            "focus:outline-none focus:ring-2",
            validation.valid && value
              ? "border-green-300 dark:border-green-700 focus:ring-green-500/20 focus:border-green-500"
              : !value
              ? "border-surface-200 dark:border-surface-700 focus:ring-primary-500/20 focus:border-primary-500"
              : "border-red-300 dark:border-red-700 focus:ring-red-500/20 focus:border-red-500"
          )}
          aria-invalid={!validation.valid && value.length > 0}
          aria-describedby="barcode-validation"
          autoComplete="off"
          spellCheck={false}
        />
        {/* Status icon */}
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {validation.valid ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
            )}
          </div>
        )}
      </div>

      {/* Validation message */}
      <div
        id="barcode-validation"
        role={validation.valid ? "status" : "alert"}
        aria-live="polite"
        className={cn(
          "flex items-center gap-1.5 text-xs font-medium",
          validation.valid && value
            ? "text-green-600 dark:text-green-400"
            : !value
            ? "text-surface-500 dark:text-surface-400"
            : "text-red-600 dark:text-red-400"
        )}
      >
        {value ? (
          <>
            {validation.valid ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5" />
            )}
            {validation.message}
          </>
        ) : (
          <span>{config?.description || "Enter a value to generate barcode"}</span>
        )}
      </div>
    </div>
  );
}
