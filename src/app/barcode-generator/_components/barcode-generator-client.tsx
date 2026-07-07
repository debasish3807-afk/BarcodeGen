"use client";

import { motion } from "framer-motion";
import { Settings2, Eye, ChevronDown, ScanBarcode } from "lucide-react";
import { useState } from "react";
import { useBarcodeGenerator } from "../_hooks/useBarcodeGenerator";
import { BarcodePreview } from "./barcode-preview";
import { FormatSelector } from "./format-selector";
import { CustomizationPanel } from "./customization-panel";
import { ActionsToolbar } from "./actions-toolbar";
import { ValueInput } from "./value-input";
import { cn } from "@/lib/utils";

export function BarcodeGeneratorClient() {
  const { options, validation, svgRef, updateOption, setFormat, reset, generate } = useBarcodeGenerator();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">

        {/* ========== LEFT: Barcode Types ========== */}
        <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0 lg:pr-6">
          {/* Mobile toggle */}
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="w-full lg:hidden flex items-center justify-between p-4 mb-4 bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800"
            aria-expanded={showMobileSidebar}
            aria-label="Toggle barcode types"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-surface-900 dark:text-white">
              <ScanBarcode className="h-4 w-4 text-primary-600" />
              Barcode Types
              <span className="text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 px-2 py-0.5 rounded-md">{options.format}</span>
            </span>
            <ChevronDown className={cn("h-4 w-4 text-surface-400 transition-transform", showMobileSidebar && "rotate-180")} />
          </button>

          {/* Sidebar content */}
          <div className={cn(
            "lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto",
            "bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-4",
            showMobileSidebar ? "block mb-6" : "hidden"
          )}>
            <FormatSelector
              selectedFormat={options.format}
              onFormatChange={(f) => { setFormat(f); setShowMobileSidebar(false); }}
            />
          </div>
        </aside>

        {/* ========== CENTER: Input + Options + Advanced ========== */}
        <main className="flex-1 min-w-0 space-y-5 lg:border-l lg:border-r border-surface-200 dark:border-surface-800 lg:px-6">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5"
          >
            <ValueInput
              value={options.value}
              format={options.format}
              validation={validation}
              onChange={(v) => updateOption("value", v)}
            />
          </motion.div>

          {/* Advanced Options (Accordion) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 overflow-hidden"
          >
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between p-5 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
              aria-expanded={showAdvanced}
              aria-label="Toggle advanced options"
            >
              <span className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-semibold text-surface-900 dark:text-white">Advanced Options</span>
                <span className="text-xs text-surface-400">Width, height, colors, rotation, DPI</span>
              </span>
              <ChevronDown className={cn("h-4 w-4 text-surface-400 transition-transform duration-200", showAdvanced && "rotate-180")} />
            </button>
            {showAdvanced && (
              <div className="border-t border-surface-200 dark:border-surface-800 p-5">
                <CustomizationPanel options={options} onOptionChange={updateOption} />
              </div>
            )}
          </motion.div>

          {/* Mobile: Preview + Actions below center */}
          <div className="lg:hidden space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-semibold text-surface-900 dark:text-white">Live Preview</span>
              </div>
              <BarcodePreview options={options} validation={validation} svgRef={svgRef} />
            </motion.div>
            <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5">
              <ActionsToolbar options={options} validation={validation} svgRef={svgRef} onGenerate={generate} onReset={reset} />
            </div>
          </div>
        </main>

        {/* ========== RIGHT: Live Preview + Download + Actions ========== */}
        <aside className="hidden lg:block w-[320px] xl:w-[360px] flex-shrink-0 lg:pl-6">
          <div className="sticky top-24 space-y-5">
            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-semibold text-surface-900 dark:text-white">Live Preview</span>
                {validation.valid && options.value && (
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <BarcodePreview options={options} validation={validation} svgRef={svgRef} />
            </motion.div>

            {/* Download / PNG / SVG / PDF / Print / Share */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5"
            >
              <ActionsToolbar options={options} validation={validation} svgRef={svgRef} onGenerate={generate} onReset={reset} />
            </motion.div>
          </div>
        </aside>
      </div>
    </div>
  );
}
