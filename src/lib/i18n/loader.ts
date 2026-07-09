// ======================
// Translation Loader - Lazy loads JSON translation files
// ======================

import type { Locale, TranslationDictionary } from "./types";
import { DEFAULT_LOCALE } from "./config";

/** Cache for loaded translations to avoid re-fetching */
const translationCache = new Map<Locale, TranslationDictionary>();

/** English translations loaded synchronously for SSR and fallback */
import enTranslations from "@/locales/en.json";

// Pre-cache English since it's the fallback
translationCache.set("en", enTranslations as TranslationDictionary);

/**
 * Load translations for a given locale.
 * Uses dynamic import for code splitting (all non-English locales are lazy-loaded).
 * Falls back to English if loading fails.
 */
export async function loadTranslations(locale: Locale): Promise<TranslationDictionary> {
  // Return cached if available
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    let translations: TranslationDictionary;

    switch (locale) {
      case "de":
        translations = (await import("@/locales/de.json")).default as TranslationDictionary;
        break;
      case "fr":
        translations = (await import("@/locales/fr.json")).default as TranslationDictionary;
        break;
      case "es":
        translations = (await import("@/locales/es.json")).default as TranslationDictionary;
        break;
      case "hi":
        translations = (await import("@/locales/hi.json")).default as TranslationDictionary;
        break;
      case "bn":
        translations = (await import("@/locales/bn.json")).default as TranslationDictionary;
        break;
      case "ar":
        translations = (await import("@/locales/ar.json")).default as TranslationDictionary;
        break;
      case "ja":
        translations = (await import("@/locales/ja.json")).default as TranslationDictionary;
        break;
      case "zh":
        translations = (await import("@/locales/zh.json")).default as TranslationDictionary;
        break;
      default:
        translations = enTranslations as TranslationDictionary;
    }

    translationCache.set(locale, translations);
    return translations;
  } catch {
    // Fallback to English on any load error
    console.warn(`[i18n] Failed to load translations for "${locale}", falling back to English.`);
    return enTranslations as TranslationDictionary;
  }
}

/**
 * Get translations synchronously (returns cached or English fallback).
 * Use this for initial render to prevent hydration mismatches.
 */
export function getTranslationsSync(locale: Locale): TranslationDictionary {
  return translationCache.get(locale) || (enTranslations as TranslationDictionary);
}

/**
 * Get English translations (always available synchronously).
 */
export function getEnglishTranslations(): TranslationDictionary {
  return enTranslations as TranslationDictionary;
}
