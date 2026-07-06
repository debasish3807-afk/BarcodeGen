"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://barcodegen.com" },
      ...breadcrumbs.map((b, i) => ({
        "@type": "ListItem", position: i + 2, name: b.label, item: `https://barcodegen.com${b.href}`,
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <nav aria-label="Breadcrumb" className="py-3 border-b border-surface-100 dark:border-surface-800">
        <Container>
          <ol className="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400 flex-wrap">
            <li><Link href="/" className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"><Home className="h-3.5 w-3.5" /></Link></li>
            {breadcrumbs.map((b) => (
              <li key={b.href} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 text-surface-300" />
                {b.isLast ? (
                  <span className="font-medium text-surface-700 dark:text-surface-300">{b.label}</span>
                ) : (
                  <Link href={b.href} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{b.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </nav>
    </>
  );
}
