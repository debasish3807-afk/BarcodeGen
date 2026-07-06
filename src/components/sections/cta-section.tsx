"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// CTA Section - Premium Gradient v2.0
// ======================

export function CTASection() {
  return (
    <Section variant="default" spacing="xl">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-10 sm:p-14 md:p-20 lg:p-24 text-center"
        >
          {/* Premium background effects */}
          <div className="absolute inset-0">
            {/* Gradient orbs */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.06] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-400/[0.08] rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"
            />
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-8 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              Start generating in seconds
              <Zap className="h-3.5 w-3.5 opacity-70" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-balance leading-[1.1]"
            >
              Ready to Create Your
              <br className="hidden sm:block" />
              First Barcode?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-5 md:mt-6 text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed font-medium"
            >
              Join over 500,000 users who trust BarcodeGen for professional barcode and QR code generation.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center"
            >
              <Link href="/barcode-generator">
                <Button
                  size="xl"
                  className="rounded-full px-10 py-5 text-base md:text-lg bg-white text-primary-700 hover:bg-white/90 shadow-2xl shadow-black/20 hover:shadow-[0_16px_64px_-8px_rgba(0,0,0,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 font-bold"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Start Generating Free
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="xl"
                  variant="ghost"
                  className="rounded-full px-10 py-5 text-base md:text-lg text-white border-2 border-white/25 hover:bg-white/10 hover:border-white/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 font-bold backdrop-blur-sm"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Explore Features
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
