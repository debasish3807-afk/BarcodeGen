// ======================
// i18n Type Definitions
// ======================

/** Supported locale codes */
export type Locale = "en" | "de" | "fr" | "es" | "hi" | "bn" | "ar" | "ja" | "zh";

/** Language configuration with metadata */
export interface LanguageConfig {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  dir: "ltr" | "rtl";
}

/** Full translation dictionary type (matches JSON structure) */
export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    home: string;
    features: string;
    tools: string;
    blog: string;
    faq: string;
    contact: string;
    barcodeGenerator: string;
    qrGenerator: string;
    batchGenerator: string;
    templates: string;
    scanner: string;
    aiGenerator: string;
    getStarted: string;
    signIn: string;
    favorites: string;
    search: string;
    searchPlaceholder: string;
    language: string;
    skipToContent: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight1: string;
    titleAnd: string;
    titleHighlight2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    trust1: string;
    trust2: string;
    trust3: string;
    trust4: string;
    trust5: string;
    rating: string;
    trustedBy: string;
  };
  stats: {
    barcodesGenerated: string;
    activeUsers: string;
    barcodeFormats: string;
    countriesServed: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    feature5Title: string;
    feature5Desc: string;
    feature6Title: string;
    feature6Desc: string;
    feature7Title: string;
    feature7Desc: string;
    feature8Title: string;
    feature8Desc: string;
  };
  whyChoose: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    exploreFeatures: string;
    reason1Title: string;
    reason1Desc: string;
    reason2Title: string;
    reason2Desc: string;
    reason3Title: string;
    reason3Desc: string;
    reason4Title: string;
    reason4Desc: string;
    reason5Title: string;
    reason5Desc: string;
    reason6Title: string;
    reason6Desc: string;
  };
  barcodeTypes: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    categoryProduct: string;
    categoryIndustrial: string;
    categoryLogistics: string;
    categoryPublishing: string;
    category2D: string;
    categorySpecialty: string;
  };
  qrTypes: {
    badge: string;
    title: string;
    subtitle: string;
    createNow: string;
    url: string;
    urlDesc: string;
    text: string;
    textDesc: string;
    wifi: string;
    wifiDesc: string;
    vcard: string;
    vcardDesc: string;
    email: string;
    emailDesc: string;
    phone: string;
    phoneDesc: string;
    sms: string;
    smsDesc: string;
    location: string;
    locationDesc: string;
    calendar: string;
    calendarDesc: string;
    appStore: string;
    appStoreDesc: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    overallRating: string;
  };
  blog: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    minRead: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    stillHaveQuestions: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  footer: {
    description: string;
    newsletter: string;
    newsletterDesc: string;
    subscribe: string;
    emailPlaceholder: string;
    product: string;
    resources: string;
    developers: string;
    company: string;
    copyright: string;
    forDevelopers: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
  common: {
    generate: string;
    download: string;
    copy: string;
    reset: string;
    search: string;
    share: string;
    print: string;
    loading: string;
    success: string;
    error: string;
    tryAgain: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    confirm: string;
    yes: string;
    no: string;
    or: string;
    and: string;
    noResults: string;
    copiedToClipboard: string;
    downloadStarted: string;
    generationComplete: string;
    invalidInput: string;
    required: string;
    optional: string;
  };
  megaMenu: {
    barcodeDesc: string;
    qrDesc: string;
    batchDesc: string;
    scannerDesc: string;
    templatesDesc: string;
    aiDesc: string;
    startFree: string;
  };
}

/** Section keys for accessing translation sections */
export type TranslationSection = keyof TranslationDictionary;
