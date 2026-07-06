"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ScanBarcode, QrCode, Check, Zap, Shield, Download, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// ======================
// Hero Section - Premium Locked Design v1.0
// ======================

export function HeroSection() {
  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden pt-20">
      {/* Premium Mesh Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-[15%] w-[500px] h-[500px] bg-primary-400/[0.06] rounded-full blur-[100px] animate-[float_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-16 right-[10%] w-[450px] h-[450px] bg-accent-400/[0.05] rounded-full blur-[90px] animate-[float_11s_ease-in-out_infinite_3s]" />
        <div className="absolute top-1/3 right-[30%] w-[300px] h-[300px] bg-secondary-400/[0.04] rounded-full blur-[80px] animate-[float_7s_ease-in-out_infinite_1.5s]" />
      </div>
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_100%)]" />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Glass Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary-700 dark:text-primary-300 mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              Free & Professional — No Signup Required
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.03em] text-surface-900 dark:text-white leading-[1.06] text-balance"
          >
            Generate Professional{" "}
            <span className="gradient-text">Barcodes</span>{" "}
            <br className="hidden sm:block" />
            &{" "}
            <span className="gradient-text">QR Codes</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed"
          >
            The most powerful barcode platform. 30+ formats, instant generation, production-ready downloads. Trusted by 500K+ users worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/barcode-generator">
              <Button size="xl" className="rounded-full px-8 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 transition-shadow" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Start Generating
              </Button>
            </Link>
            <Link href="/qr-generator">
              <Button size="xl" variant="outline" className="rounded-full px-8 border-surface-200 dark:border-surface-700" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Create QR Code
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-surface-500 dark:text-surface-400"
          >
            {[
              { icon: Check, text: "No registration" },
              { icon: Zap, text: "Instant generation" },
              { icon: Shield, text: "Privacy first" },
              { icon: Download, text: "High-res export" },
              { icon: Globe, text: "190+ countries" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-secondary-500" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero Visual - Premium Window */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative p-1.5 rounded-[28px] bg-gradient-to-b from-surface-200/80 to-surface-200/40 dark:from-surface-700/60 dark:to-surface-800/30 shadow-2xl shadow-surface-900/[0.06]">
            <div className="bg-white dark:bg-surface-900 rounded-[22px] p-6 md:p-10 overflow-hidden">
              {/* Window bar */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-surface-300/80 dark:bg-surface-600/80" />
                  <div className="w-3 h-3 rounded-full bg-surface-300/80 dark:bg-surface-600/80" />
                  <div className="w-3 h-3 rounded-full bg-surface-300/80 dark:bg-surface-600/80" />
                </div>
                <div className="flex-1 h-7 bg-surface-100 dark:bg-surface-800 rounded-lg mx-16 flex items-center justify-center">
                  <span className="text-[11px] text-surface-400 font-medium">barcodegen.com/generator</span>
                </div>
              </div>
              {/* Preview grid */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex items-center justify-center p-10 bg-surface-50/80 dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50">
                  <ScanBarcode className="h-20 w-20 text-primary-500/60" strokeWidth={1.2} />
                </div>
                <div className="flex items-center justify-center p-10 bg-surface-50/80 dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50">
                  <QrCode className="h-20 w-20 text-accent-500/60" strokeWidth={1.2} />
                </div>
              </div>
            </div>
          </div>
          {/* Floating badges */}
          <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-3 right-4 md:right-12 glass px-4 py-2 rounded-full text-xs font-semibold text-primary-700 dark:text-primary-300 shadow-lg">
            <Zap className="h-3.5 w-3.5 inline mr-1.5 text-primary-500" />30+ Formats
          </motion.div>
          <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -bottom-3 left-4 md:left-12 glass px-4 py-2 rounded-full text-xs font-semibold text-accent-700 dark:text-accent-300 shadow-lg">
            <Download className="h-3.5 w-3.5 inline mr-1.5 text-accent-500" />PNG • SVG • PDF
          </motion.div>
          <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-1/2 -left-4 md:-left-6 glass px-3 py-2 rounded-full text-xs font-semibold text-secondary-700 dark:text-secondary-300 shadow-lg hidden lg:block">
            <Globe className="h-3.5 w-3.5 inline mr-1.5 text-secondary-500" />190+ Countries
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
