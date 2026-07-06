"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, BarChart3, ScanBarcode, FileText, Settings,
  Mail, Database, Shield, Globe, Menu, X, Sun, Moon,
} from "lucide-react";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Templates", href: "/admin/templates", icon: ScanBarcode },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "SEO", href: "/admin/seo", icon: Globe },
  { label: "Security", href: "/admin/security", icon: Shield },
  { label: "Backup", href: "/admin/backup", icon: Database },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { isDark, toggleTheme, mounted } = useThemeToggle();

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 transform transition-transform lg:transform-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center gap-2 h-16 px-6 border-b border-surface-200 dark:border-surface-800">
          <ScanBarcode className="h-6 w-6 text-primary-600" />
          <span className="font-bold text-lg text-surface-900 dark:text-white">Admin</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"><X className="h-5 w-5" /></button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors", active ? "bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")}>
                <Icon className="h-4 w-4" />{item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"><Menu className="h-5 w-5" /></button>
          <h1 className="text-lg font-bold text-surface-900 dark:text-white capitalize">{pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}</h1>
          <div className="ml-auto flex items-center gap-2">
            {mounted && (
              <button onClick={toggleTheme} className="p-2 rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800 transition-colors" aria-label="Toggle theme">
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
