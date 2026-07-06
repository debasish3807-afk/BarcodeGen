import type { BarcodeFormatConfig, ValidationResult } from "../_types";

// ======================
// Validation Helpers
// ======================

function numericOnly(value: string): boolean {
  return /^\d+$/.test(value);
}

function alphanumericWithSpecial(value: string): boolean {
  return /^[A-Z0-9\-. $/+%]+$/i.test(value);
}

function calculateEAN13CheckDigit(digits: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * (i % 2 === 0 ? 1 : 3);
  }
  return (10 - (sum % 10)) % 10;
}

function calculateEAN8CheckDigit(digits: string): number {
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += parseInt(digits[i]) * (i % 2 === 0 ? 3 : 1);
  }
  return (10 - (sum % 10)) % 10;
}

function calculateUPCACheckDigit(digits: string): number {
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += parseInt(digits[i]) * (i % 2 === 0 ? 3 : 1);
  }
  return (10 - (sum % 10)) % 10;
}

function ok(message: string = "Valid"): ValidationResult {
  return { valid: true, message };
}

function fail(message: string): ValidationResult {
  return { valid: false, message };
}

// ======================
// Format Configurations
// ======================

export const BARCODE_FORMATS: BarcodeFormatConfig[] = [
  {
    id: "CODE128",
    label: "Code 128",
    description: "High-density alphanumeric barcode for logistics and shipping",
    placeholder: "Enter any text or numbers",
    defaultValue: "BarcodeGen2025",
    category: "Industrial",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (value.length > 80) return fail("Maximum 80 characters allowed");
      // Code 128 supports ASCII 0-127
      for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) {
          return fail("Only ASCII characters (0-127) are supported");
        }
      }
      return ok("Valid Code 128");
    },
  },
  {
    id: "CODE39",
    label: "Code 39",
    description: "Alphanumeric with special characters for industrial use",
    placeholder: "A-Z, 0-9, - . $ / + % SPACE",
    defaultValue: "CODE-39",
    category: "Industrial",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (value.length > 43) return fail("Maximum 43 characters allowed");
      if (!alphanumericWithSpecial(value)) {
        return fail("Only A-Z, 0-9, and - . $ / + % SPACE are allowed");
      }
      return ok("Valid Code 39");
    },
  },
  {
    id: "CODE93",
    label: "Code 93",
    description: "Compact version of Code 39 with higher density",
    placeholder: "A-Z, 0-9, - . $ / + % SPACE",
    defaultValue: "CODE93",
    category: "Industrial",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (value.length > 80) return fail("Maximum 80 characters allowed");
      if (!alphanumericWithSpecial(value)) {
        return fail("Only A-Z, 0-9, and - . $ / + % SPACE are allowed");
      }
      return ok("Valid Code 93");
    },
  },
  {
    id: "EAN8",
    label: "EAN-8",
    description: "8-digit barcode for small retail products",
    placeholder: "7 or 8 digits (e.g., 96385074)",
    defaultValue: "96385074",
    category: "Product",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (!numericOnly(value)) return fail("Only digits 0-9 are allowed");
      if (value.length !== 7 && value.length !== 8) {
        return fail("Must be exactly 7 or 8 digits");
      }
      if (value.length === 8) {
        const checkDigit = calculateEAN8CheckDigit(value.substring(0, 7));
        if (parseInt(value[7]) !== checkDigit) {
          return fail(`Invalid check digit. Expected ${checkDigit}`);
        }
      }
      return ok("Valid EAN-8");
    },
  },
  {
    id: "EAN13",
    label: "EAN-13",
    description: "13-digit barcode for international retail products",
    placeholder: "12 or 13 digits (e.g., 5901234123457)",
    defaultValue: "5901234123457",
    category: "Product",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (!numericOnly(value)) return fail("Only digits 0-9 are allowed");
      if (value.length !== 12 && value.length !== 13) {
        return fail("Must be exactly 12 or 13 digits");
      }
      if (value.length === 13) {
        const checkDigit = calculateEAN13CheckDigit(value.substring(0, 12));
        if (parseInt(value[12]) !== checkDigit) {
          return fail(`Invalid check digit. Expected ${checkDigit}`);
        }
      }
      return ok("Valid EAN-13");
    },
  },
  {
    id: "UPC",
    label: "UPC-A",
    description: "12-digit barcode for North American retail products",
    placeholder: "11 or 12 digits (e.g., 012345678905)",
    defaultValue: "012345678905",
    category: "Product",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (!numericOnly(value)) return fail("Only digits 0-9 are allowed");
      if (value.length !== 11 && value.length !== 12) {
        return fail("Must be exactly 11 or 12 digits");
      }
      if (value.length === 12) {
        const checkDigit = calculateUPCACheckDigit(value.substring(0, 11));
        if (parseInt(value[11]) !== checkDigit) {
          return fail(`Invalid check digit. Expected ${checkDigit}`);
        }
      }
      return ok("Valid UPC-A");
    },
  },
  {
    id: "UPCE",
    label: "UPC-E",
    description: "Compact 8-digit version of UPC for small packages",
    placeholder: "6, 7, or 8 digits (e.g., 01234565)",
    defaultValue: "01234565",
    category: "Product",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (!numericOnly(value)) return fail("Only digits 0-9 are allowed");
      if (value.length < 6 || value.length > 8) {
        return fail("Must be 6, 7, or 8 digits");
      }
      return ok("Valid UPC-E");
    },
  },
  {
    id: "ITF",
    label: "ITF (Interleaved 2 of 5)",
    description: "Numeric barcode for shipping and warehouse operations",
    placeholder: "Even number of digits (e.g., 123456)",
    defaultValue: "123456",
    category: "Industrial",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (!numericOnly(value)) return fail("Only digits 0-9 are allowed");
      if (value.length % 2 !== 0) {
        return fail("Must have an even number of digits");
      }
      if (value.length < 2) return fail("Minimum 2 digits required");
      if (value.length > 30) return fail("Maximum 30 digits allowed");
      return ok("Valid ITF");
    },
  },
  {
    id: "codabar",
    label: "Codabar",
    description: "Used in libraries, blood banks, and shipping labels",
    placeholder: "A-D start/stop, 0-9 - $ : / . + (e.g., A12345B)",
    defaultValue: "A12345B",
    category: "Specialty",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (value.length < 3) return fail("Minimum 3 characters (start + data + stop)");
      if (value.length > 32) return fail("Maximum 32 characters allowed");
      const startStop = /^[A-Da-d]/;
      const endStop = /[A-Da-d]$/;
      if (!startStop.test(value) || !endStop.test(value)) {
        return fail("Must start and end with A, B, C, or D");
      }
      const middle = value.substring(1, value.length - 1);
      if (!/^[0-9\-$:/.+]+$/.test(middle)) {
        return fail("Data can only contain 0-9, -, $, :, /, ., +");
      }
      return ok("Valid Codabar");
    },
  },
  {
    id: "MSI",
    label: "MSI (Modified Plessey)",
    description: "Numeric barcode for inventory and warehouse shelving",
    placeholder: "Numeric only (e.g., 1234567)",
    defaultValue: "1234567",
    category: "Specialty",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (!numericOnly(value)) return fail("Only digits 0-9 are allowed");
      if (value.length < 1) return fail("At least 1 digit required");
      if (value.length > 15) return fail("Maximum 15 digits allowed");
      return ok("Valid MSI");
    },
  },
  {
    id: "GS1-128",
    label: "GS1-128",
    description: "Used in supply chain for encoding Application Identifiers",
    placeholder: "AI + data (e.g., (01)09501101530003)",
    defaultValue: "(01)09501101530003",
    category: "Industrial",
    validate: (value: string): ValidationResult => {
      if (!value || value.length === 0) return fail("Value is required");
      if (value.length > 48) return fail("Maximum 48 characters allowed");
      // GS1-128 should start with AI in parentheses
      if (!/^\(\d{2,4}\)/.test(value)) {
        return fail("Must start with Application Identifier e.g. (01)...");
      }
      return ok("Valid GS1-128");
    },
  },
];

export function getFormatConfig(format: string): BarcodeFormatConfig | undefined {
  return BARCODE_FORMATS.find((f) => f.id === format);
}

export function getFormatsByCategory(): Record<string, BarcodeFormatConfig[]> {
  const categories: Record<string, BarcodeFormatConfig[]> = {};
  for (const format of BARCODE_FORMATS) {
    if (!categories[format.category]) {
      categories[format.category] = [];
    }
    categories[format.category].push(format);
  }
  return categories;
}
