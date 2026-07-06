"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ScanBarcode, QrCode, Lightbulb, Send } from "lucide-react";
import { processAIQuery, AI_SUGGESTIONS, type AIResult } from "../_lib/ai-engine";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function AIGeneratorClient() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<AIResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (input?: string) => {
    const q = input || query;
    if (!q.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const r = processAIQuery(q);
      setResult(r);
      setIsProcessing(false);
    }, 600);
  };

  const handleUseResult = () => {
    if (!result) return;
    localStorage.setItem("barcodegen_template_load", JSON.stringify({ format: result.format, ...result.fields, data: result.fields }));
    window.open(result.redirect, "_self");
  };

  return (
    <Container size="md">
      {/* Input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="relative">
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} placeholder="Describe what you need... (e.g., Generate WiFi QR code for my cafe)" className="w-full pl-12 pr-24 py-4 text-base rounded-2xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" aria-label="Describe what you need" />
          <button onClick={() => handleSubmit()} disabled={!query.trim() || isProcessing} className={cn("absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-sm font-semibold transition-all", query.trim() && !isProcessing ? "bg-primary-600 text-white hover:bg-primary-700" : "bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed")}>
            {isProcessing ? <span className="animate-spin">⚙</span> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>


      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-950/20">
              <div className="flex items-start gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", result.type === "barcode" ? "bg-primary-100 dark:bg-primary-900/50" : "bg-accent-100 dark:bg-accent-900/50")}>
                  {result.type === "barcode" ? <ScanBarcode className="h-6 w-6 text-primary-600" /> : <QrCode className="h-6 w-6 text-accent-600" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-1">{result.type === "barcode" ? "Barcode" : "QR Code"} — {result.format.toUpperCase()}</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 mb-3">{result.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(result.fields).map(([k, v]) => (
                      <span key={k} className="px-2.5 py-1 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-xs font-mono">
                        <span className="text-surface-500">{k}:</span> <span className="text-surface-900 dark:text-surface-100">{String(v).substring(0, 30)}</span>
                      </span>
                    ))}
                  </div>
                  <button onClick={handleUseResult} className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                    Open in Generator <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions */}
      <div>
        <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />Try these examples
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {AI_SUGGESTIONS.map((suggestion) => (
            <button key={suggestion} onClick={() => { setQuery(suggestion); handleSubmit(suggestion); }} className="text-left px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm text-surface-700 dark:text-surface-300 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all">
              <Sparkles className="h-3.5 w-3.5 inline mr-2 text-primary-500" />{suggestion}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
}
