"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { QROptions, QRType, ValidationResult } from "../_types";
import { DEFAULT_QR_OPTIONS } from "../_types";
import { getQRTypeConfig } from "../_lib/qr-types";

export function useQRGenerator() {
  const [options, setOptions] = useState<QROptions>(DEFAULT_QR_OPTIONS);
  const [validation, setValidation] = useState<ValidationResult>({ valid: true, message: "Valid URL" });
  const [encodedData, setEncodedData] = useState<string>("https://barcodegen.com");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Validate + encode whenever data or type changes
  useEffect(() => {
    const config = getQRTypeConfig(options.type);
    if (config) {
      const result = config.validate(options.data);
      setValidation(result);
      if (result.valid) {
        setEncodedData(config.encode(options.data));
      }
    }
  }, [options.data, options.type]);

  const updateOption = useCallback(<K extends keyof QROptions>(
    key: K,
    value: QROptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateData = useCallback((
    key: string,
    value: unknown
  ) => {
    setOptions((prev) => ({
      ...prev,
      data: { ...prev.data, [key]: value },
    }));
  }, []);

  const setType = useCallback((type: QRType) => {
    const config = getQRTypeConfig(type);
    setOptions((prev) => ({
      ...prev,
      type,
      data: config?.defaultData || prev.data,
    }));
  }, []);

  const reset = useCallback(() => {
    setOptions(DEFAULT_QR_OPTIONS);
    setEncodedData("https://barcodegen.com");
  }, []);

  return {
    options,
    validation,
    encodedData,
    canvasRef,
    updateOption,
    updateData,
    setType,
    reset,
    setOptions,
  };
}
