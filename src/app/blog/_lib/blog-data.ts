// ======================
// Blog Data & Categories
// ======================

export type BlogCategory = "barcode" | "qr-code" | "business" | "retail" | "inventory" | "warehouse" | "education" | "healthcare" | "technology";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  relatedSlugs: string[];
}

export const BLOG_CATEGORIES: { id: BlogCategory; label: string; count: number }[] = [
  { id: "barcode", label: "Barcode", count: 4 },
  { id: "qr-code", label: "QR Code", count: 4 },
  { id: "business", label: "Business", count: 2 },
  { id: "retail", label: "Retail", count: 2 },
  { id: "inventory", label: "Inventory", count: 2 },
  { id: "warehouse", label: "Warehouse", count: 1 },
  { id: "education", label: "Education", count: 1 },
  { id: "healthcare", label: "Healthcare", count: 1 },
  { id: "technology", label: "Technology", count: 2 },
];


export const BLOG_POSTS_FULL: BlogPost[] = [
  { id: "1", slug: "complete-guide-ean-13-barcodes", title: "Complete Guide to EAN-13 Barcodes", excerpt: "Learn everything about EAN-13 barcodes, from structure and encoding to real-world applications in retail.", content: "EAN-13 is the most widely used barcode standard globally. It consists of 13 digits that uniquely identify products. The first 2-3 digits represent the country code, followed by manufacturer and product codes, and a check digit. This format is essential for international retail operations and supply chain management.\n\nEAN-13 barcodes are readable by virtually all barcode scanners and POS systems worldwide. They encode numeric data only and are optimized for product identification at retail checkout.\n\nBest practices include ensuring adequate quiet zones, proper print contrast, and verification before production use.", category: "barcode", author: "BarcodeGen Team", publishedAt: "2025-01-15", readTime: "8 min", tags: ["EAN-13", "retail", "product identification"], relatedSlugs: ["barcode-vs-qr-code-comparison", "upc-barcode-guide"] },
  { id: "2", slug: "qr-codes-marketing-best-practices", title: "QR Codes in Marketing: Best Practices", excerpt: "Discover how to effectively use QR codes in your marketing campaigns to drive engagement.", content: "QR codes have become indispensable in modern marketing. They bridge physical and digital experiences, allowing customers to access websites, promotions, and content with a simple scan.\n\nKey best practices: Always provide context near the QR code, ensure the landing page is mobile-optimized, track scans with UTM parameters, and test across multiple devices before deployment.\n\nDynamic QR codes allow you to change the destination URL without reprinting, making them ideal for campaigns that evolve over time.", category: "qr-code", author: "BarcodeGen Team", publishedAt: "2025-01-10", readTime: "6 min", tags: ["QR code", "marketing", "digital strategy"], relatedSlugs: ["restaurant-qr-code-guide", "social-media-qr-strategies"] },
  { id: "3", slug: "barcode-vs-qr-code-comparison", title: "Barcode vs QR Code: Complete Comparison", excerpt: "A comprehensive comparison of barcodes and QR codes to help you choose the right solution.", content: "Traditional 1D barcodes store data in parallel lines of varying width, while QR codes use a 2D matrix pattern. Barcodes typically hold 20-25 characters of numeric data, while QR codes can store up to 7,089 numeric or 4,296 alphanumeric characters.\n\nChoose barcodes for: product identification, inventory tracking, and environments where horizontal scanning is standard. Choose QR codes for: URLs, contact information, WiFi credentials, and consumer-facing applications requiring large data capacity.", category: "technology", author: "BarcodeGen Team", publishedAt: "2025-01-05", readTime: "5 min", tags: ["comparison", "barcode", "QR code"], relatedSlugs: ["complete-guide-ean-13-barcodes", "qr-codes-marketing-best-practices"] },
  { id: "4", slug: "inventory-management-barcodes", title: "Inventory Management with Barcodes", excerpt: "How to implement barcode systems for efficient inventory tracking and management.", content: "Barcode-based inventory management eliminates manual data entry errors and speeds up warehouse operations by 60-80%. Common formats include Code 128 for alphanumeric data and ITF for numeric-only applications.\n\nImplementation steps: audit current inventory, choose appropriate barcode format, design label layout, select scanner hardware, integrate with WMS software, and train staff.\n\nROI typically appears within 3-6 months through reduced errors, faster cycle counts, and improved stock accuracy.", category: "inventory", author: "BarcodeGen Team", publishedAt: "2025-01-02", readTime: "7 min", tags: ["inventory", "Code 128", "warehouse"], relatedSlugs: ["warehouse-barcode-systems", "code-128-guide"] },
  { id: "5", slug: "restaurant-qr-code-guide", title: "QR Code Menus for Restaurants", excerpt: "Complete guide to implementing QR code menus in your restaurant.", content: "Digital menus via QR codes reduce print costs, enable instant updates, support multiple languages, and provide a contactless ordering experience.\n\nBest implementation: place QR codes at each table with clear instructions, ensure the menu loads quickly on mobile, include allergen information, and offer a fallback physical menu for accessibility.", category: "business", author: "BarcodeGen Team", publishedAt: "2024-12-28", readTime: "5 min", tags: ["restaurant", "QR menu", "digital menu"], relatedSlugs: ["qr-codes-marketing-best-practices", "wifi-qr-code-setup"] },
  { id: "6", slug: "warehouse-barcode-systems", title: "Warehouse Barcode Systems Guide", excerpt: "Design and implement efficient barcode systems for warehouse operations.", content: "Modern warehouses rely on barcode systems for receiving, putaway, picking, packing, and shipping. The right barcode strategy reduces errors to near zero and improves throughput significantly.\n\nLocation barcodes identify racks, bins, and zones. Product barcodes identify items. Shipping barcodes enable carrier integration. Together they create a seamless tracking system from dock to dock.", category: "warehouse", author: "BarcodeGen Team", publishedAt: "2024-12-20", readTime: "9 min", tags: ["warehouse", "logistics", "WMS"], relatedSlugs: ["inventory-management-barcodes", "shipping-barcode-standards"] },
  { id: "7", slug: "healthcare-barcode-applications", title: "Barcodes in Healthcare", excerpt: "How healthcare facilities use barcodes for patient safety and efficiency.", content: "Healthcare barcoding covers patient identification wristbands, medication administration (BCMA), blood bank tracking, specimen labeling, and medical device tracking.\n\nThe Joint Commission requires positive patient identification, making barcoded wristbands standard. BCMA systems scan patient, medication, and nurse badges to prevent administration errors.\n\nGS1 standards (GTIN, SSCC) enable full supply chain traceability for medical devices and pharmaceuticals.", category: "healthcare", author: "BarcodeGen Team", publishedAt: "2024-12-15", readTime: "8 min", tags: ["healthcare", "patient safety", "BCMA"], relatedSlugs: ["complete-guide-ean-13-barcodes", "barcode-vs-qr-code-comparison"] },
  { id: "8", slug: "education-qr-codes", title: "QR Codes in Education", excerpt: "Creative ways to use QR codes in classrooms and educational settings.", content: "QR codes enhance learning by linking physical materials to digital resources. Teachers use them for homework links, video lessons, AR experiences, library book information, and student attendance.\n\nBest practices: keep QR codes large enough to scan easily, test on student devices, provide alternative access methods, and use URL shorteners for cleaner codes.", category: "education", author: "BarcodeGen Team", publishedAt: "2024-12-10", readTime: "5 min", tags: ["education", "classroom", "e-learning"], relatedSlugs: ["qr-codes-marketing-best-practices", "restaurant-qr-code-guide"] },
  { id: "9", slug: "retail-barcode-strategy", title: "Retail Barcode Strategy for 2025", excerpt: "Modern retail barcode strategies for omnichannel operations.", content: "Retailers in 2025 need barcodes that work across physical stores, e-commerce, and mobile commerce. GS1 standards provide the foundation with EAN/UPC for products and GS1-128 for shipping.\n\nThe transition to 2D barcodes (GS1 Digital Link) is underway, embedding URLs in scannable codes that work at POS and provide consumers with product information, sustainability data, and promotions.", category: "retail", author: "BarcodeGen Team", publishedAt: "2024-12-05", readTime: "7 min", tags: ["retail", "omnichannel", "GS1"], relatedSlugs: ["complete-guide-ean-13-barcodes", "barcode-vs-qr-code-comparison"] },
  { id: "10", slug: "wifi-qr-code-setup", title: "WiFi QR Code: Complete Setup Guide", excerpt: "Create QR codes that instantly connect users to your WiFi network.", content: "WiFi QR codes encode network credentials (SSID, password, encryption type) in a standardized format that mobile devices can automatically parse to establish connections.\n\nSupported encryption types: WPA/WPA2, WEP, and open networks. The QR code format is: WIFI:T:WPA;S:NetworkName;P:Password;H:false;;\n\nIdeal for hotels, cafes, offices, and events where you want guests to connect without sharing passwords verbally.", category: "technology", author: "BarcodeGen Team", publishedAt: "2024-12-01", readTime: "4 min", tags: ["WiFi", "QR code", "network"], relatedSlugs: ["qr-codes-marketing-best-practices", "restaurant-qr-code-guide"] },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS_FULL.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map((s) => BLOG_POSTS_FULL.find((p) => p.slug === s))
    .filter(Boolean) as BlogPost[];
}
