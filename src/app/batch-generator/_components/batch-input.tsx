"use client";

import { useState, useRef } from "react";
import { Upload, FileText, FileSpreadsheet, FileJson, Clipboard, Type, AlertCircle } from "lucide-react";
import type { BatchConfig } from "../_types";
import { parseFile, parseManual } from "../_lib/file-parser";
import type { ParsedRow } from "../_lib/file-parser";
import { cn } from "@/lib/utils";

interface BatchInputProps {
  config: BatchConfig;
  onDataParsed: (rows: ParsedRow[]) => void;
}

export function BatchInput({ config, onDataParsed }: BatchInputProps) {
  const [manualText, setManualText] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [activeInput, setActiveInput] = useState<"file" | "manual" | "paste">("file");
  const [error, setError] = useState<string | null>(null);
  const [lastFileInfo, setLastFileInfo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    try {
      const rows = await parseFile(file);
      if (rows.length === 0) {
        setError("No valid data found in file.");
        return;
      }
      setLastFileInfo(`${file.name} — ${rows.length} rows`);
      onDataParsed(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
    }

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleManualSubmit = () => {
    setError(null);
    if (!manualText.trim()) {
      setError("Please enter at least one value.");
      return;
    }
    const rows = parseManual(manualText);
    if (rows.length === 0) {
      setError("No valid data found.");
      return;
    }
    onDataParsed(rows);
    setManualText("");
  };

  const handlePasteSubmit = () => {
    setError(null);
    if (!pasteText.trim()) {
      setError("Please paste your data first.");
      return;
    }
    const rows = parseManual(pasteText);
    if (rows.length === 0) {
      setError("No valid data found.");
      return;
    }
    onDataParsed(rows);
    setPasteText("");
  };

  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-surface-900 dark:text-white flex items-center gap-2">
        <Upload className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        Input Data
      </h3>

      {/* Input Method Tabs */}
      <div className="flex gap-1 p-1 bg-surface-100 dark:bg-surface-800 rounded-xl">
        {([
          { key: "file" as const, icon: FileText, label: "File" },
          { key: "manual" as const, icon: Type, label: "Manual" },
          { key: "paste" as const, icon: Clipboard, label: "Paste" },
        ]).map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setActiveInput(key)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
              activeInput === key
                ? "bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-400 shadow-sm"
                : "text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300"
            )}
            aria-pressed={activeInput === key}
          >
            <Icon className="h-3.5 w-3.5" />{label}
          </button>
        ))}
      </div>

      {/* File Upload */}
      {activeInput === "file" && (
        <div className="space-y-3">
          <input ref={fileRef} type="file" accept=".csv,.txt,.json,.xlsx,.xls" onChange={handleFileUpload} className="hidden" id="batch-file-input" aria-label="Upload file" />
          <label htmlFor="batch-file-input" className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-surface-400" />
              <FileSpreadsheet className="h-5 w-5 text-surface-400" />
              <FileJson className="h-5 w-5 text-surface-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-surface-700 dark:text-surface-300">Drop file or click to upload</p>
              <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">CSV, TXT, JSON, XLSX • One value per row</p>
            </div>
          </label>
          {lastFileInfo && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">✓ {lastFileInfo}</p>
          )}
        </div>
      )}

      {/* Manual Input */}
      {activeInput === "manual" && (
        <div className="space-y-3">
          <textarea
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder={`Enter one ${config.mode === "barcode" ? "barcode value" : "QR data"} per line...\n\nExample:\nBARCODE001\nBARCODE002\nBARCODE003`}
            rows={8}
            className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
            aria-label="Manual data input"
          />
          <button onClick={handleManualSubmit} className="w-full px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
            Add to Batch
          </button>
        </div>
      )}

      {/* Paste Input */}
      {activeInput === "paste" && (
        <div className="space-y-3">
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Paste your data here (one value per line)..."
            rows={8}
            className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
            aria-label="Paste data input"
          />
          <button onClick={handlePasteSubmit} className="w-full px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
            Add to Batch
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-medium" role="alert">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />{error}
        </div>
      )}
    </div>
  );
}
