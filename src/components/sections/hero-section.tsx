"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ScanBarcode,
  QrCode,
  Zap,
  Shield,
  Download,
  Globe,
  Check,
  Star,
  ChevronDown,
  MousePointer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useTranslation } from "@/lib/i18n";



// ======================
// Animated Barcode Visual - Enhanced
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
            duration: 0.5,
            delay: 0.8 + i * 0.02,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-surface-800 dark:bg-white rounded-full origin-bottom"
          style={{ width: `${width + 1}px`, height: `${height}%` }}
        />
      ))}
    </div>
  );
}



// ======================
// Animated QR Pattern - Enhanced
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
            initial={{ scale: 0, opacity: 0, borderRadius: "50%" }}
            animate={{ scale: 1, opacity: 1, borderRadius: "3px" }}
            transition={{
              duration: 0.4,
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
// Background Particles - Premium
// ======================

const PARTICLE_POSITIONS = [
  { left: 12, top: 8, size: 3, duration: 4.2, delay: 0.5 },
  { left: 85, top: 15, size: 2, duration: 5.1, delay: 1.2 },
  { left: 45, top: 22, size: 4, duration: 3.8, delay: 0.8 },
  { left: 72, top: 35, size: 2, duration: 6.0, delay: 2.1 },
  { left: 28, top: 42, size: 3, duration: 4.5, delay: 1.5 },
  { left: 92, top: 55, size: 2, duration: 5.5, delay: 0.3 },
  { left: 18, top: 62, size: 4, duration: 3.5, delay: 2.8 },
  { left: 55, top: 70, size: 3, duration: 4.8, delay: 1.0 },
  { left: 38, top: 78, size: 2, duration: 5.8, delay: 0.7 },
  { left: 78, top: 85, size: 3, duration: 4.0, delay: 2.4 },
  { left: 8, top: 30, size: 2, duration: 5.3, delay: 1.8 },
  { left: 62, top: 48, size: 4, duration: 3.9, delay: 0.2 },
  { left: 48, top: 92, size: 2, duration: 6.2, delay: 2.6 },
  { left: 22, top: 55, size: 3, duration: 4.7, delay: 1.3 },
  { left: 88, top: 72, size: 2, duration: 5.0, delay: 0.9 },
  { left: 35, top: 18, size: 3, duration: 4.3, delay: 2.0 },
  { left: 68, top: 88, size: 4, duration: 5.7, delay: 0.6 },
  { left: 52, top: 38, size: 2, duration: 3.6, delay: 1.7 },
  { left: 15, top: 82, size: 3, duration: 6.1, delay: 2.3 },
  { left: 82, top: 28, size: 2, duration: 4.9, delay: 0.4 },
];

function BackgroundParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLE_POSITIONS.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(79, 70, 229, 0.2) 100%)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}



// ======================
// Aurora Background with Mouse Tracking - Premium v2
// ======================

function AuroraBackground({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Primary large orb */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: `translate(${mouseX * 0.03}px, ${mouseY * 0.03}px)` }}
        className="absolute top-[5%] left-[5%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-primary-500/[0.08] dark:bg-primary-500/[0.06] rounded-full blur-[140px]"
      />
      {/* Secondary orb */}
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -15, 10] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ transform: `translate(${mouseX * -0.02}px, ${mouseY * -0.02}px)` }}
        className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-secondary-500/[0.07] dark:bg-secondary-500/[0.05] rounded-full blur-[140px]"
      />
      {/* Accent orb - center */}
      <motion.div
        animate={{ y: [-15, 15, -15], x: [5, -10, 5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{ transform: `translate(${mouseX * 0.015}px, ${mouseY * 0.015}px)` }}
        className="absolute top-[35%] right-[20%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent-500/[0.05] dark:bg-accent-500/[0.04] rounded-full blur-[120px]"
      />
      {/* Small warm accent */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[60%] left-[30%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-primary-400/[0.04] dark:bg-primary-400/[0.03] rounded-full blur-[100px]"
      />

      {/* Grid overlay - subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_20%,transparent_100%)]" />

      {/* Noise texture for depth */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
    </div>
  );
}



// ======================
// Floating Badges - Premium with blur reveal
// ======================

function FloatingBadges() {
  const badges = [
    { text: "Free Forever", icon: Check, position: "absolute -top-4 right-4 md:right-12", delay: 0 },
    { text: "Lightning Fast", icon: Zap, position: "absolute top-1/4 -right-2 md:-right-6", delay: 1.5 },
    { text: "Privacy First", icon: Shield, position: "absolute -bottom-4 left-4 md:left-12", delay: 1 },
    { text: "30+ Formats", icon: Sparkles, position: "absolute top-1/4 -left-2 md:-left-6", delay: 2 },
    { text: "Commercial Use", icon: Globe, position: "absolute bottom-1/4 -right-2 md:-right-8 hidden lg:flex", delay: 2.5 },
  ];

  return (
    <>
      {badges.map(({ text, icon: Icon, position, delay }) => (
        <motion.div
          key={text}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: [-6, 6, -6] }}
          transition={{
            opacity: { duration: 0.6, delay: 1.5 + delay * 0.3 },
            scale: { duration: 0.6, delay: 1.5 + delay * 0.3 },
            filter: { duration: 0.6, delay: 1.5 + delay * 0.3 },
            y: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay: delay },
          }}
          className={`${position} glass-ultra px-4 py-2.5 rounded-2xl text-xs font-bold text-surface-700 dark:text-surface-200 shadow-depth items-center gap-2 hidden sm:flex`}
        >
          <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
            <Icon className="h-3 w-3 text-white" />
          </span>
          {text}
        </motion.div>
      ))}
    </>
  );
}



