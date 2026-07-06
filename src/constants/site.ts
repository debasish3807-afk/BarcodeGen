// ======================
// Site Configuration
// ======================

export const SITE_CONFIG = {
  name: "BarcodeGen",
  tagline: "Professional Barcode & QR Code Generator",
  description:
    "Generate professional barcodes and QR codes instantly. Free online barcode generator supporting 30+ formats with high-resolution downloads.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://barcodegen.com",
  email: "support@barcodegen.com",
  author: "BarcodeGen Team",
  version: "1.0.0",
} as const;

export const SEO_DEFAULTS = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  keywords: [
    "barcode generator",
    "qr code generator",
    "free barcode maker",
    "online barcode creator",
    "qr code maker",
    "EAN barcode",
    "UPC barcode",
    "Code 128",
    "Code 39",
    "QR code",
    "barcode scanner",
    "bulk barcode generator",
  ],
  ogImage: "/images/og-image.png",
} as const;
