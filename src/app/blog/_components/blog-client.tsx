"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, User, Tag } from "lucide-react";
import { BLOG_POSTS_FULL, BLOG_CATEGORIES, type BlogCategory } from "../_lib/blog-data";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BlogClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<BlogCategory | "all">("all");

  const filtered = BLOG_POSTS_FULL
    .filter((p) => category === "all" || p.category === category)
    .filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        {/* Main */}
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" aria-label="Search blog posts" />
          </div>

          {/* Posts */}
          <div className="space-y-5">
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                <Link href={`/blog/${post.slug}`}>
                  <Card hover padding="lg" className="flex flex-col sm:flex-row gap-5">
                    <div className="sm:w-40 h-28 sm:h-auto rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/30 dark:to-accent-950/30 flex items-center justify-center flex-shrink-0">
                      <Tag className="h-8 w-8 text-primary-400/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant="primary" size="sm" className="mb-2 capitalize">{post.category.replace("-", " ")}</Badge>
                      <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-1 line-clamp-2">{post.title}</h2>
                      <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-surface-500">
                        <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                        <span>{post.publishedAt}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
            {filtered.length === 0 && <p className="text-center py-12 text-surface-500">No articles found matching your search.</p>}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card padding="lg">
            <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-3">Categories</h3>
            <div className="space-y-1">
              <button onClick={() => setCategory("all")} className={cn("w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors", category === "all" ? "bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")} aria-pressed={category === "all"}>
                All Posts <span className="float-right text-xs text-surface-400">{BLOG_POSTS_FULL.length}</span>
              </button>
              {BLOG_CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setCategory(cat.id)} className={cn("w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize", category === cat.id ? "bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")} aria-pressed={category === cat.id}>
                  {cat.label} <span className="float-right text-xs text-surface-400">{cat.count}</span>
                </button>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </Container>
  );
}
