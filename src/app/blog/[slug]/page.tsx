import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Eye, Tag, ExternalLink, ScanBarcode, BookOpen } from "lucide-react";
import { BLOG_POSTS_FULL, getBlogPostBySlug, getRelatedPosts } from "../_lib/blog-data";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  return { title: post?.title || "Blog Post", description: post?.excerpt || "" };
}

export async function generateStaticParams() {
  return BLOG_POSTS_FULL.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return <Section variant="default" spacing="lg" className="pt-28"><Container size="sm"><h1 className="text-2xl font-bold">Post Not Found</h1></Container></Section>;

  const related = getRelatedPosts(post);
  const postIndex = BLOG_POSTS_FULL.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? BLOG_POSTS_FULL[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS_FULL.length - 1 ? BLOG_POSTS_FULL[postIndex + 1] : null;
  const paragraphs = post.content.split("\n\n");

  return (
    <div className="min-h-screen pt-20">
      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950/20 dark:via-surface-950 dark:to-accent-950/10 border-b border-surface-200/60 dark:border-surface-800/60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <Container className="relative z-10 py-12 md:py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:underline mb-6 font-medium">
            <ArrowLeft className="h-4 w-4" />Back to Blog
          </Link>
          <Badge variant="primary" size="md" className="mb-4 capitalize">{post.category.replace("-", " ")}</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-tight text-balance max-w-3xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl">{post.excerpt}</p>
          {/* Author + Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-surface-500 dark:text-surface-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-xs font-bold">{post.author.charAt(0)}</div>
              <span className="font-medium text-surface-700 dark:text-surface-300">{post.author}</span>
            </div>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.publishedAt}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
            <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />2.4K views</span>
          </div>
        </Container>
      </div>

      {/* ===== CONTENT + SIDEBAR ===== */}
      <Container className="py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-14">
          {/* Main Article */}
          <article className="min-w-0">
            {/* Social Share */}
            <div className="flex items-center gap-2 mb-8 pb-6 border-b border-surface-200/60 dark:border-surface-800/60">
              <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider mr-2">Share</span>
              {[
                { label: "Twitter" },
                { label: "LinkedIn" },
                { label: "Facebook" },
                { label: "Email" },
              ].map(({ label }) => (
                <button key={label} className="w-9 h-9 flex items-center justify-center rounded-xl border border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-800 transition-all hover:scale-105" aria-label={`Share on ${label}`}>
                  <ExternalLink className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Article Content */}
            <div className="prose-custom">
              {paragraphs.map((p, i) => (
                <p key={i} className={`text-[17px] leading-[1.85] text-surface-600 dark:text-surface-400 mb-6 ${i === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:text-primary-600 dark:first-letter:text-primary-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1" : ""}`}>
                  {p}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-surface-200/60 dark:border-surface-800/60">
              <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider mr-2 self-center">Tags</span>
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-surface-100 dark:bg-surface-800 text-xs font-medium text-surface-600 dark:text-surface-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                  <Tag className="h-3 w-3" />{tag}
                </span>
              ))}
            </div>

            {/* Prev / Next Navigation */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-surface-200/60 dark:border-surface-800/60">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group p-5 rounded-2xl border border-surface-200 dark:border-surface-800 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/30 dark:hover:bg-primary-950/20 transition-all">
                  <span className="text-xs text-surface-500 flex items-center gap-1 mb-1"><ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />Previous</span>
                  <span className="text-sm font-semibold text-surface-900 dark:text-white line-clamp-2">{prevPost.title}</span>
                </Link>
              ) : <div />}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group p-5 rounded-2xl border border-surface-200 dark:border-surface-800 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/30 dark:hover:bg-primary-950/20 transition-all text-right">
                  <span className="text-xs text-surface-500 flex items-center gap-1 justify-end mb-1">Next<ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /></span>
                  <span className="text-sm font-semibold text-surface-900 dark:text-white line-clamp-2">{nextPost.title}</span>
                </Link>
              )}
            </div>
          </article>

          {/* ===== RIGHT SIDEBAR ===== */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Generate CTA */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 text-white">
                <ScanBarcode className="h-6 w-6 mb-3 opacity-80" />
                <h4 className="text-sm font-bold mb-1">Generate Barcodes</h4>
                <p className="text-xs text-white/70 mb-3">Create professional barcodes in 30+ formats — free.</p>
                <Link href="/barcode-generator" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-xl transition-colors">
                  Try Generator <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Author Card */}
              <Card padding="lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm">{post.author.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-bold text-surface-900 dark:text-white">{post.author}</p>
                    <p className="text-xs text-surface-500">Barcode Expert</p>
                  </div>
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">Expert in barcode standards, supply chain technology, and enterprise solutions.</p>
              </Card>

              {/* Related Articles */}
              {related.length > 0 && (
                <Card padding="lg">
                  <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary-600 dark:text-primary-400" />Related
                  </h4>
                  <div className="space-y-3">
                    {related.slice(0, 3).map((r) => (
                      <Link key={r.id} href={`/blog/${r.slug}`} className="block group">
                        <p className="text-sm font-medium text-surface-700 dark:text-surface-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">{r.title}</p>
                        <p className="text-xs text-surface-400 mt-0.5">{r.readTime} • {r.category}</p>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}

              {/* Newsletter */}
              <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200/60 dark:border-surface-700/40">
                <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-1">Stay Updated</h4>
                <p className="text-xs text-surface-500 dark:text-surface-400 mb-3">Get barcode tips and industry news weekly.</p>
                <form className="flex gap-2" action="#">
                  <input type="email" placeholder="you@email.com" className="flex-1 px-3 py-2 text-xs rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20" aria-label="Email for newsletter" />
                  <button type="button" className="px-3 py-2 bg-primary-600 text-white text-xs font-semibold rounded-lg hover:bg-primary-700 transition-colors">Subscribe</button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
