"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ScanBarcode, QrCode, Check, Zap, Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// ======================
// Hero Section - Premium SaaS Design
// ======================

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-primary-400/[0.07] rounded-full blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-accent-400/[0.06] rounded-full blur-[100px] animate-[float_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-200/[0.04] to-accent-200/[0.04] rounded-full blur-[80px]" />
      </div>
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-200/60 dark:border-primary-800/40 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Free & Open — No Signup Required
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-surface-900 dark:text-white leading-[1.08] text-balance"
          >
            Generate Professional{" "}
            <span className="gradient-text">Barcodes</span> &{" "}
            <span className="gradient-text">QR Codes</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed"
          >
            The most powerful barcode platform supporting 30+ formats. Create, customize, and download production-ready barcodes and QR codes in seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/barcode-generator">
              <Button size="xl" className="rounded-full px-8 shadow-lg shadow-primary-600/20" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Generate Barcode
              </Button>
            </Link>
            <Link href="/qr-generator">
              <Button size="xl" variant="outline" className="rounded-full px-8" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Create QR Code
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-surface-500 dark:text-surface-400"
          >
            {[
              { icon: Check, text: "No registration needed" },
              { icon: Zap, text: "Instant generation" },
              { icon: Shield, text: "Privacy first" },
              { icon: Download, text: "High-res downloads" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary-500" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="relative glass-card p-2 rounded-3xl">
            <div className="bg-surface-50 dark:bg-surface-900 rounded-2xl p-6 md:p-10">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 h-7 bg-surface-200/60 dark:bg-surface-700/60 rounded-lg mx-12" />
              </div>
              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center justify-center p-8 bg-white dark:bg-surface-800 rounded-xl border border-surface-200/60 dark:border-surface-700/60">
                  <ScanBarcode className="h-20 w-20 text-primary-500/70" strokeWidth={1.5} />
                </div>
                <div className="flex items-center justify-center p-8 bg-white dark:bg-surface-800 rounded-xl border border-surface-200/60 dark:border-surface-700/60">
                  <QrCode className="h-20 w-20 text-accent-500/70" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
          {/* Floating badges */}
          <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 -right-2 md:right-8 glass px-4 py-2 rounded-full text-xs font-semibold text-primary-700 dark:text-primary-300">
            <Zap className="h-3.5 w-3.5 inline mr-1.5" />30+ Formats
          </motion.div>
          <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute -bottom-3 -left-2 md:left-8 glass px-4 py-2 rounded-full text-xs font-semibold text-accent-700 dark:text-accent-300">
            <Download className="h-3.5 w-3.5 inline mr-1.5" />PNG • SVG • PDF
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
