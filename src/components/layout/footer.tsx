"use client";

import Link from "next/link";
import { ScanBarcode, Mail, Heart, ExternalLink } from "lucide-react";
import { FOOTER_SECTIONS, SOCIAL_LINKS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// ======================
// Footer Component
// ======================

const socialIconMap: Record<string, React.ElementType> = {
  twitter: ExternalLink,
  github: ExternalLink,
  linkedin: ExternalLink,
  youtube: ExternalLink,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-bold text-xl text-surface-900 dark:text-white mb-4"
                aria-label={`${SITE_CONFIG.name} - Home`}
              >
                <ScanBarcode className="h-7 w-7 text-primary-600" />
                {SITE_CONFIG.name}
              </Link>
              <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed max-w-sm mb-6">
                The most powerful free barcode and QR code generator. Create professional barcodes in 30+ formats with high-resolution downloads.
              </p>

              {/* Newsletter */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-surface-900 dark:text-white">
                  Stay Updated
                </p>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Link Columns */}
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5" role="list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-surface-600 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
                        {...(link.isExternal && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-surface-200 dark:border-surface-800">
        <Container>
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-surface-500 dark:text-surface-400 text-center sm:text-left">
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved. Made with{" "}
              <Heart className="inline h-3.5 w-3.5 text-red-500 fill-red-500" aria-label="love" />{" "}
              for developers worldwide.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3" aria-label="Social media links">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-2 rounded-lg text-surface-500 transition-colors",
                      "hover:text-primary-600 hover:bg-surface-100",
                      "dark:text-surface-400 dark:hover:text-primary-400 dark:hover:bg-surface-800"
                    )}
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
