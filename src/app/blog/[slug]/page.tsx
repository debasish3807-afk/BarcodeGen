import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, User, Share2, Tag } from "lucide-react";
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

  return (
    <Section variant="default" spacing="lg" className="pt-28">
      <Container size="sm">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:underline mb-8"><ArrowLeft className="h-4 w-4" />Back to Blog</Link>
        <article>
          <header className="mb-8">
            <Badge variant="primary" size="md" className="mb-3 capitalize">{post.category.replace("-", " ")}</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4 text-balance">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
              <span>{post.publishedAt}</span>
            </div>
            {/* Share buttons */}
            <div className="flex gap-2 mt-4">
              {["Twitter", "LinkedIn", "Facebook"].map((p) => (
                <button key={p} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors" aria-label={`Share on ${p}`}><Share2 className="h-3 w-3 inline mr-1" />{p}</button>
              ))}
            </div>
          </header>
          {/* Content */}
          <div className="prose prose-surface dark:prose-invert max-w-none">
            {post.content.split("\n\n").map((p, i) => (<p key={i} className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4">{p}</p>))}
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-surface-200 dark:border-surface-800">
            {post.tags.map((tag) => (<span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-surface-100 dark:bg-surface-800 text-xs text-surface-600 dark:text-surface-400 rounded-lg"><Tag className="h-3 w-3" />{tag}</span>))}
          </div>
        </article>
        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-800">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`}><Card hover padding="md"><Badge variant="primary" size="sm" className="mb-2 capitalize">{r.category.replace("-", " ")}</Badge><h3 className="text-sm font-bold text-surface-900 dark:text-white">{r.title}</h3><p className="text-xs text-surface-500 mt-1">{r.readTime} • {r.publishedAt}</p></Card></Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
