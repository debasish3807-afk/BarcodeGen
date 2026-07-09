"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ScanBarcode, QrCode, Copy, Download, Check, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// Interactive Demo Section - Live barcode/QR preview
// ======================

const DEMO_TABS = ["barcode", "qr"] as const;
type DemoTab = (typeof DEMO_TABS)[number];

// Simple barcode visual based on input text
function DemoBarcode({ value }: { value: string }) {
  const bars = value.split("").map((char, i) => {
    const code = char.charCodeAt(0);
    return {
      width: (code % 3) + 1,
      height: 60 + (code % 40),
      key: `${i}-${char}`,
    };
  });

  return (
    <div className="flex items-end justify-center gap-[1.5px] h-32 w-full max-w-[280px] mx-auto">
      {bars.map((bar) => (
        <motion.div
          key={bar.key}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface-900 dark:bg-white rounded-[1px] origin-bottom"
          style={{ width: `${bar.width + 1}px`, height: `${bar.height}%` }}
        />
      ))}
      {/* Guard bars */}
      {bars.length === 0 && (
        <span className="text-sm text-surface-400 dark:text-surface-500">
          Type something to generate...
        </span>
      )}
    </div>
  );
}

// Simple QR pattern based on input
function DemoQR({ value }: { value: string }) {
  const size = 11;
  const cells: boolean[][] = [];

  for (let r = 0; r < size; r++) {
    cells[r] = [];
    for (let c = 0; c < size; c++) {
      // Finder patterns (corners)
      const isFinderTL = r < 3 && c < 3;
      const isFinderTR = r < 3 && c >= size - 3;
      const isFinderBL = r >= size - 3 && c < 3;
      if (isFinderTL || isFinderTR || isFinderBL) {
        cells[r][c] = true;
      } else {
        // Data cells based on input
        const idx = r * size + c;
        const charCode = value.length > 0
          ? value.charCodeAt(idx % value.length)
          : 0;
        cells[r][c] = (charCode + idx) % 3 !== 0;
      }
    }
  }

  return (
    <div className="grid gap-[2px] w-fit mx-auto" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {cells.map((row, r) =>
        row.map((filled, c) => (
          <motion.div
            key={`${r}-${c}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: (r * size + c) * 0.003 }}
            className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] ${
              filled
                ? "bg-surface-900 dark:bg-white"
                : "bg-surface-100 dark:bg-surface-800"
            }`}
          />
        ))
      )}
    </div>
  );
}

export function InteractiveDemoSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<DemoTab>("barcode");
  const [inputValue, setInputValue] = useState("BarcodeGen");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <Section variant="muted" spacing="lg" className="relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <Container size="md">
        <SectionHeader
          badge="Interactive Demo"
          title="Try It Right Now"
          subtitle="Type anything below and watch your barcode or QR code generate in real-time. No signup required."
        />

        {/* Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/5 to-accent-500/10 rounded-[28px] blur-2xl -z-10 scale-95" />

          <div className="bg-white dark:bg-surface-900 rounded-[24px] border border-surface-200/60 dark:border-surface-700/30 shadow-xl shadow-primary-500/[0.04] overflow-hidden">
            {/* Tab switcher */}
            <div className="flex border-b border-surface-100 dark:border-surface-800">
              {DEMO_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-200 relative ${
                    activeTab === tab
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                  }`}
                >
                  {tab === "barcode" ? (
                    <ScanBarcode className="h-4 w-4" />
                  ) : (
                    <QrCode className="h-4 w-4" />
                  )}
                  {tab === "barcode" ? t.nav.barcodeGenerator : t.nav.qrGenerator}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="demo-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {/* Input */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
                  {activeTab === "barcode" ? "Barcode Value" : "QR Content"}
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={activeTab === "barcode" ? "Enter product code..." : "Enter URL or text..."}
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/60 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 text-sm font-mono transition-all"
                  maxLength={40}
                />
              </div>

              {/* Preview */}
              <div className="flex items-center justify-center min-h-[160px] p-6 bg-surface-50/60 dark:bg-surface-800/30 rounded-2xl border border-surface-100 dark:border-surface-700/40 mb-6">
                {activeTab === "barcode" ? (
                  <DemoBarcode value={inputValue} />
                ) : (
                  <DemoQR value={inputValue} />
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? t.common.copiedToClipboard : t.common.copy}
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-sm font-semibold hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                  <Download className="h-4 w-4" />
                  {t.common.download}
                </button>
                <div className="ml-auto">
                  <span className="inline-flex items-center gap-1.5 text-xs text-surface-400 dark:text-surface-500">
                    <Sparkles className="h-3.5 w-3.5" />
                    Real-time preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
