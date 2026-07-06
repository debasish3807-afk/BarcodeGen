"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Copy, ExternalLink, Check, Clock, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScanResult {
  id: string;
  text: string;
  format: string;
  timestamp: string;
}

type ScanMode = "camera" | "image";

export function ScannerClient() {
  const [mode, setMode] = useState<ScanMode>("camera");
  const [result, setResult] = useState<string | null>(null);
  const [resultFormat, setResultFormat] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrRef = useRef<unknown>(null);
  const fileRef = useRef<HTMLInputElement>(null);


  // Load scan history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("barcodegen_scan_history");
      if (stored) setHistory(JSON.parse(stored));
    } catch { /* silent */ }
  }, []);

  const saveToHistory = useCallback((text: string, format: string) => {
    const item: ScanResult = { id: `scan_${Date.now()}`, text, format, timestamp: new Date().toISOString() };
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, 50);
      localStorage.setItem("barcodegen_scan_history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const startCamera = useCallback(async () => {
    if (!scannerRef.current) return;
    setError(null);
    setIsScanning(true);

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode("scanner-region");
      html5QrRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText, decodedResult) => {
          setResult(decodedText);
          setResultFormat(decodedResult?.result?.format?.formatName || "QR Code");
          saveToHistory(decodedText, decodedResult?.result?.format?.formatName || "QR Code");
          scanner.stop().catch(() => {});
          setIsScanning(false);
        },
        () => {} // Ignore scan failures (no match yet)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Camera access denied");
      setIsScanning(false);
    }
  }, [saveToHistory]);

  const stopCamera = useCallback(async () => {
    if (html5QrRef.current) {
      try { await (html5QrRef.current as { stop: () => Promise<void> }).stop(); } catch { /* silent */ }
    }
    setIsScanning(false);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode("scanner-region-hidden");
      const decoded = await scanner.scanFile(file, true);
      setResult(decoded);
      setResultFormat("QR Code / Barcode");
      saveToHistory(decoded, "Image Scan");
      scanner.clear();
    } catch {
      setError("No barcode or QR code found in image.");
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isURL = result && /^https?:\/\//i.test(result);

  const handleDownloadResult = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "scan-result.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const clearScanHistory = () => {
    setHistory([]);
    localStorage.removeItem("barcodegen_scan_history");
  };

  // Cleanup on unmount
  useEffect(() => { return () => { stopCamera(); }; }, [stopCamera]);


  return (
    <Container>
      <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
        {/* Scanner Area */}
        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-2">
            <button onClick={() => { setMode("camera"); setResult(null); }} className={cn("flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all border-2", mode === "camera" ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300" : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400")} aria-pressed={mode === "camera"}>
              <Camera className="h-4 w-4" />Camera Scanner
            </button>
            <button onClick={() => { stopCamera(); setMode("image"); setResult(null); }} className={cn("flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all border-2", mode === "image" ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300" : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400")} aria-pressed={mode === "image"}>
              <Upload className="h-4 w-4" />Image Upload
            </button>
          </div>

          {/* Scanner Region */}
          <Card padding="lg" className="overflow-hidden">
            {mode === "camera" ? (
              <div className="space-y-4">
                <div id="scanner-region" ref={scannerRef} className="w-full min-h-[300px] rounded-xl overflow-hidden bg-surface-900" />
                {!isScanning ? (
                  <button onClick={startCamera} className="w-full px-4 py-3 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                    <Camera className="h-4 w-4 inline mr-2" />Start Scanning
                  </button>
                ) : (
                  <button onClick={stopCamera} className="w-full px-4 py-3 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors">
                    <X className="h-4 w-4 inline mr-2" />Stop
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div id="scanner-region-hidden" className="hidden" />
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="scan-image-input" />
                <label htmlFor="scan-image-input" className="flex flex-col items-center justify-center gap-3 p-12 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                  <Upload className="h-10 w-10 text-surface-400" />
                  <p className="text-sm font-semibold text-surface-700 dark:text-surface-300">Upload image with barcode or QR code</p>
                  <p className="text-xs text-surface-500">PNG, JPG, WebP supported</p>
                </label>
              </div>
            )}
            {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>}
          </Card>


          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Card padding="lg" className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                  <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-2 flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />Decoded Result
                    <span className="ml-auto text-xs text-surface-500 font-normal">{resultFormat}</span>
                  </h3>
                  <p className="text-sm font-mono text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-900 p-3 rounded-lg border border-surface-200 dark:border-surface-700 break-all">{result}</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                      {copied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
                    </button>
                    {isURL && (
                      <a href={result} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/30 hover:bg-primary-100 transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" />Open URL
                      </a>
                    )}
                    <button onClick={handleDownloadResult} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                      Download
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* Scan History Sidebar */}
        <div>
          <Card padding="md" className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-surface-900 dark:text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-600 dark:text-primary-400" />Scan History
              </h3>
              {history.length > 0 && (
                <button onClick={clearScanHistory} className="text-xs text-red-500 hover:underline" aria-label="Clear scan history">Clear</button>
              )}
            </div>
            {history.length > 0 ? (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {history.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                    <p className="text-xs font-mono text-surface-700 dark:text-surface-300 truncate">{item.text}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-surface-500">{item.format}</span>
                      <span className="text-[10px] text-surface-400">{new Date(item.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-surface-500 dark:text-surface-400 text-center py-8">No scans yet. Start scanning to build history.</p>
            )}
          </Card>
        </div>
      </div>
    </Container>
  );
}
