"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ScanBarcode, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

// ======================
// Hero Section
// ======================

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-surface-950 pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary-100/40 via-accent-50/20 to-transparent dark:from-primary-950/30 dark:via-accent-950/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-secondary-100/30 to-transparent dark:from-secondary-950/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <Badge variant="primary" size="lg" className="mb-6">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Free & Professional
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-surface-900 dark:text-white leading-tight text-balance">
              Generate{" "}
              <span className="gradient-text">Barcodes</span>{" "}
              &{" "}
              <span className="gradient-text">QR Codes</span>{" "}
              Instantly
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-xl mx-auto lg:mx-0 text-balance">
              The most powerful free barcode generator supporting 30+ formats. Create, customize, and download professional barcodes in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/barcode-generator">
                <Button size="xl" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Generate Barcode
                </Button>
              </Link>
              <Link href="/qr-generator">
                <Button size="xl" variant="outline" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Create QR Code
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-surface-500 dark:text-surface-400">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No registration
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                High quality
              </span>
            </div>
          </motion.div>

          {/* Right - Live Preview Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-surface-800 shadow-2xl shadow-primary-500/5 p-8 md:p-12">
              {/* Preview Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-surface-400 font-medium">Live Preview</span>
              </div>

              {/* Barcode Preview Placeholder */}
              <div className="space-y-6">
                <div className="flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-800 rounded-2xl">
                  <ScanBarcode className="h-24 w-24 text-primary-600/60 dark:text-primary-400/60" />
                </div>
                <div className="flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-800 rounded-2xl">
                  <QrCode className="h-24 w-24 text-accent-600/60 dark:text-accent-400/60" />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-primary-600 text-white p-3 rounded-2xl shadow-lg"
              >
                <ScanBarcode className="h-6 w-6" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-accent-600 text-white p-3 rounded-2xl shadow-lg"
              >
                <QrCode className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
