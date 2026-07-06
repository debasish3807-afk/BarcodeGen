// ======================
// QR Code Generator Types
// ======================

export type QRType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "whatsapp"
  | "wifi"
  | "vcard"
  | "location"
  | "upi";

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type EyeStyle = "square" | "rounded" | "circle" | "leaf";

export type ModuleStyle = "square" | "rounded" | "dots" | "classy";

export type GradientType = "none" | "linear" | "radial";

export type GradientDirection = "to-right" | "to-bottom" | "to-bottom-right" | "to-top-right";

export interface GradientOptions {
  type: GradientType;
  direction: GradientDirection;
  startColor: string;
  endColor: string;
}

export interface LogoOptions {
  enabled: boolean;
  dataUrl: string | null;
  size: number; // percentage 10-40
  removeBg: boolean;
}

export interface QROptions {
  type: QRType;
  data: QRDataPayload;
  size: number;
  margin: number;
  foregroundColor: string;
  backgroundColor: string;
  gradient: GradientOptions;
  moduleStyle: ModuleStyle;
  eyeStyle: EyeStyle;
  errorCorrection: ErrorCorrectionLevel;
  transparentBackground: boolean;
  logo: LogoOptions;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

// ======================
// QR Data Payloads
// ======================

export interface URLData {
  url: string;
}

export interface TextData {
  text: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface PhoneData {
  phone: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export interface WhatsAppData {
  phone: string;
  message: string;
}

export interface WiFiData {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  title: string;
  url: string;
  address: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
  label: string;
}

export interface UPIData {
  vpa: string;
  name: string;
  amount: string;
  note: string;
}

export type QRDataPayload =
  | URLData
  | TextData
  | EmailData
  | PhoneData
  | SMSData
  | WhatsAppData
  | WiFiData
  | VCardData
  | LocationData
  | UPIData;

// ======================
// QR Type Config
// ======================

export interface QRTypeConfig {
  id: QRType;
  label: string;
  description: string;
  icon: string;
  color: string;
  defaultData: QRDataPayload;
  validate: (data: QRDataPayload) => ValidationResult;
  encode: (data: QRDataPayload) => string;
}

// ======================
// Defaults
// ======================

export const DEFAULT_QR_OPTIONS: QROptions = {
  type: "url",
  data: { url: "https://barcodegen.com" } as URLData,
  size: 300,
  margin: 2,
  foregroundColor: "#000000",
  backgroundColor: "#FFFFFF",
  gradient: {
    type: "none",
    direction: "to-right",
    startColor: "#2563eb",
    endColor: "#9333ea",
  },
  moduleStyle: "square",
  eyeStyle: "square",
  errorCorrection: "M",
  transparentBackground: false,
  logo: {
    enabled: false,
    dataUrl: null,
    size: 20,
    removeBg: true,
  },
};
