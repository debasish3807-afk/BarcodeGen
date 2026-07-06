"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// CTA Section - Premium Gradient
// ======================

export function CTASection() {
  return (
    <Section variant="default" spacing="lg">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-12 md:p-20 text-center"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/[0.04] rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Start generating in seconds
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">
              Ready to Create Your First Barcode?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              Join over 500,000 users who trust BarcodeGen for professional barcode and QR code generation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/barcode-generator">
                <Button
                  size="xl"
                  className="rounded-full px-8 bg-white text-primary-700 hover:bg-white/90 shadow-xl shadow-black/10"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Start Generating Free
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="xl"
                  variant="ghost"
                  className="rounded-full px-8 text-white border border-white/20 hover:bg-white/10"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
