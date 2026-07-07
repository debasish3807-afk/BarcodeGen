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
      if (internalSvgRef.current) {
        internalSvgRef.current.innerHTML = "";
      }
      return;
    }

    try {
      const JsBarcode = (await import("jsbarcode")).default;
      const svg = internalSvgRef.current;
      if (!svg) return;

      let jsFormat = options.format;
      if (jsFormat === "GS1-128") {
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

      if (svgRef) {
        svgRef.current = svg;
      }
    } catch {
      if (internalSvgRef.current) {
        internalSvgRef.current.innerHTML = "";
      }
    }
  }, [options, validation.valid, svgRef]);

  useEffect(() => {
    renderBarcode();
  }, [renderBarcode]);

  const rotationStyle = options.rotation !== 0
    ? { transform: `rotate(${options.rotation}deg)` }
    : undefined;

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Preview Container with checkerboard for transparency */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[240px] flex items-center justify-center rounded-2xl overflow-hidden"
        style={{
          backgroundImage: options.transparentBackground
            ? "linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)"
            : undefined,
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          backgroundColor: options.transparentBackground ? "#ffffff" : undefined,
        }}
        role="img"
        aria-label={validation.valid ? `Barcode preview: ${options.value}` : "Invalid barcode preview"}
      >
        {/* Background for non-transparent */}
        {!options.transparentBackground && (
          <div className="absolute inset-0 bg-surface-50/80 dark:bg-surface-800/40 border-2 border-dashed border-surface-200/80 dark:border-surface-700/60 rounded-2xl" />
        )}

        {/* Valid barcode */}
        {validation.valid && options.value ? (
          <motion.div
            key={`${options.format}-${options.rotation}-${options.value}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={rotationStyle}
            className="relative z-10 flex items-center justify-center p-4"
          >
            <svg ref={internalSvgRef} className="max-w-full h-auto" />
          </motion.div>
        ) : (
          <div className="relative z-10 text-center space-y-3 p-6">
            {!options.value ? (
              <>
                <div className="w-14 h-14 mx-auto rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                  <ScanBarcode className="h-7 w-7 text-surface-300 dark:text-surface-600" />
                </div>
                <p className="text-sm text-surface-400 dark:text-surface-500">
                  Enter a value to see the barcode preview
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
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
        <span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-[11px] font-bold rounded-lg">
          {options.format === "GS1-128" ? "GS1-128" : options.format}
        </span>
        {validation.valid && options.value && (
          <span className="px-2.5 py-1 bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 text-[11px] font-bold rounded-lg flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Valid
          </span>
        )}
      </div>
    </div>
  );
}
