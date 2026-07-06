"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Layers, Globe } from "lucide-react";
import { STATS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// Stats Section - Premium Gradient Cards v2.0
// ======================

const statIcons = [TrendingUp, Users, Layers, Globe];
const statGradients = [
  "from-primary-500 to-primary-600",
  "from-accent-500 to-accent-600",
  "from-secondary-500 to-secondary-600",
  "from-primary-500 to-accent-500",
];
const statGlows = [
  "group-hover:shadow-primary-500/20",
  "group-hover:shadow-accent-500/20",
  "group-hover:shadow-secondary-500/20",
  "group-hover:shadow-primary-500/20",
];

export function StatsSection() {
  return (
    <Section variant="default" spacing="lg" className="relative section-divider">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-50/50 to-transparent dark:from-surface-900/30 dark:to-transparent pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {STATS.map((stat, index) => {
            const Icon = statIcons[index % statIcons.length];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-surface-900/60 border border-surface-200/60 dark:border-surface-700/30 hover:border-surface-300/80 dark:hover:border-surface-600/50 transition-all duration-500 text-center hover:-translate-y-2 hover:shadow-2xl ${statGlows[index % statGlows.length]} cursor-default`}
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/[0.03] via-transparent to-accent-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon */}
                <div className="relative mb-5 md:mb-6 flex justify-center">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${statGradients[index % statGradients.length]} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" strokeWidth={2} />
                  </div>
                </div>

                <div className="relative">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-surface-900 dark:text-white leading-none">
                    {stat.prefix}
                    <span>{stat.value}</span>
                    <span className="text-primary-500">{stat.suffix}</span>
                  </div>
                  <p className="mt-3 md:mt-4 text-sm md:text-base text-surface-500 dark:text-surface-400 font-semibold tracking-wide">
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
