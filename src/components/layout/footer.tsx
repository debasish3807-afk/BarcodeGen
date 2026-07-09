"use client";

import Link from "next/link";
import { ScanBarcode, Heart, ExternalLink, ArrowUpRight, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";


// ======================
// Footer - Premium v5.0
// ======================

const SOCIAL_LINKS = [
  { platform: "Twitter", url: "https://twitter.com/barcodegen", icon: ExternalLink },
  { platform: "GitHub", url: "https://github.com/barcodegen", icon: ExternalLink },
  { platform: "LinkedIn", url: "https://linkedin.com/company/barcodegen", icon: ExternalLink },
  { platform: "YouTube", url: "https://youtube.com/@barcodegen", icon: ExternalLink },
];

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    { title: t.footer.product, links: [
      { label: t.nav.barcodeGenerator, href: "/barcode-generator" },
      { label: t.nav.qrGenerator, href: "/qr-generator" },
      { label: t.nav.batchGenerator, href: "/batch-generator" },
      { label: t.nav.scanner, href: "/scanner" },
      { label: t.nav.templates, href: "/templates" },
    ]},
    { title: t.footer.resources, links: [
      { label: t.nav.blog, href: "/blog" },
      { label: t.nav.faq, href: "/faq" },
      { label: t.nav.features, href: "/features" },
    ]},
    { title: t.footer.developers, links: [
      { label: "API", href: "/features" },
      { label: "GitHub", href: "https://github.com/barcodegen", external: true },
    ]},
    { title: t.footer.company, links: [
      { label: t.nav.contact, href: "/contact" },
      { label: t.footer.privacy, href: "/privacy-policy" },
      { label: t.footer.terms, href: "/terms" },
      { label: t.footer.cookies, href: "/cookie-policy" },
    ]},
  ];

  return (
    <footer className="relative bg-surface-900 dark:bg-surface-950 border-t border-surface-800/40" role="contentinfo" aria-label="Site footer">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      {/* Newsletter Section */}
      <div className="border-b border-surface-800/40">
        <Container size="xl">
          <div className="py-14 md:py-18 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                {t.footer.newsletter}
              </h3>
              <p className="text-sm text-surface-400 max-w-md leading-relaxed">
                {t.footer.newsletterDesc}
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="flex-1 md:w-72 px-5 py-3 rounded-2xl border border-surface-700/60 bg-surface-800/80 text-surface-100 placeholder:text-surface-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/50 transition-all duration-300"
                aria-label={t.footer.emailPlaceholder}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-semibold rounded-2xl hover:from-primary-500 hover:to-secondary-500 hover:shadow-lg hover:shadow-primary-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group"
              >
                {t.footer.subscribe}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </Container>
      </div>


      {/* Main Links */}
      <Container size="xl">
        <div className="py-14 md:py-18">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 font-bold text-lg text-white mb-5 group"
                aria-label={`${SITE_CONFIG.name}`}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all duration-300">
                  <ScanBarcode className="h-4.5 w-4.5 text-white" />
                </div>
                {SITE_CONFIG.name}
              </Link>
              <p className="text-surface-400 text-sm leading-relaxed max-w-xs mb-6">
                {t.footer.description}
              </p>
              <div className="flex items-center gap-1.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl text-surface-400 hover:text-white hover:bg-surface-800 transition-all duration-300"
                      aria-label={social.platform}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link Columns */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold text-surface-200 uppercase tracking-[0.15em] mb-5">
                  {section.title}
                </h3>
                <ul className="space-y-3" role="list">
                  {section.links.map((link) => (
                    <li key={link.label + link.href}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-primary-400 transition-colors duration-300"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3 opacity-60" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-surface-400 hover:text-primary-400 transition-colors duration-300"
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
              &copy; {currentYear} {SITE_CONFIG.name}. {t.footer.copyright}{" "}
              <Heart className="inline h-3 w-3 text-red-500 fill-red-500" aria-label="love" />{" "}
              {t.footer.forDevelopers}
            </p>
            <div className="flex items-center gap-5 text-xs text-surface-500">
              <Link href="/privacy-policy" className="hover:text-surface-300 transition-colors duration-300">{t.footer.privacy}</Link>
              <Link href="/terms" className="hover:text-surface-300 transition-colors duration-300">{t.footer.terms}</Link>
              <Link href="/cookie-policy" className="hover:text-surface-300 transition-colors duration-300">{t.footer.cookies}</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
