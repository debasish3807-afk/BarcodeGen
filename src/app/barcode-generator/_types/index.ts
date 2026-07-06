// ======================
// Barcode Generator Types
// ======================

export type BarcodeFormat =
  | "CODE128"
  | "CODE39"
  | "CODE93"
  | "EAN8"
  | "EAN13"
  | "UPC"
  | "UPCE"
  | "ITF"
  | "codabar"
  | "MSI"
  | "GS1-128";

export type TextAlign = "left" | "center" | "right";

export type FontFamily =
  | "monospace"
  | "sans-serif"
  | "serif"
  | "cursive"
  | "fantasy";

export type Rotation = 0 | 90 | 180 | 270;

export type ExportFormat = "png" | "svg" | "pdf" | "jpg" | "webp";

export interface BarcodeOptions {
  format: BarcodeFormat;
  value: string;
  width: number;
  height: number;
  margin: number;
  fontSize: number;
  fontFamily: FontFamily;
  displayValue: boolean;
  textAlign: TextAlign;
  foregroundColor: string;
  backgroundColor: string;
  rotation: Rotation;
  dpi: number;
  transparentBackground: boolean;
}

export interface BarcodeFormatConfig {
  id: BarcodeFormat;
  label: string;
  description: string;
  placeholder: string;
  defaultValue: string;
  category: "Linear" | "Product" | "Industrial" | "Specialty";
  validate: (value: string) => ValidationResult;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export const DEFAULT_BARCODE_OPTIONS: BarcodeOptions = {
  format: "CODE128",
  value: "BarcodeGen2025",
  width: 2,
  height: 100,
  margin: 10,
  fontSize: 16,
  fontFamily: "monospace",
  displayValue: true,
  textAlign: "center",
  foregroundColor: "#000000",
  backgroundColor: "#FFFFFF",
  rotation: 0,
  dpi: 300,
  transparentBackground: false,
};
