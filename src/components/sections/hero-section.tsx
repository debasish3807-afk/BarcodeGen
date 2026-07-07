"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ScanBarcode, QrCode, Zap, Shield, Download, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// ======================
// Animated Barcode Visual
// ======================

function AnimatedBarcode() {
  const bars: [number, number][] = [
    [4, 85], [2, 72], [3, 95], [1, 68], [4, 90], [2, 75], [1, 82],
    [3, 98], [2, 70], [4, 88], [1, 77], [3, 93], [2, 65], [4, 86],
    [1, 92], [2, 79], [3, 96], [4, 73], [2, 84], [1, 91], [3, 67],
    [2, 88], [4, 76], [1, 94], [3, 81], [2, 71], [1, 89], [4, 97],
    [3, 74], [2, 83],
  ];
  return (
    <div className="flex items-end justify-center gap-[2px] h-28 md:h-36">
      {bars.map(([width, height], i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.8 + i * 0.02,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-surface-800 dark:bg-white rounded-full origin-bottom"
          style={{
            width: `${width + 1}px`,
            height: `${height}%`,
          }}
        />
      ))}
    </div>
  );
}

// ======================
// Animated QR Pattern
// ======================

function AnimatedQR() {
  const grid: boolean[][] = [
    [true, true, true, false, true, false, true, true, true],
    [true, false, true, true, false, true, true, false, true],
    [true, true, true, false, true, true, true, true, true],
    [false, true, false, true, false, true, false, true, false],
    [true, false, true, true, true, false, true, false, true],
    [false, true, true, false, true, true, false, true, false],
    [true, true, true, true, false, true, false, false, true],
    [true, false, true, false, true, false, true, true, false],
    [true, true, true, true, true, false, true, false, true],
  ];

  return (
    <div className="grid grid-cols-9 gap-[3px] md:gap-1 w-28 h-28 md:w-36 md:h-36 mx-auto">
      {grid.map((row, rowIdx) =>
        row.map((filled, colIdx) => (
          <motion.div
            key={`${rowIdx}-${colIdx}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.9 + (rowIdx * 9 + colIdx) * 0.008,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`rounded-[2px] md:rounded-[3px] ${
              filled
                ? "bg-surface-800 dark:bg-white"
                : "bg-surface-200/50 dark:bg-surface-700/30"
            }`}
          />
        ))
      )}
    </div>
  );
}

// ======================
// Aurora Background with Floating Orbs
// ======================

function AuroraBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large primary orb */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] left-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary-500/[0.08] dark:bg-primary-500/[0.06] rounded-full blur-[100px]"
      />
      {/* Secondary orb */}
      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [10, -15, 10],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-secondary-500/[0.07] dark:bg-secondary-500/[0.05] rounded-full blur-[100px]"
      />
      {/* Accent orb */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          x: [5, -10, 5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-[40%] right-[20%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-accent-500/[0.05] dark:bg-accent-500/[0.04] rounded-full blur-[80px]"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(91,92,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(91,92,235,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_20%,transparent_100%)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
    </div>
  );
}

// ======================
// Floating Badges
// ======================

function FloatingBadges() {
  const badges = [
    { text: "Free", icon: Check, position: "absolute -top-4 right-4 md:right-12", delay: 0 },
    { text: "Fast", icon: Zap, position: "absolute top-1/4 -right-2 md:-right-6", delay: 1.5 },
    { text: "Privacy First", icon: Shield, position: "absolute -bottom-4 left-4 md:left-12", delay: 1 },
    { text: "30+ Formats", icon: Sparkles, position: "absolute top-1/4 -left-2 md:-left-6", delay: 2 },
    { text: "Commercial Use", icon: Globe, position: "absolute bottom-1/4 -right-2 md:-right-8 hidden lg:flex", delay: 2.5 },
  ];

  return (
    <>
      {badges.map(({ text, icon: Icon, position, delay }) => (
        <motion.div
          key={text}
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
          className={`${position} glass px-4 py-2 rounded-full text-xs md:text-sm font-bold text-primary-700 dark:text-primary-300 shadow-xl shadow-primary-500/10 items-center gap-2 hidden sm:flex`}
        >
          <Icon className="h-3.5 w-3.5 text-primary-500" />
          {text}
        </motion.div>
      ))}
    </>
  );
}

// ======================
// Hero Section - Premium Aurora Design
// ======================

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-14 pb-8 md:pt-16 md:pb-12">
      {/* Premium Aurora Background */}
      <AuroraBackground />

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top content */}
          <div className="text-center mb-16 md:mb-20">
            {/* Glass Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary-50/80 dark:bg-primary-950/40 border border-primary-200/60 dark:border-primary-800/40 text-sm font-semibold text-primary-700 dark:text-primary-300 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600" />
                </span>
                Free & Professional — No Signup Required
                <ArrowRight className="h-3.5 w-3.5 opacity-70" />
              </span>
            </motion.div>

            {/* Animated Gradient Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.5rem] leading-[1.08] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-extrabold tracking-[-0.04em] text-surface-900 dark:text-white text-balance"
            >
              Generate Professional{" "}
              <span className="gradient-text-vibrant">Barcodes</span>{" "}
              <br className="hidden md:block" />
              &{" "}
              <span className="gradient-text-vibrant">QR Codes</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-surface-500 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              The most powerful barcode platform. 30+ formats, instant generation,
              production-ready downloads. Trusted by 500K+ users worldwide.
            </motion.p>

            {/* Premium CTAs with shadow animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center"
            >
              <Link href="/barcode-generator">
                <Button
                  size="xl"
                  className="rounded-full px-10 py-5 text-base md:text-lg shadow-[0_8px_32px_-4px_rgba(91,92,235,0.4)] hover:shadow-[0_16px_48px_-4px_rgba(91,92,235,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 hover:from-primary-500 hover:via-secondary-500 hover:to-primary-600"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Start Generating
                </Button>
              </Link>
              <Link href="/qr-generator">
                <Button
                  size="xl"
                  variant="outline"
                  className="rounded-full px-10 py-5 text-base md:text-lg border-2 border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 hover:shadow-[0_8px_32px_-8px_rgba(91,92,235,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Create QR Code
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-3 text-sm md:text-[15px] text-surface-500 dark:text-surface-400 font-medium"
            >
              {[
                { icon: Check, text: "No registration" },
                { icon: Zap, text: "Instant generation" },
                { icon: Shield, text: "Privacy first" },
                { icon: Download, text: "High-res export" },
                { icon: Globe, text: "190+ countries" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-100 dark:bg-accent-900/40">
                    <Icon className="h-3 w-3 text-accent-600 dark:text-accent-400" />
                  </span>
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual - Glass Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Floating Badges */}
            <FloatingBadges />

            {/* Main preview card */}
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/15 to-accent-500/20 rounded-[32px] blur-3xl -z-10 scale-95" />

              <div className="glass-card-elevated p-2 md:p-2.5">
                <div className="bg-white dark:bg-surface-900 rounded-[24px] p-6 md:p-10 overflow-hidden">
                  {/* Window chrome - browser mockup */}
                  <div className="flex items-center gap-3 mb-8 md:mb-10">
                    <div className="flex gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-400/80" />
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
                      <div className="w-3.5 h-3.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex-1 h-9 bg-surface-100/80 dark:bg-surface-800/80 rounded-xl mx-8 md:mx-20 flex items-center justify-center border border-surface-200/40 dark:border-surface-700/40">
                      <span className="text-xs md:text-sm text-surface-400 dark:text-surface-500 font-medium tracking-wide">barcodegen.com/generator</span>
                    </div>
                  </div>

                  {/* Preview grid with animated elements */}
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Barcode Preview */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex flex-col items-center justify-center p-8 md:p-12 bg-surface-50/60 dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/40">
                        <AnimatedBarcode />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                          className="mt-4 flex items-center gap-2"
                        >
                          <ScanBarcode className="h-4 w-4 text-primary-500" />
                          <span className="text-xs md:text-sm font-semibold text-surface-500 dark:text-surface-400 tracking-wide">EAN-13 / Code 128</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* QR Preview */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex flex-col items-center justify-center p-8 md:p-12 bg-surface-50/60 dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/40">
                        <AnimatedQR />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.0 }}
                          className="mt-4 flex items-center gap-2"
                        >
                          <QrCode className="h-4 w-4 text-secondary-500" />
                          <span className="text-xs md:text-sm font-semibold text-surface-500 dark:text-surface-400 tracking-wide">QR Code / Data Matrix</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Scan line animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-6 md:mt-8 h-1 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "400%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      className="h-full w-1/4 bg-gradient-to-r from-transparent via-primary-500/60 to-transparent rounded-full"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
