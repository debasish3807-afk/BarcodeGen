"use client";

import { AlertCircle, CheckCircle2, Keyboard, Copy, ClipboardPaste, X } from "lucide-react";
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

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) onChange(text);
    } catch { /* silent */ }
  };

  const handleCopy = () => {
    if (value) navigator.clipboard.writeText(value);
  };

  return (
    <div className="space-y-3">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Keyboard className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          <label htmlFor="barcode-value" className="text-sm font-semibold text-surface-900 dark:text-white">
            Barcode Value
          </label>
        </div>
        {/* Character counter */}
        <span className="text-xs text-surface-400 dark:text-surface-500 tabular-nums">
          {value.length} chars
        </span>
      </div>

      {/* Input with actions */}
      <div className="relative group">
        <input
          id="barcode-value"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={config?.placeholder || "Enter barcode value"}
          className={cn(
            "w-full pl-4 pr-28 py-3.5 rounded-2xl border-2 text-[15px] font-mono transition-all duration-200",
            "bg-surface-50/50 dark:bg-surface-800/30 text-surface-900 dark:text-surface-100 placeholder:text-surface-400",
            "focus:outline-none focus:ring-4 focus:bg-white dark:focus:bg-surface-900",
            validation.valid && value
              ? "border-green-300/80 dark:border-green-700/60 focus:ring-green-500/10 focus:border-green-400"
              : !value
              ? "border-surface-200 dark:border-surface-700 focus:ring-primary-500/10 focus:border-primary-400"
              : "border-red-300/80 dark:border-red-700/60 focus:ring-red-500/10 focus:border-red-400"
          )}
          aria-invalid={!validation.valid && value.length > 0}
          aria-describedby="barcode-validation"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Action buttons (right side of input) */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button onClick={() => onChange("")} className="p-1.5 rounded-lg hover:bg-surface-200/60 dark:hover:bg-surface-700/60 transition-colors" aria-label="Clear" title="Clear">
              <X className="h-3.5 w-3.5 text-surface-400" />
            </button>
          )}
          {value && (
            <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-surface-200/60 dark:hover:bg-surface-700/60 transition-colors" aria-label="Copy" title="Copy">
              <Copy className="h-3.5 w-3.5 text-surface-400" />
            </button>
          )}
          {!value && (
            <button onClick={handlePaste} className="p-1.5 rounded-lg hover:bg-surface-200/60 dark:hover:bg-surface-700/60 transition-colors" aria-label="Paste" title="Paste from clipboard">
              <ClipboardPaste className="h-3.5 w-3.5 text-surface-400" />
            </button>
          )}
          {/* Status icon */}
          {value && (
            validation.valid ? (
              <CheckCircle2 className="h-4.5 w-4.5 text-green-500 ml-1" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-4.5 w-4.5 text-red-500 ml-1" aria-hidden="true" />
            )
          )}
        </div>
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
            {validation.valid ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
            {validation.message}
          </>
        ) : (
          <span>{config?.description || "Enter a value to generate barcode"}</span>
        )}
      </div>
    </div>
  );
}
