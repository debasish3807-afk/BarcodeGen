// ======================
// i18n Configuration
// ======================

import type { Locale, LanguageConfig } from "./types";

/** Default locale used as fallback */
export const DEFAULT_LOCALE: Locale = "en";

/** LocalStorage key for persisting language preference */
export const STORAGE_KEY = "barcodegen_locale";

/** All supported languages with their metadata */
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", dir: "ltr" },
];

/** All supported locale codes */
export const SUPPORTED_LOCALES: Locale[] = SUPPORTED_LANGUAGES.map((l) => l.code);

/** Get language config by locale code */
export function getLanguageConfig(locale: Locale): LanguageConfig {
  return SUPPORTED_LANGUAGES.find((l) => l.code === locale) || SUPPORTED_LANGUAGES[0];
}

/** Check if a locale is RTL */
export function isRTL(locale: Locale): boolean {
  return getLanguageConfig(locale).dir === "rtl";
}

/** Check if a string is a valid supported locale */
export function isValidLocale(code: string): code is Locale {
  return SUPPORTED_LOCALES.includes(code as Locale);
}

/** Detect the user's preferred language from browser settings */
export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const browserLangs = navigator.languages || [navigator.language];

  for (const lang of browserLangs) {
    // Try exact match first (e.g. "de" or "fr")
    const code = lang.split("-")[0].toLowerCase();
    if (isValidLocale(code)) return code;
  }

  return DEFAULT_LOCALE;
}
