"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, User, Tag, ArrowRight, BookOpen, ScanBarcode, TrendingUp } from "lucide-react";
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
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
        {/* Main */}
        <div className="space-y-6">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-surface-200/80 dark:border-surface-700/60 bg-white dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all" aria-label="Search blog posts" />
          </div>

          {/* Featured Post (first) */}
          {!search && category === "all" && filtered.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Link href={`/blog/${filtered[0].slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 p-6 sm:p-8 text-white group hover:shadow-xl hover:shadow-primary-600/10 transition-all">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-xl" />
                  <Badge variant="primary" size="sm" className="mb-3 bg-white/20 text-white border-white/20 capitalize">{filtered[0].category.replace("-", " ")}</Badge>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:underline decoration-white/30 underline-offset-4 transition-all">{filtered[0].title}</h2>
                  <p className="text-sm text-white/70 mb-4 line-clamp-2">{filtered[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{filtered[0].author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{filtered[0].readTime}</span>
                    <span className="flex items-center gap-1 ml-auto"><ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />Read</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Posts Grid */}
          <div className="space-y-4">
            {filtered.slice(category === "all" && !search ? 1 : 0).map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-surface-200/70 dark:border-surface-700/50 bg-white dark:bg-surface-900/60 hover:border-primary-200 dark:hover:border-primary-800/60 hover:shadow-md transition-all">
                    {/* Thumbnail */}
                    <div className="sm:w-36 h-24 sm:h-auto rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/30 dark:to-accent-950/30 flex items-center justify-center flex-shrink-0 group-hover:scale-[1.02] transition-transform">
                      <Tag className="h-7 w-7 text-primary-400/60" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <Badge variant="primary" size="sm" className="mb-2 capitalize">{post.category.replace("-", " ")}</Badge>
                      <h2 className="text-base font-bold text-surface-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{post.title}</h2>
                      <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-surface-400">
                        <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                        <span>{post.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Search className="h-10 w-10 mx-auto text-surface-300 dark:text-surface-600 mb-3" />
                <p className="text-surface-500">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Categories */}
            <Card padding="lg">
              <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary-600 dark:text-primary-400" />Categories
              </h3>
              <div className="space-y-1">
                <button onClick={() => setCategory("all")} className={cn("w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all", category === "all" ? "bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 shadow-sm" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")} aria-pressed={category === "all"}>
                  All Posts <span className="float-right text-xs text-surface-400">{BLOG_POSTS_FULL.length}</span>
                </button>
                {BLOG_CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setCategory(cat.id)} className={cn("w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all capitalize", category === cat.id ? "bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 shadow-sm" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")} aria-pressed={category === cat.id}>
                    {cat.label} <span className="float-right text-xs text-surface-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Trending */}
            <Card padding="lg">
              <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent-600 dark:text-accent-400" />Trending
              </h3>
              <div className="space-y-3">
                {BLOG_POSTS_FULL.slice(0, 4).map((p, i) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group flex items-start gap-3">
                    <span className="text-lg font-bold text-surface-200 dark:text-surface-700 group-hover:text-primary-400 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-sm font-medium text-surface-700 dark:text-surface-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">{p.title}</p>
                      <p className="text-xs text-surface-400 mt-0.5">{p.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* CTA */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 text-white">
              <ScanBarcode className="h-6 w-6 mb-3 opacity-80" />
              <h4 className="text-sm font-bold mb-1">Generate Barcodes</h4>
              <p className="text-xs text-white/70 mb-3">Create barcodes in 30+ formats — free.</p>
              <Link href="/barcode-generator" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-xl transition-colors">
                Try Generator <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Newsletter */}
            <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200/60 dark:border-surface-700/40">
              <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-1">Newsletter</h4>
              <p className="text-xs text-surface-500 dark:text-surface-400 mb-3">Get weekly barcode tips and updates.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="you@email.com" className="flex-1 px-3 py-2 text-xs rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20" aria-label="Email for newsletter" />
                <button type="button" className="px-3 py-2 bg-primary-600 text-white text-xs font-semibold rounded-lg hover:bg-primary-700 transition-colors">Join</button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
