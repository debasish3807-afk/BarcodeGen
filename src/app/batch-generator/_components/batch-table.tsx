"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Loader2, Clock, SkipForward, ChevronLeft, ChevronRight } from "lucide-react";
import type { BatchItem } from "../_types";
import { cn } from "@/lib/utils";

interface BatchTableProps {
  items: BatchItem[];
}

const PAGE_SIZE = 50;

const statusConfig = {
  pending: { icon: Clock, color: "text-surface-400", bg: "bg-surface-100 dark:bg-surface-800", label: "Pending" },
  processing: { icon: Loader2, color: "text-primary-600 animate-spin", bg: "bg-primary-50 dark:bg-primary-950/30", label: "Processing" },
  success: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30", label: "Success" },
  failed: { icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30", label: "Failed" },
  skipped: { icon: SkipForward, color: "text-surface-400", bg: "bg-surface-100 dark:bg-surface-800", label: "Skipped" },
};


export function BatchTable({ items }: BatchTableProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const visibleItems = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (items.length === 0) return null;

  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-surface-200 dark:border-surface-800">
        <h3 className="text-sm font-bold text-surface-900 dark:text-white">
          Batch Items <span className="text-surface-500 font-normal">({items.length})</span>
        </h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 disabled:opacity-50" aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-surface-500">{page + 1}/{totalPages}</span>
            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 disabled:opacity-50" aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>


      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider w-16">#</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Data</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider w-24">Format</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-surface-500 uppercase tracking-wider w-28">Status</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-surface-500 uppercase tracking-wider w-20">Preview</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Error</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item) => {
              const st = statusConfig[item.status];
              const Icon = st.icon;
              return (
                <tr key={item.id} className="border-b border-surface-100 dark:border-surface-800/50 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                  <td className="px-4 py-2.5 text-xs text-surface-500 font-mono">{item.rowNumber}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-surface-900 dark:text-surface-100 max-w-[200px] truncate">{item.inputData}</td>
                  <td className="px-4 py-2.5 text-xs text-surface-600 dark:text-surface-400">{item.format}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", st.bg, st.color)}>
                      <Icon className="h-3 w-3" />{st.label}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {item.preview && (
                      <div className="w-10 h-10 mx-auto rounded border border-surface-200 dark:border-surface-700 overflow-hidden bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.preview} alt={`Preview ${item.rowNumber}`} className="w-full h-full object-contain" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-red-600 dark:text-red-400 max-w-[150px] truncate">{item.error || ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
