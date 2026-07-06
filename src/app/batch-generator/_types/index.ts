// ======================
// Batch Generator Types
// ======================

export type BatchMode = "barcode" | "qr";

export type InputMethod = "csv" | "excel" | "txt" | "json" | "manual" | "paste";

export type BatchItemStatus = "pending" | "processing" | "success" | "failed" | "skipped";

export type BatchJobStatus = "idle" | "running" | "paused" | "completed" | "cancelled";

export type ExportFormat = "png-zip" | "svg-zip" | "pdf" | "jpg-zip" | "webp-zip";

export interface BatchItem {
  id: string;
  rowNumber: number;
  inputData: string;
  format: string;
  type: string;
  status: BatchItemStatus;
  error: string | null;
  preview: string | null; // data URL or SVG string
}

export interface BatchProgress {
  total: number;
  processed: number;
  success: number;
  failed: number;
  skipped: number;
  percentage: number;
  startTime: number | null;
  estimatedRemaining: string;
}

export interface BatchConfig {
  mode: BatchMode;
  format: string; // barcode format or QR type
  inputMethod: InputMethod;
  skipInvalid: boolean;
  barcodeWidth: number;
  barcodeHeight: number;
  qrSize: number;
  qrErrorCorrection: "L" | "M" | "Q" | "H";
}

export const DEFAULT_BATCH_CONFIG: BatchConfig = {
  mode: "barcode",
  format: "CODE128",
  inputMethod: "manual",
  skipInvalid: true,
  barcodeWidth: 2,
  barcodeHeight: 100,
  qrSize: 300,
  qrErrorCorrection: "M",
};

export const DEFAULT_PROGRESS: BatchProgress = {
  total: 0,
  processed: 0,
  success: 0,
  failed: 0,
  skipped: 0,
  percentage: 0,
  startTime: null,
  estimatedRemaining: "--",
};

export const BARCODE_FORMATS = [
  { id: "CODE128", label: "Code 128" },
  { id: "CODE39", label: "Code 39" },
  { id: "CODE93", label: "Code 93" },
  { id: "EAN8", label: "EAN-8" },
  { id: "EAN13", label: "EAN-13" },
  { id: "UPC", label: "UPC-A" },
  { id: "UPCE", label: "UPC-E" },
  { id: "ITF", label: "ITF" },
  { id: "codabar", label: "Codabar" },
  { id: "MSI", label: "MSI" },
] as const;

export const QR_TYPES = [
  { id: "url", label: "URL" },
  { id: "text", label: "Text" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "sms", label: "SMS" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "wifi", label: "WiFi" },
  { id: "vcard", label: "vCard" },
  { id: "location", label: "Location" },
  { id: "upi", label: "UPI Payment" },
] as const;
