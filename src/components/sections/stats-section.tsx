"use client";

import { motion } from "framer-motion";
import { STATS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// Stats Section
// ======================

export function StatsSection() {
  return (
    <Section variant="muted" spacing="sm">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-surface-900 dark:text-white">
                {stat.prefix}
                {stat.value}
                <span className="text-primary-600">{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-surface-600 dark:text-surface-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
