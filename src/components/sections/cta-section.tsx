"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ScanBarcode, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// Final CTA Section
// ======================

export function CTASection() {
  return (
    <Section variant="default" spacing="lg">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-10 md:p-16 text-center"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <ScanBarcode className="absolute top-8 left-8 h-20 w-20 text-white/5 rotate-12" />
            <QrCode className="absolute bottom-8 right-8 h-20 w-20 text-white/5 -rotate-12" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              Ready to Generate Your First Barcode?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join over 500,000 users who trust BarcodeGen for their professional barcode and QR code needs. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/barcode-generator">
                <Button
                  size="xl"
                  className="bg-white text-primary-700 hover:bg-white/90 shadow-xl"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Start Generating Now
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="xl"
                  variant="ghost"
                  className="text-white border-2 border-white/30 hover:bg-white/10"
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
