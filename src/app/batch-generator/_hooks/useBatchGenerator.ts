"use client";

import { useState, useCallback, useRef } from "react";
import type { BatchItem, BatchConfig, BatchProgress, BatchJobStatus } from "../_types";
import { DEFAULT_BATCH_CONFIG, DEFAULT_PROGRESS } from "../_types";
import { validateBarcodeValue, validateQRValue } from "../_lib/batch-validator";
import { renderBatchItem } from "../_lib/batch-renderer";
import type { ParsedRow } from "../_lib/file-parser";

export function useBatchGenerator() {
  const [config, setConfig] = useState<BatchConfig>(DEFAULT_BATCH_CONFIG);
  const [items, setItems] = useState<BatchItem[]>([]);
  const [progress, setProgress] = useState<BatchProgress>(DEFAULT_PROGRESS);
  const [jobStatus, setJobStatus] = useState<BatchJobStatus>("idle");
  const abortRef = useRef(false);
  const pauseRef = useRef(false);

  // Add items from parsed rows
  const addItems = useCallback((rows: ParsedRow[]) => {
    const newItems: BatchItem[] = rows.map((row) => {
      const validation = config.mode === "barcode"
        ? validateBarcodeValue(row.value, config.format)
        : validateQRValue(row.value, config.format);

      return {
        id: `${Date.now()}-${row.rowNumber}-${Math.random().toString(36).substring(7)}`,
        rowNumber: row.rowNumber,
        inputData: row.value,
        format: config.format,
        type: config.mode,
        status: validation.valid ? "pending" : (config.skipInvalid ? "skipped" : "pending"),
        error: validation.valid ? null : validation.message,
        preview: null,
      };
    });

    setItems((prev) => [...prev, ...newItems]);
    setProgress((prev) => ({ ...prev, total: prev.total + newItems.length }));
  }, [config]);

  // Generate all items
  const generateAll = useCallback(async () => {
    abortRef.current = false;
    pauseRef.current = false;
    setJobStatus("running");

    const startTime = Date.now();
    setProgress((prev) => ({ ...prev, startTime, processed: 0, success: 0, failed: 0 }));

    const pendingItems = items.filter((item) => item.status === "pending" || item.status === "failed");

    for (let i = 0; i < pendingItems.length; i++) {
      if (abortRef.current) {
        setJobStatus("cancelled");
        return;
      }

      // Handle pause
      while (pauseRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (abortRef.current) {
          setJobStatus("cancelled");
          return;
        }
      }

      const item = pendingItems[i];

      // Update status to processing
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: "processing" as const } : it))
      );

      try {
        const result = await renderBatchItem(item.inputData, config);
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: "success" as const, preview: result.png, error: null }
              : it
          )
        );
        setProgress((prev) => {
          const processed = prev.processed + 1;
          const elapsed = Date.now() - (prev.startTime || Date.now());
          const rate = processed / (elapsed / 1000);
          const remaining = Math.ceil((pendingItems.length - processed) / rate);
          return {
            ...prev,
            processed,
            success: prev.success + 1,
            percentage: Math.round((processed / pendingItems.length) * 100),
            estimatedRemaining: remaining > 60 ? `${Math.ceil(remaining / 60)}m` : `${remaining}s`,
          };
        });
      } catch (err) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: "failed" as const, error: err instanceof Error ? err.message : "Render failed" }
              : it
          )
        );
        setProgress((prev) => ({
          ...prev,
          processed: prev.processed + 1,
          failed: prev.failed + 1,
          percentage: Math.round(((prev.processed + 1) / pendingItems.length) * 100),
        }));
      }

      // Small delay for UI responsiveness (batch of 10)
      if (i % 10 === 9) {
        await new Promise((resolve) => setTimeout(resolve, 16));
      }
    }

    setJobStatus("completed");
  }, [items, config]);

  // Pause
  const pause = useCallback(() => {
    pauseRef.current = true;
    setJobStatus("paused");
  }, []);

  // Resume
  const resume = useCallback(() => {
    pauseRef.current = false;
    setJobStatus("running");
  }, []);

  // Cancel
  const cancel = useCallback(() => {
    abortRef.current = true;
    pauseRef.current = false;
    setJobStatus("cancelled");
  }, []);

  // Retry failed
  const retryFailed = useCallback(() => {
    setItems((prev) =>
      prev.map((item) =>
        item.status === "failed" ? { ...item, status: "pending", error: null, preview: null } : item
      )
    );
  }, []);

  // Clear all
  const clearAll = useCallback(() => {
    setItems([]);
    setProgress(DEFAULT_PROGRESS);
    setJobStatus("idle");
    abortRef.current = false;
    pauseRef.current = false;
  }, []);

  // Update config
  const updateConfig = useCallback(<K extends keyof BatchConfig>(key: K, value: BatchConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    config,
    items,
    progress,
    jobStatus,
    addItems,
    generateAll,
    pause,
    resume,
    cancel,
    retryFailed,
    clearAll,
    updateConfig,
  };
}
