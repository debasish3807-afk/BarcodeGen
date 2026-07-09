"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";


// ======================
// CTA Section - Premium v5.0
// ======================

export function CTASection() {
  const { t } = useTranslation();

  return (
    <Section variant="muted" spacing="xl" className="relative">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 p-10 sm:p-14 md:p-20 text-center"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            {/* Large animated orb */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/[0.12] rounded-full -translate-y-1/2 translate-x-1/3 blur-[80px]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-400/[0.1] rounded-full translate-y-1/2 -translate-x-1/3 blur-[80px]"
            />

            {/* Floating geometric shapes */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] left-[10%] w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm"
            />
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[15%] right-[10%] w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm"
            />
            <motion.div
              animate={{ y: [-8, 8, -8], x: [4, -4, 4] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[40%] right-[15%] w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06]"
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-8 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              {t.cta.badge}
              <Zap className="h-3.5 w-3.5 opacity-70" />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-balance leading-[1.1]"
            >
              {t.cta.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-5 text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed font-medium"
            >
              {t.cta.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/barcode-generator">
                <Button
                  size="xl"
                  className="rounded-2xl px-10 py-5 text-base md:text-lg bg-white text-primary-700 hover:bg-white/90 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_-8px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 font-bold group"
                  rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />}
                >
                  {t.cta.cta1}
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="xl"
                  variant="ghost"
                  className="rounded-2xl px-10 py-5 text-base md:text-lg text-white border-2 border-white/25 hover:bg-white/10 hover:border-white/40 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 font-bold backdrop-blur-sm group"
                  rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />}
                >
                  {t.cta.cta2}
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
