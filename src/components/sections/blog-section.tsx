"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/constants/content";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";


// ======================
// Blog Section - Premium v5.0
// ======================

const cardGradients = [
  "from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30",
  "from-secondary-50 to-accent-50 dark:from-secondary-950/30 dark:to-accent-950/30",
  "from-accent-50 to-primary-50 dark:from-accent-950/30 dark:to-primary-950/30",
];

const cardIconColors = [
  "text-primary-400/60 dark:text-primary-600/40",
  "text-secondary-400/60 dark:text-secondary-600/40",
  "text-accent-400/60 dark:text-accent-600/40",
];

export function BlogSection() {
  const { t } = useTranslation();

  return (
    <Section variant="muted" spacing="xl" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-300/50 dark:via-surface-700/50 to-transparent" />
      <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] bg-secondary-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge={t.blog.badge}
          title={t.blog.title}
          subtitle={t.blog.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-surface-900/60 border border-surface-200/60 dark:border-surface-700/30 hover:border-primary-200/70 dark:hover:border-primary-800/50 hover:shadow-2xl hover:shadow-primary-500/[0.06] hover:-translate-y-2 transition-all duration-500">
                  {/* Thumbnail */}
                  <div className={`aspect-[16/9] bg-gradient-to-br ${cardGradients[index % cardGradients.length]} flex items-center justify-center relative overflow-hidden`}>
                    <Tag className={`h-12 w-12 ${cardIconColors[index % cardIconColors.length]}`} />
                    <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors duration-500" />
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 dot-pattern opacity-30" />
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <span className="inline-flex w-fit px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/50 rounded-lg border border-primary-200/40 dark:border-primary-800/30 mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2.5 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed flex-1 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-surface-100 dark:border-surface-800">
                      <div className="flex items-center gap-3 text-xs text-surface-400 dark:text-surface-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span>{post.publishedAt}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <Button
              variant="outline"
              className="rounded-2xl px-7 py-3 border-2 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/5"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {t.blog.viewAll}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
