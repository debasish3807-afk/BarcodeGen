"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { QrCode, AlertCircle } from "lucide-react";
import type { QROptions, ValidationResult } from "../_types";
import { renderQRToCanvas } from "../_lib/qr-renderer";

interface QRPreviewProps {
  options: QROptions;
  validation: ValidationResult;
  encodedData: string;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export function QRPreview({ options, validation, encodedData, canvasRef }: QRPreviewProps) {
  const internalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const renderQR = useCallback(async () => {
    const canvas = internalCanvasRef.current;
    if (!canvas) return;

    if (!validation.valid || !encodedData) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = options.size;
        canvas.height = options.size;
        ctx.clearRect(0, 0, options.size, options.size);
      }
      return;
    }

    try {
      await renderQRToCanvas(canvas, options, encodedData);
      // Sync ref for parent export actions
      if (canvasRef) {
        canvasRef.current = canvas;
      }
    } catch {
      // Silently handle render errors
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = options.size;
        canvas.height = options.size;
        ctx.clearRect(0, 0, options.size, options.size);
      }
    }
  }, [options, validation.valid, encodedData, canvasRef]);

  useEffect(() => {
    renderQR();
  }, [renderQR]);

  const hasValidData = validation.valid && encodedData;

  return (
    <div className="flex flex-col items-center">
      {/* Preview Container */}
      <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 overflow-hidden p-4">
        {hasValidData ? (
          <motion.div
            key={`${options.type}-${options.moduleStyle}-${options.eyeStyle}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <canvas
              ref={internalCanvasRef}
              className="max-w-full max-h-full"
              style={{ imageRendering: "pixelated" }}
              aria-label={`QR code preview for ${options.type}`}
            />
          </motion.div>
        ) : (
          <div className="text-center space-y-3">
            {!encodedData ? (
              <>
                <QrCode className="h-16 w-16 mx-auto text-surface-300 dark:text-surface-600" />
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  Fill in the form to see your QR code
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

      {/* Info badges */}
      <div className="mt-3 flex items-center gap-2 flex-wrap justify-center">
        <span className="px-3 py-1 bg-accent-50 dark:bg-accent-950/50 text-accent-600 dark:text-accent-400 text-xs font-semibold rounded-full">
          {options.type.toUpperCase()}
        </span>
        <span className="px-3 py-1 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-xs font-medium rounded-full">
          {options.size}×{options.size}px
        </span>
        <span className="px-3 py-1 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-xs font-medium rounded-full">
          EC: {options.errorCorrection}
        </span>
        {hasValidData && (
          <span className="px-3 py-1 bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
            Valid
          </span>
        )}
      </div>
    </div>
  );
}
