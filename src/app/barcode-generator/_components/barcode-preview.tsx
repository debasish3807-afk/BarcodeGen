"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ScanBarcode } from "lucide-react";
import type { BarcodeOptions, ValidationResult } from "../_types";

interface BarcodePreviewProps {
  options: BarcodeOptions;
  validation: ValidationResult;
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
}

export function BarcodePreview({ options, validation, svgRef }: BarcodePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalSvgRef = useRef<SVGSVGElement | null>(null);

  const renderBarcode = useCallback(async () => {
    if (!validation.valid || !options.value) {
      // Clear existing barcode
      if (internalSvgRef.current) {
        internalSvgRef.current.innerHTML = "";
      }
      return;
    }

    try {
      const JsBarcode = (await import("jsbarcode")).default;
      const svg = internalSvgRef.current;
      if (!svg) return;

      // Map format for JsBarcode
      let jsFormat = options.format;
      if (jsFormat === "GS1-128") {
        // Strip AI parentheses for JsBarcode, use CODE128 with FNC1
        jsFormat = "CODE128" as typeof options.format;
      }

      JsBarcode(svg, options.value, {
        format: jsFormat,
        width: options.width,
        height: options.height,
        margin: options.margin,
        fontSize: options.fontSize,
        font: options.fontFamily,
        displayValue: options.displayValue,
        textAlign: options.textAlign,
        lineColor: options.foregroundColor,
        background: options.transparentBackground ? "transparent" : options.backgroundColor,
        valid: () => true,
      });

      // Sync ref for export actions
      if (svgRef) {
        svgRef.current = svg;
      }
    } catch {
      // Silently handle render errors - validation will catch input issues
      if (internalSvgRef.current) {
        internalSvgRef.current.innerHTML = "";
      }
    }
  }, [options, validation.valid, svgRef]);

  useEffect(() => {
    renderBarcode();
  }, [renderBarcode]);

  // Rotation styles
  const rotationStyle = options.rotation !== 0
    ? { transform: `rotate(${options.rotation}deg)` }
    : undefined;

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Preview Container */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[280px] flex items-center justify-center rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 overflow-hidden p-6"
        role="img"
        aria-label={validation.valid ? `Barcode preview: ${options.value}` : "Invalid barcode preview"}
      >
        {/* Valid barcode */}
        {validation.valid && options.value ? (
          <motion.div
            key={`${options.format}-${options.rotation}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={rotationStyle}
            className="flex items-center justify-center"
          >
            <svg
              ref={internalSvgRef}
              className="max-w-full h-auto"
            />
          </motion.div>
        ) : (
          /* Empty or invalid state */
          <div className="text-center space-y-3">
            {!options.value ? (
              <>
                <ScanBarcode className="h-16 w-16 mx-auto text-surface-300 dark:text-surface-600" />
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  Enter a value to see the barcode preview
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="h-12 w-12 mx-auto text-red-400" />
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {validation.message}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Format Badge */}
      <div className="mt-3 flex items-center gap-2">
        <span className="px-3 py-1 bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full">
          {options.format === "GS1-128" ? "GS1-128" : options.format}
        </span>
        {validation.valid && options.value && (
          <span className="px-3 py-1 bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
            Valid
          </span>
        )}
      </div>
    </div>
  );
}
