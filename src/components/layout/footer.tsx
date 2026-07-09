"use client";

import Link from "next/link";
import { ScanBarcode, Heart, ExternalLink, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import { Container } from "@/components/ui/container";

// ======================
// Footer Component - Premium Enterprise Design
// ======================

const FOOTER_LINKS = {
  product: {
    title: "Product",
    links: [
      { label: "Barcode Generator", href: "/barcode-generator" },
      { label: "QR Code Generator", href: "/qr-generator" },
      { label: "Batch Generator", href: "/batch-generator" },
      { label: "Scanner", href: "/scanner" },
      { label: "Templates", href: "/templates" },
      { label: "AI Generator", href: "/ai-generator" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/features" },
      { label: "FAQ", href: "/faq" },
      { label: "Barcode Guide", href: "/blog" },
      { label: "QR Code Guide", href: "/blog" },
      { label: "API Reference", href: "/features" },
    ],
  },
  developers: {
    title: "Developers",
    links: [
      { label: "API Access", href: "/features" },
      { label: "Integrations", href: "/features" },
      { label: "GitHub", href: "https://github.com/barcodegen", external: true },
      { label: "Status", href: "/features" },
      { label: "Changelog", href: "/blog" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/contact" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "DMCA", href: "/dmca" },
    ],
  },
};


const SOCIAL_LINKS = [
  { platform: "Twitter", url: "https://twitter.com/barcodegen", icon: ExternalLink },
  { platform: "GitHub", url: "https://github.com/barcodegen", icon: ExternalLink },
  { platform: "LinkedIn", url: "https://linkedin.com/company/barcodegen", icon: ExternalLink },
  { platform: "YouTube", url: "https://youtube.com/@barcodegen", icon: ExternalLink },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-surface-900 dark:bg-surface-950 border-t border-surface-800/40"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      {/* Newsletter Section */}
      <div className="border-b border-surface-800/40">
        <Container size="xl">
          <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">
                Stay ahead of the curve
              </h3>
              <p className="text-sm text-surface-400 max-w-md">
                Get the latest barcode tips, product updates, and industry news delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg border border-surface-700 bg-surface-800/80 text-surface-100 placeholder:text-surface-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-500 transition-colors shadow-sm shadow-primary-600/20"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </div>


      {/* Main Footer Links */}
      <Container size="xl">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-bold text-lg text-white mb-4 group"
                aria-label={`${SITE_CONFIG.name} - Home`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ScanBarcode className="h-4 w-4 text-white" />
                </div>
                {SITE_CONFIG.name}
              </Link>
              <p className="text-surface-400 text-sm leading-relaxed max-w-xs mb-6">
                The most powerful free barcode and QR code generator. Create professional barcodes in 30+ formats.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 transition-all duration-200"
                      aria-label={`Follow us on ${social.platform}`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>


            {/* Link Columns */}
            {Object.values(FOOTER_LINKS).map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold text-surface-200 uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5" role="list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-surface-400 hover:text-primary-400 transition-colors"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3 opacity-60" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-surface-400 hover:text-primary-400 transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-surface-800/60">
        <Container size="xl">
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500 text-center sm:text-left">
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved. Made with{" "}
              <Heart className="inline h-3 w-3 text-red-500 fill-red-500" aria-label="love" />{" "}
              for developers worldwide.
            </p>

            <div className="flex items-center gap-4 text-xs text-surface-500">
              <Link href="/privacy-policy" className="hover:text-surface-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-surface-300 transition-colors">
                Terms
              </Link>
              <Link href="/cookie-policy" className="hover:text-surface-300 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
