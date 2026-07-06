"use client";

import { motion } from "framer-motion";
import { STATS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// Stats Section - Premium Animated Cards
// ======================

export function StatsSection() {
  return (
    <Section variant="default" spacing="md">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 md:p-8 rounded-2xl bg-surface-50/80 dark:bg-surface-800/40 border border-surface-200/60 dark:border-surface-700/40 hover:border-primary-200 dark:hover:border-primary-800/60 transition-all duration-300 text-center"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/[0.03] to-accent-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-surface-900 dark:text-white">
                  {stat.prefix}
                  <span>{stat.value}</span>
                  <span className="text-primary-500">{stat.suffix}</span>
                </div>
                <p className="mt-2 text-sm text-surface-500 dark:text-surface-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
