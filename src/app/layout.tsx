import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HreflangTags } from "@/components/seo/hreflang-tags";
import { SITE_CONFIG, SEO_DEFAULTS } from "@/constants/site";
import "@/styles/globals.css";

// ======================
// Fonts
// ======================

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

// ======================
// Metadata
// ======================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SEO_DEFAULTS.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords as unknown as string[],
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  verification: {
    google: "a_wCLLbz3vdOT35XAGcjGXt-27MvxRCfWYBGML4onEQ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SEO_DEFAULTS.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [SEO_DEFAULTS.ogImage],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en": `${SITE_CONFIG.url}/en`,
      "de": `${SITE_CONFIG.url}/de`,
      "fr": `${SITE_CONFIG.url}/fr`,
      "es": `${SITE_CONFIG.url}/es`,
      "hi": `${SITE_CONFIG.url}/hi`,
      "bn": `${SITE_CONFIG.url}/bn`,
      "ar": `${SITE_CONFIG.url}/ar`,
      "ja": `${SITE_CONFIG.url}/ja`,
      "zh": `${SITE_CONFIG.url}/zh`,
      "x-default": SITE_CONFIG.url,
    },
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ======================
// Root Layout
// ======================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${jetbrainsMono.variable} ${manrope.variable}`}
    >
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9635446503329909"
          crossOrigin="anonymous"
        />

        {/* Microsoft Clarity Placeholder */}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
              `,
            }}
          />
        )}

        {/* Google Search Console Verification */}
        {process.env.NEXT_PUBLIC_SEARCH_CONSOLE_ID && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_SEARCH_CONSOLE_ID}
          />
        )}
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Providers>
          <HreflangTags />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
        <GoogleAnalytics gaId="G-C9XC0D7F1Q" />
      </body>
    </html>
  );
}
