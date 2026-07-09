"use client";

// ======================
// i18n Context Provider - Production-ready multilingual system
// Features: localStorage persistence, browser detection, RTL support, lazy loading
// ======================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type { Locale, TranslationDictionary } from "./types";
import { DEFAULT_LOCALE, STORAGE_KEY, isValidLocale, isRTL, detectBrowserLocale } from "./config";
import { loadTranslations, getEnglishTranslations, getTranslationsSync } from "./loader";

// ======================
// Context Types
// ======================

interface I18nContextValue {
  /** Current active locale */
  locale: Locale;
  /** Change the active locale (persists to localStorage, updates DOM) */
  setLocale: (locale: Locale) => void;
  /** Current translation dictionary */
  t: TranslationDictionary;
  /** Whether the locale has been initialized from storage/browser */
  isReady: boolean;
  /** Whether the current locale is RTL */
  isRtl: boolean;
  /** Text direction for the current locale */
  dir: "ltr" | "rtl";
}

// ======================
// Context
// ======================

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: getEnglishTranslations(),
  isReady: false,
  isRtl: false,
  dir: "ltr",
});

// ======================
// Provider Component
// ======================

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  // Start with English to avoid hydration mismatch (server always renders English)
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [translations, setTranslations] = useState<TranslationDictionary>(getEnglishTranslations());
  const [isReady, setIsReady] = useState(false);
  const isInitialized = useRef(false);

  // Initialize locale from localStorage or browser detection
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const savedLocale = localStorage.getItem(STORAGE_KEY);

    let detectedLocale: Locale;
    if (savedLocale && isValidLocale(savedLocale)) {
      detectedLocale = savedLocale;
    } else {
      detectedLocale = detectBrowserLocale();
      localStorage.setItem(STORAGE_KEY, detectedLocale);
    }

    if (detectedLocale !== DEFAULT_LOCALE) {
      // Load the detected locale's translations
      loadTranslations(detectedLocale).then((t) => {
        setLocaleState(detectedLocale);
        setTranslations(t);
        applyLocaleToDOM(detectedLocale);
        setIsReady(true);
      });
    } else {
      applyLocaleToDOM(DEFAULT_LOCALE);
      setIsReady(true);
    }
  }, []);

  // Change locale handler
  const setLocale = useCallback(async (newLocale: Locale) => {
    if (!isValidLocale(newLocale)) return;

    // Load translations for the new locale
    const newTranslations = await loadTranslations(newLocale);

    // Update state
    setLocaleState(newLocale);
    setTranslations(newTranslations);

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, newLocale);

    // Update DOM attributes
    applyLocaleToDOM(newLocale);
  }, []);

  // Compute derived values
  const rtl = isRTL(locale);
  const dir = rtl ? "rtl" : "ltr";

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: translations,
        isReady,
        isRtl: rtl,
        dir,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

// ======================
// Hook
// ======================

/**
 * Access the i18n context.
 * Returns: locale, setLocale, t (translations), isReady, isRtl, dir
 */
export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}

// ======================
// DOM Utilities
// ======================

/** Apply locale settings to the HTML document element */
function applyLocaleToDOM(locale: Locale) {
  if (typeof document === "undefined") return;

  const htmlEl = document.documentElement;
  htmlEl.lang = locale;
  htmlEl.dir = isRTL(locale) ? "rtl" : "ltr";
}
