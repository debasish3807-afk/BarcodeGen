"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Infinity, Globe, Cpu, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// Why Choose BarcodeGen Section
// ======================

const reasons = [
  {
    icon: Shield,
    title: "Industry Standard",
    description: "All generated barcodes comply with international standards and are guaranteed scannable.",
    color: "primary",
  },
  {
    icon: Clock,
    title: "Instant Generation",
    description: "Generate barcodes in milliseconds. No waiting, no queues, no processing delays.",
    color: "secondary",
  },
  {
    icon: Infinity,
    title: "Unlimited Usage",
    description: "No daily limits, no watermarks, no restrictions. Generate as many barcodes as you need.",
    color: "accent",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "Support for international formats including EAN (Europe), UPC (Americas), and JAN (Japan).",
    color: "primary",
  },
  {
    icon: Cpu,
    title: "API Integration",
    description: "RESTful API for seamless integration into your existing workflows and applications.",
    color: "secondary",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data is never stored or shared. All processing happens securely in your browser.",
    color: "accent",
  },
];

const colorClasses: Record<string, { bg: string; icon: string }> = {
  primary: {
    bg: "bg-primary-50 dark:bg-primary-950/50",
    icon: "text-primary-600 dark:text-primary-400",
  },
  secondary: {
    bg: "bg-secondary-50 dark:bg-secondary-950/50",
    icon: "text-secondary-600 dark:text-secondary-400",
  },
  accent: {
    bg: "bg-accent-50 dark:bg-accent-950/50",
    icon: "text-accent-600 dark:text-accent-400",
  },
};

export function WhyChooseSection() {
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <SectionHeader
          badge="Why Choose Us"
          title="Why Choose BarcodeGen?"
          subtitle="Trusted by over 500,000 users worldwide for professional barcode generation."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const colors = colorClasses[reason.color];
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex gap-4"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-1.5">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
