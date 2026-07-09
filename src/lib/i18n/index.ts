// ======================
// i18n Module - Public API
// ======================

export type { Locale, LanguageConfig, TranslationDictionary, TranslationSection } from "./types";
export {
  DEFAULT_LOCALE,
  SUPPORTED_LANGUAGES,
  SUPPORTED_LOCALES,
  STORAGE_KEY,
  getLanguageConfig,
  isRTL,
  isValidLocale,
  detectBrowserLocale,
} from "./config";
export { loadTranslations, getTranslationsSync, getEnglishTranslations } from "./loader";
export { I18nProvider, useTranslation } from "./i18n-context";
