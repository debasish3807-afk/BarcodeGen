// ======================
// Template Definitions
// ======================

export type TemplateCategory = "barcode" | "qr";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  icon: string;
  color: string;
  config: Record<string, unknown>;
}

export const TEMPLATES: Template[] = [
  // === Barcode Templates ===
  {
    id: "business-card",
    name: "Business Card",
    description: "Code 128 barcode for business card contact encoding",
    category: "barcode",
    icon: "contact",
    color: "primary",
    config: { format: "CODE128", value: "JOHN-DOE-CEO-2025", width: 2, height: 80, displayValue: true },
  },
  {
    id: "product-label",
    name: "Product Label",
    description: "EAN-13 barcode for retail product identification",
    category: "barcode",
    icon: "package",
    color: "secondary",
    config: { format: "EAN13", value: "5901234123457", width: 2, height: 100, displayValue: true },
  },
  {
    id: "shipping-label",
    name: "Shipping Label",
    description: "Code 128 barcode for package tracking and shipping",
    category: "barcode",
    icon: "truck",
    color: "primary",
    config: { format: "CODE128", value: "SHIP-2025-001234", width: 2, height: 80, displayValue: true },
  },
  {
    id: "asset-tag",
    name: "Asset Tag",
    description: "Code 39 barcode for company asset management",
    category: "barcode",
    icon: "monitor",
    color: "accent",
    config: { format: "CODE39", value: "ASSET-00421", width: 2, height: 70, displayValue: true },
  },
  {
    id: "inventory-label",
    name: "Inventory Label",
    description: "ITF barcode for warehouse inventory tracking",
    category: "barcode",
    icon: "warehouse",
    color: "secondary",
    config: { format: "ITF", value: "123456789012", width: 2, height: 80, displayValue: true },
  },
  {
    id: "medical-label",
    name: "Medical Label",
    description: "Code 128 barcode for medical sample identification",
    category: "barcode",
    icon: "heartPulse",
    color: "accent",
    config: { format: "CODE128", value: "MED-PAT-2025-0042", width: 2, height: 70, displayValue: true },
  },
  {
    id: "library-label",
    name: "Library Label",
    description: "Code 39 barcode for library book tracking",
    category: "barcode",
    icon: "bookOpen",
    color: "primary",
    config: { format: "CODE39", value: "LIB-ISBN-0042", width: 2, height: 70, displayValue: true },
  },
  {
    id: "price-tag",
    name: "Price Tag",
    description: "UPC-A barcode for retail pricing",
    category: "barcode",
    icon: "tag",
    color: "secondary",
    config: { format: "UPC", value: "012345678905", width: 2, height: 90, displayValue: true },
  },
  {
    id: "student-id",
    name: "Student ID",
    description: "Code 128 barcode for student identification",
    category: "barcode",
    icon: "graduationCap",
    color: "accent",
    config: { format: "CODE128", value: "STU-2025-10042", width: 2, height: 70, displayValue: true },
  },
  {
    id: "office-id",
    name: "Office ID",
    description: "Code 128 barcode for employee badge",
    category: "barcode",
    icon: "building",
    color: "primary",
    config: { format: "CODE128", value: "EMP-A1-2025-007", width: 2, height: 70, displayValue: true },
  },
  // === QR Templates ===
  {
    id: "event-ticket",
    name: "Event Ticket",
    description: "QR code for event entry and ticket validation",
    category: "qr",
    icon: "ticket",
    color: "accent",
    config: { type: "url", data: { url: "https://event.example.com/ticket/EVT-2025-001" } },
  },
  {
    id: "restaurant-menu",
    name: "Restaurant Menu QR",
    description: "QR code linking to digital restaurant menu",
    category: "qr",
    icon: "utensils",
    color: "secondary",
    config: { type: "url", data: { url: "https://menu.example.com/restaurant-name" } },
  },
  {
    id: "wifi-qr",
    name: "WiFi QR",
    description: "QR code for instant WiFi connection sharing",
    category: "qr",
    icon: "wifi",
    color: "primary",
    config: { type: "wifi", data: { ssid: "MyNetwork", password: "MyPassword123", encryption: "WPA", hidden: false } },
  },
  {
    id: "upi-payment",
    name: "UPI Payment QR",
    description: "QR code for UPI payment collection",
    category: "qr",
    icon: "indianRupee",
    color: "secondary",
    config: { type: "upi", data: { vpa: "merchant@upi", name: "My Business", amount: "", note: "Payment" } },
  },
  {
    id: "whatsapp-qr",
    name: "WhatsApp QR",
    description: "QR code to start a WhatsApp conversation",
    category: "qr",
    icon: "messageCircle",
    color: "secondary",
    config: { type: "whatsapp", data: { phone: "+1234567890", message: "Hello! I scanned your QR code." } },
  },
  {
    id: "social-media",
    name: "Social Media QR",
    description: "QR code linking to your social media profile",
    category: "qr",
    icon: "share2",
    color: "accent",
    config: { type: "url", data: { url: "https://linktr.ee/your-profile" } },
  },
  {
    id: "coupon-qr",
    name: "Coupon QR",
    description: "QR code for discount coupon redemption",
    category: "qr",
    icon: "percent",
    color: "primary",
    config: { type: "text", data: { text: "DISCOUNT-20-OFF-BG2025" } },
  },
  {
    id: "vcard-qr",
    name: "vCard Contact",
    description: "QR code with full contact information",
    category: "qr",
    icon: "contact",
    color: "primary",
    config: { type: "vcard", data: { firstName: "John", lastName: "Doe", phone: "+1 555 123 4567", email: "john@example.com", organization: "Acme Inc", title: "CEO", url: "https://example.com", address: "" } },
  },
];

export function getTemplatesByCategory(category: TemplateCategory): Template[] {
  return TEMPLATES.filter((t) => t.category === category);
}
