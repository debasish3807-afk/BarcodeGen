"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ======================
// Blog Section
// ======================

export function BlogSection() {
  return (
    <Section variant="default" spacing="lg">
      <Container>
        <SectionHeader
          badge="Blog"
          title="Latest Articles"
          subtitle="Stay updated with barcode industry news, guides, and best practices."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card hover padding="none" className="h-full flex flex-col overflow-hidden">
                  {/* Placeholder Image */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 flex items-center justify-center">
                    <Tag className="h-10 w-10 text-primary-400/60" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <Badge variant="primary" size="sm" className="w-fit mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-surface-100 dark:border-surface-800 text-xs text-surface-500 dark:text-surface-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog">
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Articles
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
