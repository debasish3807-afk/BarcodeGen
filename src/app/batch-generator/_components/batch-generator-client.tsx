"use client";

import { motion } from "framer-motion";
import { useBatchGenerator } from "../_hooks/useBatchGenerator";
import { BatchConfigPanel } from "./batch-config-panel";
import { BatchInput } from "./batch-input";
import { BatchTable } from "./batch-table";
import { BatchProgressBar } from "./batch-progress";
import { BatchActions } from "./batch-actions";
import { Container } from "@/components/ui/container";

export function BatchGeneratorClient() {
  const {
    config, items, progress, jobStatus,
    addItems, generateAll, pause, resume,
    cancel, retryFailed, clearAll, updateConfig,
  } = useBatchGenerator();

  return (
    <Container>
      <div className="grid lg:grid-cols-[360px_1fr] gap-6 lg:gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <BatchConfigPanel config={config} onConfigChange={updateConfig} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
            <BatchInput config={config} onDataParsed={addItems} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <BatchActions items={items} config={config} jobStatus={jobStatus} onGenerate={generateAll} onPause={pause} onResume={resume} onCancel={cancel} onRetryFailed={retryFailed} onClear={clearAll} />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <BatchProgressBar progress={progress} jobStatus={jobStatus} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
            <BatchTable items={items} />
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
