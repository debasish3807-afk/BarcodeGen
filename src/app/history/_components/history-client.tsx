"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Search, Trash2, Download, ScanBarcode, QrCode, Cloud, LogIn } from "lucide-react";
import Link from "next/link";
import { getHistory, removeFromHistory, clearHistory, exportHistory, type HistoryItem } from "../_lib/history-storage";
import { useAuth } from "@/hooks/useAuth";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type FilterType = "all" | "barcode" | "qr";

export function HistoryClient() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    if (isAuthenticated) setHistory(getHistory());
  }, [isAuthenticated]);

  const refresh = () => setHistory(getHistory());

  // Guest state - show sign-in prompt
  if (!authLoading && !isAuthenticated) {
    return (
      <Container>
        <div className="text-center py-20 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-4">
            <Cloud className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">Sign in to access History</h3>
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">Create a free account to save your barcode generation history across all your devices.</p>
          <Link href="/sign-in?next=/history" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all">
            <LogIn className="h-4 w-4" />Sign In to Continue
          </Link>
          <p className="text-xs text-surface-400 mt-4">Guests can still generate and download barcodes — no sign-in required.</p>
        </div>
      </Container>
    );
  }
  const handleDelete = (id: string) => { removeFromHistory(id); refresh(); };
  const handleClearAll = () => { if (confirm("Clear all history?")) { clearHistory(); refresh(); } };
  const handleExport = () => {
    const json = exportHistory();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "barcodegen-history.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = history
    .filter((h) => filter === "all" || h.type === filter)
    .filter((h) => !search || h.value.toLowerCase().includes(search.toLowerCase()) || h.format.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search history..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" aria-label="Search history" />
        </div>
        <div className="flex gap-2">
          {(["all", "barcode", "qr"] as FilterType[]).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("px-3 py-2 rounded-xl text-xs font-semibold border transition-all capitalize", filter === f ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300" : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50")} aria-pressed={filter === f}>
              {f}
            </button>
          ))}
          <button onClick={handleExport} disabled={history.length === 0} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-700 text-xs font-medium hover:bg-surface-50 dark:hover:bg-surface-800 disabled:opacity-50 transition-colors" aria-label="Export">
            <Download className="h-3.5 w-3.5" />Export
          </button>
          <button onClick={handleClearAll} disabled={history.length === 0} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 dark:border-red-900 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-50 transition-colors" aria-label="Clear all">
            <Trash2 className="h-3.5 w-3.5" />Clear
          </button>
        </div>
      </div>


      {/* List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center gap-4 p-4 bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 hover:shadow-sm transition-all">
                {/* Preview */}
                <div className="w-14 h-14 flex-shrink-0 rounded-lg border border-surface-200 dark:border-surface-700 bg-white overflow-hidden flex items-center justify-center">
                  {item.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.preview} alt="Preview" className="w-full h-full object-contain" />
                  ) : item.type === "barcode" ? (
                    <ScanBarcode className="h-6 w-6 text-surface-300" />
                  ) : (
                    <QrCode className="h-6 w-6 text-surface-300" />
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{item.value}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-surface-500 dark:text-surface-400">
                    <span className={cn("px-1.5 py-0.5 rounded font-medium", item.type === "barcode" ? "bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400" : "bg-accent-50 text-accent-600 dark:bg-accent-950/50 dark:text-accent-400")}>{item.format}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors" aria-label="Delete">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-20">
          <Clock className="h-16 w-16 mx-auto text-surface-300 dark:text-surface-600 mb-4" />
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">No History Yet</h3>
          <p className="text-sm text-surface-500 dark:text-surface-400 max-w-sm mx-auto">Your recently generated barcodes and QR codes will appear here.</p>
        </div>
      )}
    </Container>
  );
}
