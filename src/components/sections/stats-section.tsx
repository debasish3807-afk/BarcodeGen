"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Layers, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";


// ======================
// Animated Counter - Premium with easing
// ======================

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    const duration = 2200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out-quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(numericValue * eased);

      if (value.includes("M")) {
        setDisplayValue(`${current}M`);
      } else if (value.includes("K")) {
        setDisplayValue(`${current}K`);
      } else {
        setDisplayValue(current.toString());
      }

      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(value);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      <span className="text-primary-500">{suffix}</span>
    </span>
  );
}


// ======================
// Stats Section - Premium Gradient Cards with Border Glow
// ======================

const statIcons = [TrendingUp, Users, Layers, Globe];
const statGradients = [
  "from-primary-500 to-primary-600",
  "from-secondary-500 to-secondary-600",
  "from-accent-500 to-accent-600",
  "from-primary-600 to-secondary-500",
];

const statBorderColors = [
  "group-hover:border-primary-300 dark:group-hover:border-primary-700",
  "group-hover:border-secondary-300 dark:group-hover:border-secondary-700",
  "group-hover:border-accent-300 dark:group-hover:border-accent-700",
  "group-hover:border-primary-300 dark:group-hover:border-primary-700",
];

const statGlows = [
  "group-hover:shadow-primary-500/10 dark:group-hover:shadow-primary-500/5",
  "group-hover:shadow-secondary-500/10 dark:group-hover:shadow-secondary-500/5",
  "group-hover:shadow-accent-500/10 dark:group-hover:shadow-accent-500/5",
  "group-hover:shadow-primary-500/10 dark:group-hover:shadow-primary-500/5",
];

const STAT_DATA = [
  { id: "1", value: "10M", suffix: "+", labelKey: "barcodesGenerated" as const },
  { id: "2", value: "500K", suffix: "+", labelKey: "activeUsers" as const },
  { id: "3", value: "30", suffix: "+", labelKey: "barcodeFormats" as const },
  { id: "4", value: "190", suffix: "+", labelKey: "countriesServed" as const },
];

export function StatsSection() {
  const { t } = useTranslation();

  return (
    <Section variant="default" spacing="lg" className="relative overflow-hidden">
      {/* Background treatment */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-50/80 to-white dark:from-surface-900/50 dark:to-surface-950 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <Container size="xl" className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STAT_DATA.map((stat, index) => {
            const Icon = statIcons[index % statIcons.length];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-900/60 border border-surface-200/60 dark:border-surface-700/30 ${statBorderColors[index]} transition-all duration-500 text-center hover:-translate-y-2 hover:shadow-2xl ${statGlows[index]} cursor-default overflow-hidden`}
              >
                {/* Gradient top border on hover */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${statGradients[index % statGradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl`} />

                {/* Subtle background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${statGradients[index % statGradients.length]} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                <div className="relative mb-5 flex justify-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${statGradients[index % statGradients.length]} flex items-center justify-center shadow-lg shadow-primary-500/10 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                  </div>
                </div>
                <div className="relative">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-none">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2.5 text-sm text-surface-500 dark:text-surface-400 font-medium">
                    {t.stats[stat.labelKey]}
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
