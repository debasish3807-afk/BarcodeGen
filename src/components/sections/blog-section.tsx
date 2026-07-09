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
// Blog Section (i18n)
// ======================

const cardGradients = [
  "from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30",
  "from-secondary-50 to-accent-50 dark:from-secondary-950/30 dark:to-accent-950/30",
  "from-accent-50 to-primary-50 dark:from-accent-950/30 dark:to-primary-950/30",
];

export function BlogSection() {
  const { t } = useTranslation();

  return (
    <Section variant="muted" spacing="xl">
      <Container size="xl">
        <SectionHeader badge={t.blog.badge} title={t.blog.title} subtitle={t.blog.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {BLOG_POSTS.map((post, index) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-surface-900/60 border border-surface-200/60 dark:border-surface-700/30 hover:border-primary-200 dark:hover:border-primary-800/50 hover:shadow-xl hover:shadow-primary-500/[0.05] hover:-translate-y-1 transition-all duration-300">
                  <div className={`aspect-[16/9] bg-gradient-to-br ${cardGradients[index % cardGradients.length]} flex items-center justify-center relative overflow-hidden`}>
                    <Tag className="h-10 w-10 text-primary-300/60 dark:text-primary-700/60" />
                    <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors duration-300" />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <span className="inline-flex w-fit px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/50 rounded-full mb-3">{post.category}</span>
                    <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{post.title}</h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100 dark:border-surface-800">
                      <div className="flex items-center gap-3 text-xs text-surface-400 dark:text-surface-500">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                        <span>{post.publishedAt}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <Link href="/blog">
            <Button variant="outline" className="rounded-full px-6" rightIcon={<ArrowRight className="h-4 w-4" />}>
              {t.blog.viewAll}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
