"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// Testimonials - Premium Card Carousel
// ======================

export function TestimonialsSection() {
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <SectionHeader
          badge="Testimonials"
          title="Loved by Thousands"
          subtitle="See what developers and businesses say about BarcodeGen."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 rounded-2xl bg-white dark:bg-surface-900/80 border border-surface-200/70 dark:border-surface-700/50 hover-lift"
            >
              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-5">
                <Quote className="absolute -top-1 -left-1 h-5 w-5 text-primary-200 dark:text-primary-900" aria-hidden="true" />
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed pl-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
