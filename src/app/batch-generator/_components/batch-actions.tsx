"use client";

import { Play, Pause, Square, Trash2, RefreshCw, Download, FileImage, FileCode, FileText, Image } from "lucide-react";
import type { BatchItem, BatchConfig, BatchJobStatus, ExportFormat } from "../_types";
import { exportBatchToZip } from "../_lib/batch-exporter";
import { cn } from "@/lib/utils";

interface BatchActionsProps {
  items: BatchItem[];
  config: BatchConfig;
  jobStatus: BatchJobStatus;
  onGenerate: () => void;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  onRetryFailed: () => void;
  onClear: () => void;
}

export function BatchActions({ items, config, jobStatus, onGenerate, onPause, onResume, onCancel, onRetryFailed, onClear }: BatchActionsProps) {
  const hasPending = items.some((i) => i.status === "pending");
  const hasFailed = items.some((i) => i.status === "failed");
  const hasSuccess = items.some((i) => i.status === "success");
  const isRunning = jobStatus === "running";
  const isPaused = jobStatus === "paused";

  const handleExport = (format: ExportFormat) => {
    exportBatchToZip(items, config, format);
  };


  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-surface-900 dark:text-white flex items-center gap-2">
        <Play className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        Batch Actions
      </h3>

      {/* Control Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {!isRunning && !isPaused && (
          <button onClick={onGenerate} disabled={!hasPending || items.length === 0} className={cn("flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all", hasPending && items.length > 0 ? "bg-primary-600 text-white hover:bg-primary-700" : "bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed")} aria-label="Generate all">
            <Play className="h-3.5 w-3.5" />Generate All
          </button>
        )}
        {isRunning && (
          <button onClick={onPause} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition-all" aria-label="Pause">
            <Pause className="h-3.5 w-3.5" />Pause
          </button>
        )}
        {isPaused && (
          <button onClick={onResume} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-green-600 text-white hover:bg-green-700 transition-all" aria-label="Resume">
            <Play className="h-3.5 w-3.5" />Resume
          </button>
        )}
        {(isRunning || isPaused) && (
          <button onClick={onCancel} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-all" aria-label="Cancel">
            <Square className="h-3.5 w-3.5" />Cancel
          </button>
        )}
        {hasFailed && !isRunning && (
          <button onClick={onRetryFailed} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-all" aria-label="Retry failed">
            <RefreshCw className="h-3.5 w-3.5" />Retry Failed
          </button>
        )}
        <button onClick={onClear} disabled={isRunning} className={cn("flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all", !isRunning ? "border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30" : "border-surface-200 text-surface-400 cursor-not-allowed")} aria-label="Clear all">
          <Trash2 className="h-3.5 w-3.5" />Clear
        </button>
      </div>


      {/* Download Actions */}
      {hasSuccess && (
        <div>
          <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Download className="h-3 w-3" />Download Batch
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {([
              { format: "png-zip" as ExportFormat, label: "PNG ZIP", icon: FileImage },
              { format: "svg-zip" as ExportFormat, label: "SVG ZIP", icon: FileCode },
              { format: "pdf" as ExportFormat, label: "PDF", icon: FileText },
              { format: "jpg-zip" as ExportFormat, label: "JPG ZIP", icon: Image },
              { format: "webp-zip" as ExportFormat, label: "WebP ZIP", icon: Image },
            ]).map(({ format, label, icon: Icon }) => (
              <button key={format} onClick={() => handleExport(format)} className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:border-primary-200 dark:hover:border-primary-800 transition-all" aria-label={`Download as ${label}`}>
                <Icon className="h-4 w-4" />{label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