// ======================
// Company Logos - Premium Marquee Style
// ======================

function CompanyLogos() {
  const { t } = useTranslation();
  const companies = [
    "Shopify", "Amazon", "DHL", "FedEx", "Walmart", "Alibaba", "UPS", "Target"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-16 md:mt-24"
    >
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-surface-400 dark:text-surface-500 mb-8">
        {t.hero.trustedBy}
      </p>
      <div className="relative overflow-hidden fade-edges-x">
        <div className="flex items-center gap-12 md:gap-16 animate-marquee whitespace-nowrap">
          {[...companies, ...companies].map((company, i) => (
            <span
              key={`${company}-${i}`}
              className="text-base md:text-lg font-bold text-surface-300 dark:text-surface-600 tracking-wide select-none"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}



// ======================
// Rating Badge - Premium
// ======================

function RatingBadge() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-surface-800/80 border border-surface-200/60 dark:border-surface-700/40 shadow-depth backdrop-blur-xl"
    >
      <div className="flex -space-x-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 border-2 border-white dark:border-surface-800 flex items-center justify-center shadow-sm"
          >
            <span className="text-[9px] font-bold text-white">
              {String.fromCharCode(65 + i)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <span className="text-xs font-bold text-surface-600 dark:text-surface-300">
        {t.hero.rating}
      </span>
    </motion.div>
  );
}



// ======================
// Scroll Indicator
// ======================

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-surface-400 dark:text-surface-500">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 rounded-full border-2 border-surface-300 dark:border-surface-600 flex items-start justify-center p-1"
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-primary-500"
        />
      </motion.div>
    </motion.div>
  );
}



// ======================
// Live Stats Counter
// ======================

function LiveStats() {
  const [count, setCount] = useState(10247863);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="flex items-center gap-6 justify-center mt-6"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-xs font-semibold text-surface-500 dark:text-surface-400">
          <span className="text-surface-900 dark:text-white font-bold tabular-nums">
            {count.toLocaleString()}
          </span>{" "}
          barcodes generated
        </span>
      </div>
    </motion.div>
  );
}



// ======================
// Hero Section - Premium Enterprise Design v5.0
// ======================

