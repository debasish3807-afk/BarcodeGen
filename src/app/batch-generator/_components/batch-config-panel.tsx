"use client";

import { ScanBarcode, QrCode, Settings } from "lucide-react";
import type { BatchConfig, BatchMode } from "../_types";
import { BARCODE_FORMATS, QR_TYPES } from "../_types";
import { cn } from "@/lib/utils";

interface BatchConfigPanelProps {
  config: BatchConfig;
  onConfigChange: <K extends keyof BatchConfig>(key: K, value: BatchConfig[K]) => void;
}

export function BatchConfigPanel({ config, onConfigChange }: BatchConfigPanelProps) {
  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm space-y-5">
      <div className="flex items-center gap-2">
        <Settings className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        <h3 className="text-sm font-bold text-surface-900 dark:text-white">Batch Configuration</h3>
      </div>

      {/* Mode Toggle */}
      <div>
        <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-2">Generation Mode</label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { mode: "barcode" as BatchMode, icon: ScanBarcode, label: "Barcode" },
            { mode: "qr" as BatchMode, icon: QrCode, label: "QR Code" },
          ]).map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => {
                onConfigChange("mode", mode);
                onConfigChange("format", mode === "barcode" ? "CODE128" : "url");
              }}
              className={cn(
                "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border-2",
                config.mode === mode
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300"
                  : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800"
              )}
              aria-pressed={config.mode === mode}
            >
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Format Selector */}
      <div>
        <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-2">
          {config.mode === "barcode" ? "Barcode Format" : "QR Type"}
        </label>
        <select
          value={config.format}
          onChange={(e) => onConfigChange("format", e.target.value)}
          className="w-full px-3 py-2.5 text-sm rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          aria-label="Select format"
        >
          {(config.mode === "barcode" ? BARCODE_FORMATS : QR_TYPES).map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Dimensions */}
      {config.mode === "barcode" ? (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-1.5">Bar Width</label>
            <input type="number" min={1} max={5} step={0.5} value={config.barcodeWidth} onChange={(e) => onConfigChange("barcodeWidth", Number(e.target.value))} className="w-full px-3 py-2 text-sm rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-1.5">Height</label>
            <input type="number" min={30} max={200} step={10} value={config.barcodeHeight} onChange={(e) => onConfigChange("barcodeHeight", Number(e.target.value))} className="w-full px-3 py-2 text-sm rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-1.5">QR Size</label>
            <input type="number" min={100} max={600} step={50} value={config.qrSize} onChange={(e) => onConfigChange("qrSize", Number(e.target.value))} className="w-full px-3 py-2 text-sm rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-1.5">Error Correction</label>
            <select value={config.qrErrorCorrection} onChange={(e) => onConfigChange("qrErrorCorrection", e.target.value as "L" | "M" | "Q" | "H")} className="w-full px-3 py-2 text-sm rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
              <option value="L">L (7%)</option>
              <option value="M">M (15%)</option>
              <option value="Q">Q (25%)</option>
              <option value="H">H (30%)</option>
            </select>
          </div>
        </div>
      )}

      {/* Skip Invalid Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-surface-700 dark:text-surface-300">Skip Invalid Rows</label>
        <button
          onClick={() => onConfigChange("skipInvalid", !config.skipInvalid)}
          className={cn(
            "relative w-11 h-6 rounded-full transition-colors duration-200",
            config.skipInvalid ? "bg-primary-600" : "bg-surface-300 dark:bg-surface-600"
          )}
          role="switch"
          aria-checked={config.skipInvalid}
        >
          <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200", config.skipInvalid && "translate-x-5")} />
        </button>
      </div>
    </div>
  );
}
