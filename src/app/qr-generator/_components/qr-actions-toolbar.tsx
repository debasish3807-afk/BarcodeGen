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
  Share2,
} from "lucide-react";
import type { QROptions, ValidationResult } from "../_types";
import { renderQRToSVG } from "../_lib/qr-renderer";
import { cn } from "@/lib/utils";

interface QRActionsToolbarProps {
  options: QROptions;
  validation: ValidationResult;
  encodedData: string;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  onGenerate: () => void;
  onReset: () => void;
}

type CopyState = "idle" | "copied";

export function QRActionsToolbar({
  options,
  validation,
  encodedData,
  canvasRef,
  onGenerate,
  onReset,
}: QRActionsToolbarProps) {
  const [copyPngState, setCopyPngState] = useState<CopyState>("idle");
  const [copySvgState, setCopySvgState] = useState<CopyState>("idle");
  const [isExporting, setIsExporting] = useState(false);

  const canExport = validation.valid && encodedData.length > 0;


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

  const handleCopyPNG = async () => {
    if (!canExport) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          setCopyPngState("copied");
          setTimeout(() => setCopyPngState("idle"), 2000);
        }
      }, "image/png");
    } catch { /* silent */ }
  };

  const handleCopySVG = async () => {
    if (!canExport) return;
    try {
      const svgString = await renderQRToSVG(options, encodedData);
      await navigator.clipboard.writeText(svgString);
      setCopySvgState("copied");
      setTimeout(() => setCopySvgState("idle"), 2000);
    } catch { /* silent */ }
  };


  const handleDownloadPNG = () => {
    if (!canExport) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) downloadFile(blob, `qr-${options.type}.png`);
    }, "image/png");
  };

  const handleDownloadSVG = async () => {
    if (!canExport) return;
    const svg = await renderQRToSVG(options, encodedData);
    downloadFile(svg, `qr-${options.type}.svg`, "image/svg+xml");
  };

  const handleDownloadJPG = () => {
    if (!canExport) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = document.createElement("canvas");
    c.width = canvas.width;
    c.height = canvas.height;
    const ctx = c.getContext("2d");
    if (ctx) { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(canvas, 0, 0); }
    c.toBlob((blob) => { if (blob) downloadFile(blob, `qr-${options.type}.jpg`); }, "image/jpeg", 0.95);
  };

  const handleDownloadWebP = () => {
    if (!canExport) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => { if (blob) downloadFile(blob, `qr-${options.type}.webp`); }, "image/webp", 0.95);
  };


  const handleDownloadPDF = async () => {
    if (!canExport) return;
    setIsExporting(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) { setIsExporting(false); return; }
      const { jsPDF } = await import("jspdf");
      const imgData = canvas.toDataURL("image/png");
      const s = canvas.width * 0.264583;
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [s + 20, s + 20] });
      pdf.addImage(imgData, "PNG", 10, 10, s, s);
      pdf.save(`qr-${options.type}.pdf`);
    } catch { /* silent */ }
    setIsExporting(false);
  };

  const handlePrint = () => {
    if (!canExport) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = canvas.toDataURL("image/png");
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(`<!DOCTYPE html><html><head><title>Print QR</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh"><img src="${img}" style="max-width:100%;height:auto"/></body></html>`);
      w.document.close();
      w.onload = () => { w.print(); w.close(); };
    }
  };

  const handleShare = async () => {
    if (!canExport) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `qr-${options.type}.png`, { type: "image/png" });
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({ title: `QR Code - ${options.type.toUpperCase()}`, files: [file] });
        } else { await handleCopyPNG(); }
      }, "image/png");
    } catch { /* silent */ }
  };


  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="flex gap-2">
        <button
          onClick={onGenerate}
          disabled={!validation.valid}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
            validation.valid
              ? "bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-600/20"
              : "bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed"
          )}
          aria-label="Generate QR code"
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
        <button onClick={handleCopyPNG} disabled={!canExport} className={cn("flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border", canExport ? "border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800" : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed")} aria-label="Copy PNG to clipboard">
          <AnimatePresence mode="wait">
            {copyPngState === "copied" ? (<motion.span key="c" initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-1.5 text-green-600"><Check className="h-3.5 w-3.5"/>Copied!</motion.span>) : (<motion.span key="i" initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-1.5"><Copy className="h-3.5 w-3.5"/>Copy PNG</motion.span>)}
          </AnimatePresence>
        </button>
        <button onClick={handleCopySVG} disabled={!canExport} className={cn("flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border", canExport ? "border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800" : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed")} aria-label="Copy SVG to clipboard">
          <AnimatePresence mode="wait">
            {copySvgState === "copied" ? (<motion.span key="c" initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-1.5 text-green-600"><Check className="h-3.5 w-3.5"/>Copied!</motion.span>) : (<motion.span key="i" initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-1.5"><FileCode className="h-3.5 w-3.5"/>Copy SVG</motion.span>)}
          </AnimatePresence>
        </button>
      </div>


      {/* Download Actions */}
      <div>
        <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
          <Download className="h-3 w-3 inline mr-1" />Download
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {[
            { label: "PNG", icon: FileImage, handler: handleDownloadPNG },
            { label: "SVG", icon: FileCode, handler: handleDownloadSVG },
            { label: "PDF", icon: FileText, handler: handleDownloadPDF },
            { label: "JPG", icon: Image, handler: handleDownloadJPG },
            { label: "WebP", icon: Image, handler: handleDownloadWebP },
          ].map(({ label, icon: Icon, handler }) => (
            <button key={label} onClick={handler} disabled={!canExport || isExporting} className={cn("flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border", canExport && !isExporting ? "border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:border-primary-200 dark:hover:border-primary-800 hover:text-primary-700 dark:hover:text-primary-300" : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed")} aria-label={`Download as ${label}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Print & Share */}
      <div className="flex gap-2">
        <button onClick={handlePrint} disabled={!canExport} className={cn("flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border", canExport ? "border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800" : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed")} aria-label="Print QR code">
          <Printer className="h-4 w-4" />Print
        </button>
        <button onClick={handleShare} disabled={!canExport} className={cn("flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border", canExport ? "border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/30 hover:bg-primary-100 dark:hover:bg-primary-950/50" : "border-surface-100 dark:border-surface-800 text-surface-400 dark:text-surface-600 cursor-not-allowed")} aria-label="Share QR code">
          <Share2 className="h-4 w-4" />Share
        </button>
      </div>
    </div>
  );
}
