import type { Feature, Stat, Testimonial, BlogPost, FAQ, BarcodeType, QRType, HowItWorksStep } from "@/types";

// ======================
// Stats
// ======================

export const STATS: Stat[] = [
  { id: "1", label: "Barcodes Generated", value: "10M", suffix: "+" },
  { id: "2", label: "Active Users", value: "500K", suffix: "+" },
  { id: "3", label: "Barcode Formats", value: "30", suffix: "+" },
  { id: "4", label: "Countries Served", value: "190", suffix: "+" },
];

// ======================
// Features
// ======================

export const FEATURES: Feature[] = [
  {
    id: "1",
    title: "Multiple Barcode Formats",
    description: "Support for 30+ barcode formats including EAN, UPC, Code 128, Code 39, ITF, and more.",
    icon: "barChart",
  },
  {
    id: "2",
    title: "QR Code Generator",
    description: "Create QR codes for URLs, text, WiFi, vCards, emails, phone numbers, and more.",
    icon: "qrCode",
  },
  {
    id: "3",
    title: "High Resolution Downloads",
    description: "Export your barcodes in PNG, SVG, PDF, and EPS formats at any resolution.",
    icon: "download",
  },
  {
    id: "4",
    title: "Bulk Generation",
    description: "Generate hundreds of barcodes at once with CSV upload and batch processing.",
    icon: "layers",
  },
  {
    id: "5",
    title: "Custom Styling",
    description: "Customize colors, sizes, fonts, and add logos to make your barcodes unique.",
    icon: "palette",
  },
  {
    id: "6",
    title: "API Access",
    description: "Integrate barcode generation directly into your applications with our REST API.",
    icon: "code",
  },
  {
    id: "7",
    title: "No Registration Required",
    description: "Start generating barcodes immediately. No signup, no login, no hassle.",
    icon: "zap",
  },
  {
    id: "8",
    title: "Mobile Friendly",
    description: "Generate barcodes on any device - desktop, tablet, or smartphone.",
    icon: "smartphone",
  },
];

// ======================
// Barcode Types
// ======================

export const BARCODE_TYPES: BarcodeType[] = [
  { id: "1", name: "EAN-13", description: "International product identification", category: "Product" },
  { id: "2", name: "EAN-8", description: "Compact product barcode", category: "Product" },
  { id: "3", name: "UPC-A", description: "North American retail products", category: "Product" },
  { id: "4", name: "UPC-E", description: "Compact UPC barcode", category: "Product" },
  { id: "5", name: "Code 128", description: "High-density alphanumeric encoding", category: "Industrial" },
  { id: "6", name: "Code 39", description: "Alphanumeric with special characters", category: "Industrial" },
  { id: "7", name: "ITF-14", description: "Shipping and logistics", category: "Logistics" },
  { id: "8", name: "ISBN", description: "Book identification numbers", category: "Publishing" },
  { id: "9", name: "ISSN", description: "Serial publication identification", category: "Publishing" },
  { id: "10", name: "Data Matrix", description: "2D barcode for small items", category: "2D" },
  { id: "11", name: "PDF417", description: "Stacked linear barcode", category: "2D" },
  { id: "12", name: "Codabar", description: "Libraries and blood banks", category: "Specialty" },
];

// ======================
// QR Types
// ======================

export const QR_TYPES: QRType[] = [
  { id: "1", name: "URL", description: "Link to any website or webpage", icon: "link" },
  { id: "2", name: "Text", description: "Plain text or messages", icon: "type" },
  { id: "3", name: "WiFi", description: "Share WiFi credentials instantly", icon: "wifi" },
  { id: "4", name: "vCard", description: "Digital business cards", icon: "contact" },
  { id: "5", name: "Email", description: "Pre-composed email messages", icon: "mail" },
  { id: "6", name: "Phone", description: "Quick dial phone numbers", icon: "phone" },
  { id: "7", name: "SMS", description: "Pre-written text messages", icon: "messageSquare" },
  { id: "8", name: "Location", description: "GPS coordinates and maps", icon: "mapPin" },
  { id: "9", name: "Calendar", description: "Event details and invitations", icon: "calendar" },
  { id: "10", name: "App Store", description: "Direct app download links", icon: "smartphone" },
];

