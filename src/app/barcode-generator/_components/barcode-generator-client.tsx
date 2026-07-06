"use client";

import { motion } from "framer-motion";
import {
  Settings2,
  Eye,
  ChevronDown,
  ScanBarcode,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useBarcodeGenerator } from "../_hooks/useBarcodeGenerator";
import { BarcodePreview } from "./barcode-preview";
import { FormatSelector } from "./format-selector";
import { CustomizationPanel } from "./customization-panel";
import { ActionsToolbar } from "./actions-toolbar";
import { ValueInput } from "./value-input";
import { cn } from "@/lib/utils";

export function BarcodeGeneratorClient() {
  const {
    options,
    validation,
    svgRef,
    updateOption,
    setFormat,
    reset,
    generate,
  } = useBarcodeGenerator();

  const [showCustomization, setShowCustomization] = useState(false);
  const [showMobileFormat, setShowMobileFormat] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Header - integrated into the generator */}
      <div className="border-b border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-600 text-white shadow-sm">
                <ScanBarcode className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-surface-900 dark:text-white tracking-tight">
                  Barcode Generator
                </h1>
                <p className="hidden sm:block text-xs text-surface-500 dark:text-surface-400">
                  Create, customize, and export professional barcodes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 rounded-lg">
                <Sparkles className="h-3 w-3" />
                Real-time preview
              </span>
              <span className="px-3 py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 rounded-lg border border-primary-200/60 dark:border-primary-800/40">
                {options.format}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-panel layout */}
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
          {/* LEFT PANEL - Format Selector Sidebar */}
          <aside className="w-full lg:w-72 xl:w-80 border-b lg:border-b-0 lg:border-r border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 flex-shrink-0">
            {/* Mobile toggle */}
            <button
              onClick={() => setShowMobileFormat(!showMobileFormat)}
              className="w-full lg:hidden flex items-center justify-between px-4 py-3 text-sm font-semibold text-surface-700 dark:text-surface-300"
              aria-expanded={showMobileFormat}
            >
              <span className="flex items-center gap-2">
                <ScanBarcode className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                Format: {options.format}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  showMobileFormat && "rotate-180"
                )}
              />
            </button>

            {/* Format content */}
            <div
              className={cn(
                "lg:block overflow-y-auto lg:h-[calc(100vh-5rem)] px-4 py-4 lg:py-6",
                showMobileFormat ? "block" : "hidden"
              )}
            >
              <FormatSelector
                selectedFormat={options.format}
                onFormatChange={(format) => {
                  setFormat(format);
                  setShowMobileFormat(false);
                }}
              />
            </div>
          </aside>

          {/* CENTER PANEL - Input & Customization */}
          <main className="flex-1 min-w-0 overflow-y-auto lg:h-[calc(100vh-5rem)]">
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-3xl mx-auto">
              {/* Value Input Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 sm:p-6 shadow-sm"
              >
                <ValueInput
                  value={options.value}
                  format={options.format}
                  validation={validation}
                  onChange={(v) => updateOption("value", v)}
                />
              </motion.div>

              {/* Customization Accordion */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
                  aria-expanded={showCustomization}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings2 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-bold text-surface-900 dark:text-white">
                      Customization
                    </span>
                    <span className="text-xs text-surface-500 dark:text-surface-400">
                      Dimensions, typography, colors
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-surface-400 transition-transform duration-200",
                      showCustomization && "rotate-180"
                    )}
                  />
                </button>

                {/* Accordion Content */}
                {showCustomization && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-surface-200 dark:border-surface-800"
                  >
                    <div className="px-5 sm:px-6 py-5">
                      <CustomizationPanel
                        options={options}
                        onOptionChange={updateOption}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Mobile/Tablet Preview - shown below center on small screens */}
              <div className="lg:hidden space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                      Live Preview
                    </h3>
                    {validation.valid && options.value && (
                      <span className="ml-auto text-xs text-surface-500 dark:text-surface-400">
                        Real-time
                      </span>
                    )}
                  </div>
                  <BarcodePreview
                    options={options}
                    validation={validation}
                    svgRef={svgRef}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 sm:p-6 shadow-sm"
                >
                  <ActionsToolbar
                    options={options}
                    validation={validation}
                    svgRef={svgRef}
                    onGenerate={generate}
                    onReset={reset}
                  />
                </motion.div>
              </div>
            </div>
          </main>

          {/* RIGHT PANEL - Sticky Preview & Actions */}
          <aside className="hidden lg:block w-80 xl:w-96 border-l border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 flex-shrink-0">
            <div className="sticky top-0 h-[calc(100vh-5rem)] overflow-y-auto p-6 space-y-6">
              {/* Live Preview */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                    Live Preview
                  </h3>
                  {validation.valid && options.value && (
                    <span className="ml-auto flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
                <BarcodePreview
                  options={options}
                  validation={validation}
                  svgRef={svgRef}
                />
              </motion.div>

              {/* Divider */}
              <div className="border-t border-surface-200 dark:border-surface-800" />

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <ActionsToolbar
                  options={options}
                  validation={validation}
                  svgRef={svgRef}
                  onGenerate={generate}
                  onReset={reset}
                />
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
