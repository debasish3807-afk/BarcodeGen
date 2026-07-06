"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings2, Eye, QrCode } from "lucide-react";
import { useQRGenerator } from "../_hooks/useQRGenerator";
import { QRTypeSelector } from "./qr-type-selector";
import { QRDataForm } from "./qr-data-forms";
import { QRPreview } from "./qr-preview";
import { QRCustomizationPanel } from "./qr-customization-panel";
import { QRActionsToolbar } from "./qr-actions-toolbar";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type ActiveTab = "data" | "customize";

export function QRGeneratorClient() {
  const { options, validation, encodedData, canvasRef, updateOption, updateData, setType, reset } = useQRGenerator();
  const [activeTab, setActiveTab] = useState<ActiveTab>("data");
  const handleGenerate = () => {};

  return (
    <Container>
      <div className="grid lg:grid-cols-[1fr_420px] gap-6 lg:gap-8">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm">
            <QRTypeSelector selectedType={options.type} onTypeChange={setType} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="h-4 w-4 text-accent-600 dark:text-accent-400" />
              <h3 className="text-sm font-bold text-surface-900 dark:text-white">Live Preview</h3>
              {validation.valid && encodedData && (<span className="ml-auto text-xs text-surface-500 dark:text-surface-400">Updates in real-time</span>)}
            </div>
            <QRPreview options={options} validation={validation} encodedData={encodedData} canvasRef={canvasRef} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="lg:hidden bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm">
            <QRActionsToolbar options={options} validation={validation} encodedData={encodedData} canvasRef={canvasRef} onGenerate={handleGenerate} onReset={reset} />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm overflow-hidden">
            <div className="flex border-b border-surface-200 dark:border-surface-800">
              <button onClick={() => setActiveTab("data")} className={cn("flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors relative", activeTab === "data" ? "text-primary-600 dark:text-primary-400" : "text-surface-500 dark:text-surface-400")} aria-selected={activeTab === "data"} role="tab">
                <Eye className="h-4 w-4" />Data
                {activeTab === "data" && <motion.div layoutId="qrTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
              </button>
              <button onClick={() => setActiveTab("customize")} className={cn("flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors relative", activeTab === "customize" ? "text-primary-600 dark:text-primary-400" : "text-surface-500 dark:text-surface-400")} aria-selected={activeTab === "customize"} role="tab">
                <Settings2 className="h-4 w-4" />Customize
                {activeTab === "customize" && <motion.div layoutId="qrTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
              </button>
            </div>
            <div className="p-5 max-h-[600px] overflow-y-auto">
              {activeTab === "data" ? (
                <QRDataForm type={options.type} data={options.data} validation={validation} onDataChange={updateData} />
              ) : (
                <QRCustomizationPanel options={options} onOptionChange={updateOption} />
              )}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="hidden lg:block bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 shadow-sm">
            <QRActionsToolbar options={options} validation={validation} encodedData={encodedData} canvasRef={canvasRef} onGenerate={handleGenerate} onReset={reset} />
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