export function HeroSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.97]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20 pb-8 md:pt-24 md:pb-12"
    >
      {/* Premium Aurora Background */}
      <AuroraBackground mouseX={mousePosition.x * 40} mouseY={mousePosition.y * 40} />
      <BackgroundParticles />

      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="w-full">
        <Container size="xl" className="relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Top content */}
            <div className="text-center mb-16 md:mb-20">


              {/* Glass Badge with blur reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-primary-50/80 dark:bg-primary-950/40 border border-primary-200/60 dark:border-primary-800/40 text-sm font-semibold text-primary-700 dark:text-primary-300 shadow-sm backdrop-blur-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600" />
                  </span>
                  {t.hero.badge}
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
                {t.hero.title1}{" "}
                <span className="gradient-text-shimmer">{t.hero.titleHighlight1}</span>{" "}
                <br className="hidden md:block" />
                {t.hero.titleAnd}{" "}
                <span className="gradient-text-shimmer">{t.hero.titleHighlight2}</span>
              </motion.h1>


              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-surface-500 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed font-medium"
              >
                {t.hero.subtitle}
              </motion.p>

              {/* Premium CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center"
              >
                <Link href="/barcode-generator">
                  <Button
                    size="xl"
                    className="rounded-2xl px-10 py-5 text-base md:text-lg shadow-[0_8px_32px_-4px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_60px_-8px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 hover:from-primary-500 hover:via-secondary-500 hover:to-primary-600 btn-ripple group"
                    rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />}
                  >
                    {t.hero.cta1}
                  </Button>
                </Link>
                <Link href="/qr-generator">
                  <Button
                    size="xl"
                    variant="outline"
                    className="rounded-2xl px-10 py-5 text-base md:text-lg border-2 border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 hover:shadow-[0_12px_40px_-8px_rgba(37,99,235,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 backdrop-blur-sm group"
                    rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />}
                  >
                    {t.hero.cta2}
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
                  { icon: Check, text: t.hero.trust1 },
                  { icon: Zap, text: t.hero.trust2 },
                  { icon: Shield, text: t.hero.trust3 },
                  { icon: Download, text: t.hero.trust4 },
                  { icon: Globe, text: t.hero.trust5 },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-900/40 dark:to-primary-900/40">
                      <Icon className="h-3 w-3 text-accent-600 dark:text-accent-400" />
                    </span>
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* Rating Badge & Live Stats */}
              <div className="mt-8 flex flex-col items-center gap-4">
                <RatingBadge />
                <LiveStats />
              </div>
            </div>


            {/* Hero Visual - Glass Browser Mockup with 3D perspective */}
            <motion.div
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl mx-auto"
              style={{
                transform: `perspective(1200px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * -2}deg)`,
              }}
            >
              {/* Floating Badges */}
              <FloatingBadges />

              {/* Main preview card */}
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/15 to-accent-500/20 rounded-[32px] blur-3xl -z-10 scale-95 animate-breathe" />

                <div className="glass-card-elevated p-2 md:p-2.5">
                  <div className="bg-white dark:bg-surface-900 rounded-[24px] p-6 md:p-10 overflow-hidden relative">
                    {/* Window chrome */}
                    <div className="flex items-center gap-3 mb-8 md:mb-10">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors cursor-pointer" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-500 transition-colors cursor-pointer" />
                        <div className="w-3 h-3 rounded-full bg-green-400/80 hover:bg-green-500 transition-colors cursor-pointer" />
                      </div>
                      <div className="flex-1 h-9 bg-surface-100/80 dark:bg-surface-800/80 rounded-xl mx-8 md:mx-20 flex items-center justify-center border border-surface-200/40 dark:border-surface-700/40 gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        <span className="text-xs text-surface-400 dark:text-surface-500 font-medium tracking-wide">barcodegen.com/generator</span>
                      </div>
                    </div>


                    {/* Preview grid */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      {/* Barcode Preview */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex flex-col items-center justify-center p-8 md:p-12 bg-surface-50/60 dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/40 hover:border-primary-200/60 dark:hover:border-primary-700/40 transition-colors duration-300">
                          <AnimatedBarcode />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                            className="mt-4 flex items-center gap-2"
                          >
                            <ScanBarcode className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                            <span className="text-xs md:text-sm font-semibold text-surface-500 dark:text-surface-400 tracking-wide">EAN-13 / Code 128</span>
                          </motion.div>
                        </div>
                      </div>

                      {/* QR Preview */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex flex-col items-center justify-center p-8 md:p-12 bg-surface-50/60 dark:bg-surface-800/40 rounded-2xl border border-surface-100 dark:border-surface-700/40 hover:border-secondary-200/60 dark:hover:border-secondary-700/40 transition-colors duration-300">
                          <AnimatedQR />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.0 }}
                            className="mt-4 flex items-center gap-2"
                          >
                            <QrCode className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
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

                    {/* Bottom toolbar */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                      className="mt-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-950/50 text-[10px] font-bold text-primary-700 dark:text-primary-300">PNG</span>
                        <span className="px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-[10px] font-bold text-surface-500">SVG</span>
                        <span className="px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-[10px] font-bold text-surface-500">PDF</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-surface-400">
                        <MousePointer className="h-3 w-3" />
                        <span>Click to generate</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Company Logos */}
            <CompanyLogos />
          </div>
        </Container>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
