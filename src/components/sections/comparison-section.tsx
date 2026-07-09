"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { cn } from "@/lib/utils";

// ======================
// Feature Comparison Section
// ======================

const PLANS = [
  { name: "Free", price: "$0", period: "forever", highlighted: false },
  { name: "Pro", price: "$9", period: "/month", highlighted: true },
  { name: "Enterprise", price: "Custom", period: "contact us", highlighted: false },
];

const FEATURES = [
  { name: "Barcode Formats", free: "30+", pro: "30+", enterprise: "30+" },
  { name: "QR Code Types", free: "10+", pro: "15+", enterprise: "Unlimited" },
  { name: "Downloads/month", free: "50", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Batch Generation", free: false, pro: true, enterprise: true },
  { name: "API Access", free: false, pro: true, enterprise: true },
  { name: "Custom Branding", free: false, pro: true, enterprise: true },
  { name: "Priority Support", free: false, pro: true, enterprise: true },
  { name: "White Label", free: false, pro: false, enterprise: true },
  { name: "SLA Guarantee", free: false, pro: false, enterprise: true },
  { name: "Dedicated Manager", free: false, pro: false, enterprise: true },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-semibold text-surface-900 dark:text-white">{value}</span>;
  }
  return value ? (
    <Check className="h-5 w-5 text-green-500" />
  ) : (
    <X className="h-5 w-5 text-surface-300 dark:text-surface-600" />
  );
}

export function ComparisonSection() {
  return (
    <Section variant="default" spacing="xl" className="relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Container size="lg" className="relative">
        <SectionHeader
          badge="Plans"
          title="Compare Plans"
          subtitle="Choose the perfect plan for your needs. Start free and upgrade as you grow."
        />

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[640px]">
            {/* Header */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="p-4" />
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "p-5 rounded-2xl text-center",
                    plan.highlighted
                      ? "bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/20"
                      : "bg-surface-50 dark:bg-surface-800/40 border border-surface-200/60 dark:border-surface-700/30"
                  )}
                >
                  {plan.highlighted && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="h-3 w-3" /> Most Popular
                    </span>
                  )}
                  <h3 className={cn(
                    "text-lg font-bold",
                    !plan.highlighted && "text-surface-900 dark:text-white"
                  )}>{plan.name}</h3>
                  <div className="mt-1">
                    <span className={cn(
                      "text-2xl font-extrabold",
                      !plan.highlighted && "text-surface-900 dark:text-white"
                    )}>{plan.price}</span>
                    <span className={cn(
                      "text-xs ml-1",
                      plan.highlighted ? "text-white/70" : "text-surface-500 dark:text-surface-400"
                    )}>{plan.period}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Rows */}
            {FEATURES.map((feature, idx) => (
              <div
                key={feature.name}
                className={cn(
                  "grid grid-cols-4 gap-3 py-3.5 px-4 rounded-xl",
                  idx % 2 === 0 && "bg-surface-50/50 dark:bg-surface-800/20"
                )}
              >
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300 flex items-center">
                  {feature.name}
                </span>
                <div className="flex items-center justify-center">
                  <CellValue value={feature.free} />
                </div>
                <div className="flex items-center justify-center">
                  <CellValue value={feature.pro} />
                </div>
                <div className="flex items-center justify-center">
                  <CellValue value={feature.enterprise} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/pricing">
            <Button variant="gradient" size="lg" className="rounded-full px-8">
              View Full Pricing
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