// ======================
// How It Works
// ======================

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "1",
    step: 1,
    title: "Choose Your Type",
    description: "Select from 30+ barcode formats or 10+ QR code types to match your needs.",
    icon: "mousePointer",
  },
  {
    id: "2",
    step: 2,
    title: "Enter Your Data",
    description: "Input your data - product numbers, URLs, text, or any content you want to encode.",
    icon: "edit",
  },
  {
    id: "3",
    step: 3,
    title: "Customize Design",
    description: "Adjust colors, size, format, and add custom branding to your barcode.",
    icon: "palette",
  },
  {
    id: "4",
    step: 4,
    title: "Download & Use",
    description: "Export in high-resolution PNG, SVG, or PDF and use anywhere you need.",
    icon: "download",
  },
];

// ======================
// Testimonials
// ======================

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "E-commerce Manager",
    company: "ShopFlow",
    content: "BarcodeGen has streamlined our entire product labeling process. We generate thousands of barcodes weekly with zero issues.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Warehouse Director",
    company: "LogiTech Solutions",
    content: "The bulk generation feature saves us hours every week. The quality of barcodes is consistently excellent.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "Marketing Director",
    company: "BrandCraft",
    content: "We use the QR code generator for all our marketing campaigns. The customization options are fantastic.",
    rating: 5,
  },
  {
    id: "4",
    name: "David Park",
    role: "Software Developer",
    company: "TechStart Inc",
    content: "The API integration was seamless. We had barcode generation built into our app within hours.",
    rating: 5,
  },
];

// ======================
// Blog Posts (Sample)
// ======================

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Complete Guide to EAN-13 Barcodes",
    excerpt: "Learn everything about EAN-13 barcodes, from structure and encoding to real-world applications in retail.",
    slug: "complete-guide-ean-13-barcodes",
    author: "BarcodeGen Team",
    publishedAt: "2025-01-15",
    readTime: "8 min read",
    category: "Guides",
  },
  {
    id: "2",
    title: "QR Codes in Marketing: Best Practices for 2025",
    excerpt: "Discover how to effectively use QR codes in your marketing campaigns to drive engagement and conversions.",
    slug: "qr-codes-marketing-best-practices",
    author: "BarcodeGen Team",
    publishedAt: "2025-01-10",
    readTime: "6 min read",
    category: "Marketing",
  },
  {
    id: "3",
    title: "Barcode vs QR Code: Which Should You Use?",
    excerpt: "A comprehensive comparison of traditional barcodes and QR codes to help you choose the right solution.",
    slug: "barcode-vs-qr-code-comparison",
    author: "BarcodeGen Team",
    publishedAt: "2025-01-05",
    readTime: "5 min read",
    category: "Comparison",
  },
];

// ======================
// FAQs
// ======================

export const FAQS: FAQ[] = [
  {
    id: "1",
    question: "Is BarcodeGen free to use?",
    answer: "Yes! BarcodeGen is completely free for basic barcode and QR code generation. No registration or payment required.",
    category: "General",
  },
  {
    id: "2",
    question: "What barcode formats do you support?",
    answer: "We support 30+ formats including EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, ITF-14, ISBN, ISSN, Data Matrix, PDF417, and many more.",
    category: "Features",
  },
  {
    id: "3",
    question: "Can I generate barcodes in bulk?",
    answer: "Absolutely! Upload a CSV file with your data and generate hundreds of barcodes at once. All formats are supported for bulk generation.",
    category: "Features",
  },
  {
    id: "4",
    question: "What file formats can I download?",
    answer: "You can download barcodes in PNG, SVG, PDF, and EPS formats. All downloads are high-resolution and print-ready.",
    category: "Downloads",
  },
  {
    id: "5",
    question: "Do you have an API?",
    answer: "Yes, we offer a REST API for developers who want to integrate barcode generation into their applications. Check our documentation for details.",
    category: "Technical",
  },
  {
    id: "6",
    question: "Are the generated barcodes scannable?",
    answer: "Yes, all barcodes generated by BarcodeGen are industry-standard compliant and scannable by any barcode reader.",
    category: "Quality",
  },
];
