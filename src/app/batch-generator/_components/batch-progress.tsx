"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Loader2, SkipForward } from "lucide-react";
import type { BatchProgress, BatchJobStatus } from "../_types";
import { cn } from "@/lib/utils";

interface BatchProgressBarProps {
  progress: BatchProgress;
  jobStatus: BatchJobStatus;
}

export function BatchProgressBar({ progress, jobStatus }: BatchProgressBarProps) {
  if (progress.total === 0) return null;

  const isActive = jobStatus === "running" || jobStatus === "paused";

  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-surface-900 dark:text-white flex items-center gap-2">
          {jobStatus === "running" && <Loader2 className="h-4 w-4 animate-spin text-primary-600" />}
          {jobStatus === "paused" && <Clock className="h-4 w-4 text-yellow-600" />}
          {jobStatus === "completed" && <CheckCircle className="h-4 w-4 text-green-600" />}
          {jobStatus === "cancelled" && <XCircle className="h-4 w-4 text-red-600" />}
          Progress
        </h3>
        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {progress.percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute top-0 left-0 h-full rounded-full",
            jobStatus === "paused" ? "bg-yellow-500" : jobStatus === "cancelled" ? "bg-red-500" : "bg-gradient-to-r from-primary-500 to-accent-500"
          )}
        />
        {isActive && (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="h-full w-full animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="text-center p-2 rounded-lg bg-surface-50 dark:bg-surface-800">
          <p className="text-lg font-bold text-surface-900 dark:text-white">{progress.total}</p>
          <p className="text-[10px] text-surface-500 uppercase tracking-wide">Total</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-surface-50 dark:bg-surface-800">
          <p className="text-lg font-bold text-surface-900 dark:text-white">{progress.processed}</p>
          <p className="text-[10px] text-surface-500 uppercase tracking-wide">Processed</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
          <p className="text-lg font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" />{progress.success}
          </p>
          <p className="text-[10px] text-surface-500 uppercase tracking-wide">Success</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-red-50 dark:bg-red-950/30">
          <p className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-1">
            <XCircle className="h-3.5 w-3.5" />{progress.failed}
          </p>
          <p className="text-[10px] text-surface-500 uppercase tracking-wide">Failed</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-surface-50 dark:bg-surface-800">
          <p className="text-lg font-bold text-surface-600 dark:text-surface-400 flex items-center justify-center gap-1">
            <SkipForward className="h-3.5 w-3.5" />{progress.skipped}
          </p>
          <p className="text-[10px] text-surface-500 uppercase tracking-wide">Skipped</p>
        </div>
      </div>

      {/* Remaining Time */}
      {isActive && (
        <p className="text-xs text-surface-500 dark:text-surface-400 text-center">
          Estimated time remaining: <span className="font-semibold text-surface-700 dark:text-surface-300">{progress.estimatedRemaining}</span>
        </p>
      )}
    </div>
  );
}
