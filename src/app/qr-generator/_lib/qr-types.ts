import type {
  QRTypeConfig,
  QRDataPayload,
  URLData,
  TextData,
  EmailData,
  PhoneData,
  SMSData,
  WhatsAppData,
  WiFiData,
  VCardData,
  LocationData,
  UPIData,
  ValidationResult,
} from "../_types";

// ======================
// Validation Helpers
// ======================

function ok(msg: string = "Valid"): ValidationResult {
  return { valid: true, message: msg };
}

function fail(msg: string): ValidationResult {
  return { valid: false, message: msg };
}

function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,20}$/.test(phone);
}

function isValidLatitude(lat: string): boolean {
  const n = parseFloat(lat);
  return !isNaN(n) && n >= -90 && n <= 90;
}

function isValidLongitude(lng: string): boolean {
  const n = parseFloat(lng);
  return !isNaN(n) && n >= -180 && n <= 180;
}

// ======================
// QR Type Configurations
// ======================

export const QR_TYPE_CONFIGS: QRTypeConfig[] = [
  {
    id: "url",
    label: "URL",
    description: "Link to any website",
    icon: "link",
    color: "primary",
    defaultData: { url: "https://barcodegen.com" } as URLData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as URLData;
      if (!d.url || d.url.trim().length === 0) return fail("URL is required");
      if (!isValidUrl(d.url)) return fail("Please enter a valid URL (include https://)");
      if (d.url.length > 2048) return fail("URL must be under 2048 characters");
      return ok("Valid URL");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as URLData;
      return d.url;
    },
  },
  {
    id: "text",
    label: "Text",
    description: "Plain text or message",
    icon: "type",
    color: "secondary",
    defaultData: { text: "Hello from BarcodeGen!" } as TextData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as TextData;
      if (!d.text || d.text.trim().length === 0) return fail("Text is required");
      if (d.text.length > 4296) return fail("Text must be under 4296 characters");
      return ok("Valid text");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as TextData;
      return d.text;
    },
  },
  {
    id: "email",
    label: "Email",
    description: "Pre-composed email",
    icon: "mail",
    color: "accent",
    defaultData: { email: "", subject: "", body: "" } as EmailData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as EmailData;
      if (!d.email || d.email.trim().length === 0) return fail("Email address is required");
      if (!isValidEmail(d.email)) return fail("Please enter a valid email address");
      return ok("Valid email");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as EmailData;
      let mailto = `mailto:${d.email}`;
      const params: string[] = [];
      if (d.subject) params.push(`subject=${encodeURIComponent(d.subject)}`);
      if (d.body) params.push(`body=${encodeURIComponent(d.body)}`);
      if (params.length > 0) mailto += `?${params.join("&")}`;
      return mailto;
    },
  },
  {
    id: "phone",
    label: "Phone",
    description: "Quick dial number",
    icon: "phone",
    color: "primary",
    defaultData: { phone: "" } as PhoneData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as PhoneData;
      if (!d.phone || d.phone.trim().length === 0) return fail("Phone number is required");
      if (!isValidPhone(d.phone)) return fail("Please enter a valid phone number");
      return ok("Valid phone number");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as PhoneData;
      return `tel:${d.phone.replace(/\s/g, "")}`;
    },
  },
  {
    id: "sms",
    label: "SMS",
    description: "Pre-written text message",
    icon: "messageSquare",
    color: "secondary",
    defaultData: { phone: "", message: "" } as SMSData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as SMSData;
      if (!d.phone || d.phone.trim().length === 0) return fail("Phone number is required");
      if (!isValidPhone(d.phone)) return fail("Please enter a valid phone number");
      return ok("Valid SMS data");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as SMSData;
      const phone = d.phone.replace(/\s/g, "");
      if (d.message) return `sms:${phone}?body=${encodeURIComponent(d.message)}`;
      return `sms:${phone}`;
    },
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Open WhatsApp chat",
    icon: "messageCircle",
    color: "secondary",
    defaultData: { phone: "", message: "" } as WhatsAppData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as WhatsAppData;
      if (!d.phone || d.phone.trim().length === 0) return fail("Phone number is required");
      if (!isValidPhone(d.phone)) return fail("Please enter a valid phone number (with country code)");
      return ok("Valid WhatsApp data");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as WhatsAppData;
      const phone = d.phone.replace(/[\s\-()]/g, "").replace(/^\+/, "");
      if (d.message) return `https://wa.me/${phone}?text=${encodeURIComponent(d.message)}`;
      return `https://wa.me/${phone}`;
    },
  },
  {
    id: "wifi",
    label: "WiFi",
    description: "Share WiFi credentials",
    icon: "wifi",
    color: "accent",
    defaultData: { ssid: "", password: "", encryption: "WPA", hidden: false } as WiFiData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as WiFiData;
      if (!d.ssid || d.ssid.trim().length === 0) return fail("Network name (SSID) is required");
      if (d.ssid.length > 32) return fail("SSID must be 32 characters or less");
      if (d.encryption !== "nopass" && (!d.password || d.password.length === 0)) {
        return fail("Password is required for encrypted networks");
      }
      return ok("Valid WiFi data");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as WiFiData;
      const hidden = d.hidden ? "H:true;" : "";
      const pass = d.password ? `P:${d.password};` : "";
      return `WIFI:T:${d.encryption};S:${d.ssid};${pass}${hidden};`;
    },
  },
  {
    id: "vcard",
    label: "vCard",
    description: "Digital business card",
    icon: "contact",
    color: "primary",
    defaultData: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      organization: "",
      title: "",
      url: "",
      address: "",
    } as VCardData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as VCardData;
      if (!d.firstName || d.firstName.trim().length === 0) return fail("First name is required");
      if (!d.lastName || d.lastName.trim().length === 0) return fail("Last name is required");
      if (d.email && !isValidEmail(d.email)) return fail("Please enter a valid email");
      if (d.phone && !isValidPhone(d.phone)) return fail("Please enter a valid phone number");
      return ok("Valid vCard");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as VCardData;
      const lines: string[] = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${d.lastName};${d.firstName};;;`,
        `FN:${d.firstName} ${d.lastName}`,
      ];
      if (d.organization) lines.push(`ORG:${d.organization}`);
      if (d.title) lines.push(`TITLE:${d.title}`);
      if (d.phone) lines.push(`TEL:${d.phone}`);
      if (d.email) lines.push(`EMAIL:${d.email}`);
      if (d.url) lines.push(`URL:${d.url}`);
      if (d.address) lines.push(`ADR:;;${d.address};;;;`);
      lines.push("END:VCARD");
      return lines.join("\n");
    },
  },
  {
    id: "location",
    label: "Location",
    description: "GPS coordinates on map",
    icon: "mapPin",
    color: "accent",
    defaultData: { latitude: "", longitude: "", label: "" } as LocationData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as LocationData;
      if (!d.latitude || d.latitude.trim().length === 0) return fail("Latitude is required");
      if (!d.longitude || d.longitude.trim().length === 0) return fail("Longitude is required");
      if (!isValidLatitude(d.latitude)) return fail("Latitude must be between -90 and 90");
      if (!isValidLongitude(d.longitude)) return fail("Longitude must be between -180 and 180");
      return ok("Valid location");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as LocationData;
      const label = d.label ? `(${d.label})` : "";
      return `geo:${d.latitude},${d.longitude}${label ? `?q=${d.latitude},${d.longitude}${label}` : ""}`;
    },
  },
  {
    id: "upi",
    label: "UPI Payment",
    description: "UPI payment request",
    icon: "indianRupee",
    color: "secondary",
    defaultData: { vpa: "", name: "", amount: "", note: "" } as UPIData,
    validate: (data: QRDataPayload): ValidationResult => {
      const d = data as UPIData;
      if (!d.vpa || d.vpa.trim().length === 0) return fail("UPI ID (VPA) is required");
      if (!/^[\w.\-]+@[\w]+$/.test(d.vpa)) return fail("Please enter a valid UPI ID (e.g., name@upi)");
      if (!d.name || d.name.trim().length === 0) return fail("Payee name is required");
      if (d.amount && (isNaN(parseFloat(d.amount)) || parseFloat(d.amount) < 0)) {
        return fail("Amount must be a valid positive number");
      }
      return ok("Valid UPI data");
    },
    encode: (data: QRDataPayload): string => {
      const d = data as UPIData;
      let uri = `upi://pay?pa=${encodeURIComponent(d.vpa)}&pn=${encodeURIComponent(d.name)}`;
      if (d.amount) uri += `&am=${d.amount}`;
      if (d.note) uri += `&tn=${encodeURIComponent(d.note)}`;
      uri += "&cu=INR";
      return uri;
    },
  },
];

export function getQRTypeConfig(type: string): QRTypeConfig | undefined {
  return QR_TYPE_CONFIGS.find((t) => t.id === type);
}
