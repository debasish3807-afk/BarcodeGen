"use client";

// ======================
// HreflangTags - Dynamic hreflang link tags for SEO
// Updates <head> with alternate language links based on current locale
// ======================

import { useEffect } from "react";
import { useTranslation, SUPPORTED_LOCALES } from "@/lib/i18n";
import { SITE_CONFIG } from "@/constants/site";

export function HreflangTags() {
  const { locale } = useTranslation();

  useEffect(() => {
    // Remove existing hreflang links
    const existing = document.querySelectorAll('link[hreflang]');
    existing.forEach((el) => el.remove());

    const baseUrl = SITE_CONFIG.url;

    // Add hreflang for each supported locale
    SUPPORTED_LOCALES.forEach((loc) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = loc;
      link.href = `${baseUrl}/${loc}`;
      document.head.appendChild(link);
    });

    // Add x-default hreflang
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.href = baseUrl;
    document.head.appendChild(xDefault);

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${baseUrl}/${locale}`);

  }, [locale]);

  return null;
}
