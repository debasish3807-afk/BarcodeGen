// ======================
// AI Generator Engine (Client-side, No API)
// Pattern matching + rule-based field preparation
// ======================

export interface AIResult {
  type: "barcode" | "qr";
  format: string;
  fields: Record<string, string>;
  description: string;
  redirect: string;
}

interface Pattern {
  keywords: string[];
  result: Omit<AIResult, "description">;
}

const PATTERNS: Pattern[] = [
  { keywords: ["product", "ean", "retail", "shop", "store"], result: { type: "barcode", format: "EAN13", fields: { value: "5901234123457" }, redirect: "/barcode-generator" } },
  { keywords: ["shipping", "package", "tracking", "delivery", "parcel"], result: { type: "barcode", format: "CODE128", fields: { value: "SHIP-2025-001234" }, redirect: "/barcode-generator" } },
  { keywords: ["inventory", "warehouse", "stock", "asset"], result: { type: "barcode", format: "CODE128", fields: { value: "INV-2025-00042" }, redirect: "/barcode-generator" } },
  { keywords: ["coupon", "discount", "promo", "offer", "voucher"], result: { type: "barcode", format: "CODE128", fields: { value: "COUPON-20OFF-2025" }, redirect: "/barcode-generator" } },
  { keywords: ["isbn", "book", "library"], result: { type: "barcode", format: "EAN13", fields: { value: "9780134685991" }, redirect: "/barcode-generator" } },
  { keywords: ["upc", "america", "us product"], result: { type: "barcode", format: "UPC", fields: { value: "012345678905" }, redirect: "/barcode-generator" } },
  { keywords: ["wifi", "network", "internet", "connect"], result: { type: "qr", format: "wifi", fields: { ssid: "MyNetwork", password: "MyPassword123", encryption: "WPA" }, redirect: "/qr-generator" } },
  { keywords: ["restaurant", "menu", "food", "cafe", "dining"], result: { type: "qr", format: "url", fields: { url: "https://menu.restaurant.com" }, redirect: "/qr-generator" } },
  { keywords: ["event", "ticket", "concert", "conference", "meetup"], result: { type: "qr", format: "url", fields: { url: "https://event.example.com/ticket/EVT-001" }, redirect: "/qr-generator" } },
  { keywords: ["payment", "upi", "pay", "money", "transfer"], result: { type: "qr", format: "upi", fields: { vpa: "merchant@upi", name: "My Business", amount: "", note: "Payment" }, redirect: "/qr-generator" } },
  { keywords: ["whatsapp", "wa", "chat", "message"], result: { type: "qr", format: "whatsapp", fields: { phone: "+1234567890", message: "Hello!" }, redirect: "/qr-generator" } },
  { keywords: ["vcard", "contact", "business card", "phone number", "email"], result: { type: "qr", format: "vcard", fields: { firstName: "John", lastName: "Doe", phone: "+1 555 123 4567", email: "john@example.com", organization: "Acme Inc", title: "CEO" }, redirect: "/qr-generator" } },
  { keywords: ["url", "website", "link", "web", "http"], result: { type: "qr", format: "url", fields: { url: "https://example.com" }, redirect: "/qr-generator" } },
  { keywords: ["social", "instagram", "facebook", "twitter", "linkedin"], result: { type: "qr", format: "url", fields: { url: "https://linktr.ee/your-profile" }, redirect: "/qr-generator" } },
  { keywords: ["location", "map", "gps", "address", "place"], result: { type: "qr", format: "location", fields: { latitude: "40.7128", longitude: "-74.0060", label: "New York" }, redirect: "/qr-generator" } },
  { keywords: ["sms", "text message"], result: { type: "qr", format: "sms", fields: { phone: "+1234567890", message: "Hello!" }, redirect: "/qr-generator" } },
  { keywords: ["email", "mail"], result: { type: "qr", format: "email", fields: { email: "hello@example.com", subject: "Hello", body: "" }, redirect: "/qr-generator" } },
];

export function processAIQuery(query: string): AIResult | null {
  const q = query.toLowerCase().trim();
  if (q.length < 3) return null;

  let bestMatch: Pattern | null = null;
  let bestScore = 0;

  for (const pattern of PATTERNS) {
    let score = 0;
    for (const keyword of pattern.keywords) {
      if (q.includes(keyword)) score += keyword.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }

  if (!bestMatch || bestScore < 3) {
    // Default to Code 128 barcode
    return {
      type: "barcode",
      format: "CODE128",
      fields: { value: query.substring(0, 30).toUpperCase().replace(/[^A-Z0-9\-]/g, "-") },
      description: "Generated a Code 128 barcode from your input.",
      redirect: "/barcode-generator",
    };
  }

  return {
    ...bestMatch.result,
    description: `Prepared a ${bestMatch.result.type === "barcode" ? "barcode" : "QR code"} (${bestMatch.result.format}) with pre-filled fields.`,
  };
}

export const AI_SUGGESTIONS = [
  "Generate a product barcode for retail",
  "Create WiFi QR code for my cafe",
  "Make a restaurant menu QR code",
  "Generate event ticket QR code",
  "Create UPI payment QR code",
  "Make WhatsApp QR code",
  "Generate vCard contact QR code",
  "Create a coupon barcode",
  "Generate shipping label barcode",
  "Create social media QR code",
];
