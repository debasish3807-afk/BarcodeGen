"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Layers, Globe } from "lucide-react";
import { STATS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// Animated Counter
// ======================

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(numericValue * eased);

      if (value.includes("M")) {
        setDisplayValue(`${(current / 1).toFixed(0)}M`);
      } else if (value.includes("K")) {
        setDisplayValue(`${(current / 1).toFixed(0)}K`);
      } else {
        setDisplayValue(current.toString());
      }

      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(value);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      <span className="text-primary-500">{suffix}</span>
    </span>
  );
}


// ======================
// Stats Section - Premium Gradient Cards
// ======================

const statIcons = [TrendingUp, Users, Layers, Globe];
const statGradients = [
  "from-primary-500 to-primary-600",
  "from-secondary-500 to-secondary-600",
  "from-accent-500 to-accent-600",
  "from-primary-600 to-secondary-500",
];

export function StatsSection() {
  return (
    <Section variant="default" spacing="lg" className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-50/80 to-white dark:from-surface-900/50 dark:to-surface-950 pointer-events-none" />

      <Container size="xl" className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, index) => {
            const Icon = statIcons[index % statIcons.length];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-surface-900/60 border border-surface-200/60 dark:border-surface-700/30 transition-all duration-500 text-center hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary-500/5 cursor-default overflow-hidden"
              >
                {/* Subtle top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${statGradients[index % statGradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon */}
                <div className="relative mb-4 flex justify-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${statGradients[index % statGradients.length]} flex items-center justify-center shadow-lg shadow-primary-500/10 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                </div>

                <div className="relative">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-none">
                    {stat.prefix}
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-surface-500 dark:text-surface-400 font-medium">
                    {stat.label}
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
