"use client";

import { motion } from "framer-motion";
import { Settings2, Eye } from "lucide-react";
import { useState } from "react";
import { useBarcodeGenerator } from "../_hooks/useBarcodeGenerator";
import { BarcodePreview } from "./barcode-preview";
import { FormatSelector } from "./format-selector";
import { CustomizationPanel } from "./customization-panel";
import { ActionsToolbar } from "./actions-toolbar";
import { ValueInput } from "./value-input";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type ActiveTab = "format" | "customize";

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

  const [activeTab, setActiveTab] = useState<ActiveTab>("format");

  return (
    <Container>
      <div className="grid lg:grid-cols-[1fr_420px] gap-6 lg:gap-8">
        {/* Left Column - Preview & Input */}
        <div className="space-y-6">
          {/* Value Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm"
          >
            <ValueInput
              value={options.value}
              format={options.format}
              validation={validation}
              onChange={(v) => updateOption("value", v)}
            />
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                Live Preview
              </h3>
              {validation.valid && options.value && (
                <span className="ml-auto text-xs text-surface-500 dark:text-surface-400">
                  Updates in real-time
                </span>
              )}
            </div>
            <BarcodePreview
              options={options}
              validation={validation}
              svgRef={svgRef}
            />
          </motion.div>

          {/* Actions - visible on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:hidden bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm"
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

        {/* Right Column - Settings Sidebar */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex border-b border-surface-200 dark:border-surface-800">
              <button
                onClick={() => setActiveTab("format")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors relative",
                  activeTab === "format"
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300"
                )}
                aria-selected={activeTab === "format"}
                role="tab"
              >
                <Eye className="h-4 w-4" />
                Format
                {activeTab === "format" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("customize")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors relative",
                  activeTab === "customize"
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300"
                )}
                aria-selected={activeTab === "customize"}
                role="tab"
              >
                <Settings2 className="h-4 w-4" />
                Customize
                {activeTab === "customize" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                  />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-5 max-h-[600px] overflow-y-auto">
              {activeTab === "format" ? (
                <FormatSelector
                  selectedFormat={options.format}
                  onFormatChange={setFormat}
                />
              ) : (
                <CustomizationPanel
                  options={options}
                  onOptionChange={updateOption}
                />
              )}
            </div>
          </motion.div>

          {/* Actions - desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="hidden lg:block bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm"
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
    </Container>
  );
}
