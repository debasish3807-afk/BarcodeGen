// ======================
// Batch Validation
// ======================

export interface ValidationResult {
  valid: boolean;
  message: string;
}

/**
 * Validate a barcode value against its format
 */
export function validateBarcodeValue(value: string, format: string): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { valid: false, message: "Empty value" };
  }

  const numericOnly = /^\d+$/.test(value);

  switch (format) {
    case "CODE128":
      if (value.length > 80) return { valid: false, message: "Max 80 chars" };
      for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) return { valid: false, message: "ASCII only" };
      }
      return { valid: true, message: "Valid" };

    case "CODE39":
      if (!/^[A-Z0-9\-. $/+%]+$/i.test(value)) return { valid: false, message: "Invalid chars for Code 39" };
      return { valid: true, message: "Valid" };

    case "CODE93":
      if (!/^[A-Z0-9\-. $/+%]+$/i.test(value)) return { valid: false, message: "Invalid chars for Code 93" };
      return { valid: true, message: "Valid" };

    case "EAN8":
      if (!numericOnly) return { valid: false, message: "Digits only" };
      if (value.length !== 7 && value.length !== 8) return { valid: false, message: "Must be 7-8 digits" };
      return { valid: true, message: "Valid" };

    case "EAN13":
      if (!numericOnly) return { valid: false, message: "Digits only" };
      if (value.length !== 12 && value.length !== 13) return { valid: false, message: "Must be 12-13 digits" };
      return { valid: true, message: "Valid" };

    case "UPC":
      if (!numericOnly) return { valid: false, message: "Digits only" };
      if (value.length !== 11 && value.length !== 12) return { valid: false, message: "Must be 11-12 digits" };
      return { valid: true, message: "Valid" };

    case "UPCE":
      if (!numericOnly) return { valid: false, message: "Digits only" };
      if (value.length < 6 || value.length > 8) return { valid: false, message: "Must be 6-8 digits" };
      return { valid: true, message: "Valid" };

    case "ITF":
      if (!numericOnly) return { valid: false, message: "Digits only" };
      if (value.length % 2 !== 0) return { valid: false, message: "Even number of digits required" };
      return { valid: true, message: "Valid" };

    case "codabar":
      if (value.length < 3) return { valid: false, message: "Min 3 chars (start+data+stop)" };
      if (!/^[A-Da-d]/.test(value) || !/[A-Da-d]$/.test(value)) return { valid: false, message: "Must start/end with A-D" };
      return { valid: true, message: "Valid" };

    case "MSI":
      if (!numericOnly) return { valid: false, message: "Digits only" };
      if (value.length > 15) return { valid: false, message: "Max 15 digits" };
      return { valid: true, message: "Valid" };

    default:
      return { valid: true, message: "Valid" };
  }
}

/**
 * Validate a QR code value against its type
 */
export function validateQRValue(value: string, type: string): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { valid: false, message: "Empty value" };
  }

  switch (type) {
    case "url":
      try {
        new URL(value);
        return { valid: true, message: "Valid URL" };
      } catch {
        return { valid: false, message: "Invalid URL" };
      }

    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { valid: false, message: "Invalid email" };
      return { valid: true, message: "Valid email" };

    case "phone":
      if (!/^\+?[\d\s\-()]{7,20}$/.test(value)) return { valid: false, message: "Invalid phone" };
      return { valid: true, message: "Valid phone" };

    case "text":
      if (value.length > 4296) return { valid: false, message: "Max 4296 chars" };
      return { valid: true, message: "Valid text" };

    default:
      return { valid: true, message: "Valid" };
  }
}
