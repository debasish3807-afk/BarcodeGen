"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { BarcodeOptions, BarcodeFormat, ValidationResult } from "../_types";
import { DEFAULT_BARCODE_OPTIONS } from "../_types";
import { getFormatConfig } from "../_lib/barcode-formats";

export function useBarcodeGenerator() {
  const [options, setOptions] = useState<BarcodeOptions>(DEFAULT_BARCODE_OPTIONS);
  const [validation, setValidation] = useState<ValidationResult>({ valid: true, message: "Valid" });
  const [isGenerated, setIsGenerated] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Validate whenever value or format changes
  useEffect(() => {
    const config = getFormatConfig(options.format);
    if (config) {
      const result = config.validate(options.value);
      setValidation(result);
    }
  }, [options.value, options.format]);

  const updateOption = useCallback(<K extends keyof BarcodeOptions>(
    key: K,
    value: BarcodeOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setFormat = useCallback((format: BarcodeFormat) => {
    const config = getFormatConfig(format);
    setOptions((prev) => ({
      ...prev,
      format,
      value: config?.defaultValue || prev.value,
    }));
    setIsGenerated(false);
  }, []);

  const reset = useCallback(() => {
    setOptions(DEFAULT_BARCODE_OPTIONS);
    setIsGenerated(false);
  }, []);

  const generate = useCallback(() => {
    if (validation.valid) {
      setIsGenerated(true);
    }
  }, [validation.valid]);

  return {
    options,
    validation,
    isGenerated,
    svgRef,
    canvasRef,
    updateOption,
    setFormat,
    reset,
    generate,
    setOptions,
  };
}
