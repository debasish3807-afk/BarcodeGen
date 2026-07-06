"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Copy,
  Printer,
  RotateCcw,
  Sparkles,
  Check,
  FileImage,
  FileCode,
  FileText,
  Image,
} from "lucide-react";
import type { BarcodeOptions, ValidationResult } from "../_types";
import { cn } from "@/lib/utils";

interface ActionsToolbarProps {
  options: BarcodeOptions;
  validation: ValidationResult;
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  onGenerate: () => void;
  onReset: () => void;
}

type CopyState = "idle" | "copied";

export function ActionsToolbar({
  options,
  validation,
  svgRef,
  onGenerate,
  onReset,
}: ActionsToolbarProps) {
  const [copyImageState, setCopyImageState] = useState<CopyState>("idle");
  const [copySvgState, setCopySvgState] = useState<CopyState>("idle");
  const [isExporting, setIsExporting] = useState(false);

  const canExport = validation.valid && options.value.length > 0;

  // Get SVG string
  const getSvgString = (): string | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
  };

  // Get canvas from SVG
  const getCanvas = (scale: number = 1): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
      const svgString = getSvgString();
      if (!svgString) {
        reject(new Error("No barcode SVG found"));
        return;
      }

      const svgEl = svgRef.current;
      if (!svgEl) {
        reject(new Error("No SVG element"));
        return;
      }

      const bbox = svgEl.getBBox();
      const width = (bbox.width + options.margin * 2) * scale;
      const height = (bbox.height + options.margin * 2) * scale;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Cannot get canvas context"));
        return;
      }

      const img = new window.Image();
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        if (!options.transparentBackground) {
          ctx.fillStyle = options.backgroundColor;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to render barcode to canvas"));
      };

      img.src = url;
    });
  };

  // Copy Image to clipboard
  const handleCopyImage = async () => {
    if (!canExport) return;
    try {
      const canvas = await getCanvas(options.dpi / 72);
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopyImageState("copied");
          setTimeout(() => setCopyImageState("idle"), 2000);
        }
      }, "image/png");
    } catch {
      // Fallback: copy SVG as text
      handleCopySvg();
    }
  };

  // Copy SVG to clipboard
  const handleCopySvg = async () => {
    if (!canExport) return;
    const svgString = getSvgString();
    if (svgString) {
      await navigator.clipboard.writeText(svgString);
      setCopySvgState("copied");
      setTimeout(() => setCopySvgState("idle"), 2000);
    }
  };

  // Download helper
  const downloadFile = (content: string | Blob, filename: string, mimeType?: string) => {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download PNG
  const handleDownloadPNG = async () => {
    if (!canExport) return;
    setIsExporting(true);
    try {
      const canvas = await getCanvas(options.dpi / 72);
      canvas.toBlob((blob) => {
        if (blob) downloadFile(blob, `barcode-${options.format}.png`);
        setIsExporting(false);
      }, "image/png");
    } catch {
      setIsExporting(false);
    }
  };

  // Download JPG
  const handleDownloadJPG = async () => {
    if (!canExport) return;
    setIsExporting(true);
    try {
      const canvas = await getCanvas(options.dpi / 72);
      // For JPG we need to add white background
      const jpgCanvas = document.createElement("canvas");
      jpgCanvas.width = canvas.width;
      jpgCanvas.height = canvas.height;
      const ctx = jpgCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);
        ctx.drawImage(canvas, 0, 0);
      }
      jpgCanvas.toBlob((blob) => {
        if (blob) downloadFile(blob, `barcode-${options.format}.jpg`);
        setIsExporting(false);
      }, "image/jpeg", 0.95);
    } catch {
      setIsExporting(false);
    }
  };

  // Download WebP
  const handleDownloadWebP = async () => {
    if (!canExport) return;
    setIsExporting(true);
    try {
      const canvas = await getCanvas(options.dpi / 72);
      canvas.toBlob((blob) => {
        if (blob) downloadFile(blob, `barcode-${options.format}.webp`);
        setIsExporting(false);
      }, "image/webp", 0.95);
    } catch {
      setIsExporting(false);
    }
  };

  // Download SVG
  const handleDownloadSVG = () => {
    if (!canExport) return;
    const svgString = getSvgString();
    if (svgString) {
      downloadFile(svgString, `barcode-${options.format}.svg`, "image/svg+xml");
    }
  };

  // Download PDF
  const handleDownloadPDF = async () => {
    if (!canExport) return;
    setIsExporting(true);
    try {
      const canvas = await getCanvas(options.dpi / 72);
      const { jsPDF } = await import("jspdf");
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = canvas.width * 0.264583; // px to mm (at 96dpi)
      const pdfHeight = canvas.height * 0.264583;

      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
        unit: "mm",
        format: [pdfWidth + 20, pdfHeight + 20],
      });

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save(`barcode-${options.format}.pdf`);
      setIsExporting(false);
    } catch {
      setIsExporting(false);
    }
  };

  // Print
  const handlePrint = async () => {
    if (!canExport) return;
    try {
      const canvas = await getCanvas(options.dpi / 72);
      const imgData = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head><title>Print Barcode - ${options.format}</title></head>
          <body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;">
            <img src="${imgData}" style="max-width:100%;height:auto;" />
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.onload = () => {
          printWindow.print();
          printWindow.close();
        };
      }
    } catch {
      // silently fail
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="flex gap-2">
        <button
          onClick={onGenerate}
          disabled={!validation.valid || !options.value}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/20",
            validation.valid && options.value
              ? "bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-600/20"
              : "bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed"
          )}
          aria-label="Generate barcode"
        >
          <Sparkles className="h-4 w-4" />
          Generate
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border-2 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          aria-label="Reset all options"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      {/* Copy Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopyImage}
          disabled={!canExport}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border",
            canExport
              ? "border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800"
              : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed"
          )}
          aria-label="Copy image to clipboard"
        >
          <AnimatePresence mode="wait">
            {copyImageState === "copied" ? (
              <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5 text-green-600">
                <Check className="h-3.5 w-3.5" /> Copied!
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                <Copy className="h-3.5 w-3.5" /> Copy Image
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={handleCopySvg}
          disabled={!canExport}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border",
            canExport
              ? "border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800"
              : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed"
          )}
          aria-label="Copy SVG code to clipboard"
        >
          <AnimatePresence mode="wait">
            {copySvgState === "copied" ? (
              <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5 text-green-600">
                <Check className="h-3.5 w-3.5" /> Copied!
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                <FileCode className="h-3.5 w-3.5" /> Copy SVG
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Download Actions */}
      <div>
        <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
          <Download className="h-3 w-3 inline mr-1" />
          Download
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {[
            { label: "PNG", icon: FileImage, handler: handleDownloadPNG },
            { label: "SVG", icon: FileCode, handler: handleDownloadSVG },
            { label: "PDF", icon: FileText, handler: handleDownloadPDF },
            { label: "JPG", icon: Image, handler: handleDownloadJPG },
            { label: "WebP", icon: Image, handler: handleDownloadWebP },
          ].map(({ label, icon: Icon, handler }) => (
            <button
              key={label}
              onClick={handler}
              disabled={!canExport || isExporting}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border",
                canExport && !isExporting
                  ? "border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:border-primary-200 dark:hover:border-primary-800 hover:text-primary-700 dark:hover:text-primary-300"
                  : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed"
              )}
              aria-label={`Download as ${label}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Print */}
      <button
        onClick={handlePrint}
        disabled={!canExport}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border",
          canExport
            ? "border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800"
            : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed"
        )}
        aria-label="Print barcode"
      >
        <Printer className="h-4 w-4" />
        Print Barcode
      </button>
    </div>
  );
}
