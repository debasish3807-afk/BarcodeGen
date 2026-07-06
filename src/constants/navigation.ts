import type { NavItem, FooterSection, SocialLink } from "@/types";

// ======================
// Navigation Items
// ======================

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Barcode Generator", href: "/barcode-generator" },
  { label: "QR Generator", href: "/qr-generator" },
  { label: "Batch Generator", href: "/batch-generator" },
  { label: "Templates", href: "/templates" },
  { label: "Scanner", href: "/scanner" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// ======================
// Footer Sections
// ======================

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Generators",
    links: [
      { label: "Barcode Generator", href: "/barcode-generator" },
      { label: "QR Code Generator", href: "/qr-generator" },
      { label: "Bulk Generator", href: "/barcode-generator" },
      { label: "API Access", href: "/features" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Barcode Guide", href: "/barcode-guide" },
      { label: "QR Code Guide", href: "/qr-guide" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "DMCA", href: "/dmca" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/contact" },
      { label: "Contact", href: "/contact" },
      { label: "Features", href: "/features" },
    ],
  },
];

// ======================
// Social Links
// ======================

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Twitter", url: "https://twitter.com/barcodegen", icon: "twitter" },
  { platform: "GitHub", url: "https://github.com/barcodegen", icon: "github" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/barcodegen", icon: "linkedin" },
  { platform: "YouTube", url: "https://youtube.com/@barcodegen", icon: "youtube" },
];
