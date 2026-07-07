"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { TESTIMONIALS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// Testimonials - Glass Cards with Verified Badges
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
              className="relative p-6 rounded-2xl bg-white/70 dark:bg-surface-900/80 backdrop-blur-xl border border-surface-200/70 dark:border-surface-700/50 hover-lift"
            >
              {/* Star Rating in amber */}
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

              {/* Author with gradient avatar ring and verified badge */}
              <div className="flex items-center gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
                <div className="relative">
                  {/* Gradient ring */}
                  <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                      {testimonial.name}
                    </p>
                    {/* Verified badge */}
                    <BadgeCheck className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
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
