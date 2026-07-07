"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, ScanBarcode, QrCode, Heart, Clock, LogOut, Settings, Layers, Download, Activity } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardStats {
  totalBarcodes: number;
  totalQRCodes: number;
  totalDownloads: number;
  totalFavorites: number;
}

export function DashboardClient() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBarcodes: 0,
    totalQRCodes: 0,
    totalDownloads: 0,
    totalFavorites: 0,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in?next=/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const history = JSON.parse(localStorage.getItem("barcodegen_history") || "[]");
      const favorites = JSON.parse(localStorage.getItem("barcodegen_favorites") || "[]");
      setStats({
        totalBarcodes: history.filter((h: { type: string }) => h.type === "barcode").length,
        totalQRCodes: history.filter((h: { type: string }) => h.type === "qr").length,
        totalDownloads: history.length,
        totalFavorites: favorites.length,
      });
    } catch { /* silent */ }
  }, []);

  if (isLoading || !user) {
    return (
      <Container>
        <div className="py-20 text-center text-surface-500">Loading...</div>
      </Container>
    );
  }

  const statCards = [
    { label: "Barcodes", value: stats.totalBarcodes, icon: ScanBarcode, color: "text-primary-600 dark:text-primary-400", bg: "bg-primary-50 dark:bg-primary-950/40" },
    { label: "QR Codes", value: stats.totalQRCodes, icon: QrCode, color: "text-accent-600 dark:text-accent-400", bg: "bg-accent-50 dark:bg-accent-950/40" },
    { label: "Downloads", value: stats.totalDownloads, icon: Download, color: "text-secondary-600 dark:text-secondary-400", bg: "bg-secondary-50 dark:bg-secondary-950/40" },
    { label: "Favorites", value: stats.totalFavorites, icon: Heart, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40" },
  ];

  const quickLinks = [
    { label: "History", href: "/history", icon: Clock, description: "View recently generated" },
    { label: "Favorites", href: "/favorites", icon: Heart, description: "Saved configurations" },
    { label: "Templates", href: "/templates", icon: Layers, description: "Professional presets" },
    { label: "API Console", href: "/developer", icon: Activity, description: "Manage API keys" },
    { label: "Settings", href: "/dashboard/settings", icon: Settings, description: "Account preferences" },
  ];

  return (
    <Container>
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Welcome back, {user.name}</h1>
            <p className="text-sm text-surface-500 dark:text-surface-400">{user.email}</p>
          </div>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-semibold text-surface-600 dark:text-surface-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 hover:border-red-200 dark:hover:border-red-800 transition-all">
          <LogOut className="h-4 w-4" />Sign Out
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card padding="lg">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", s.bg)}>
                  <Icon className={cn("h-5 w-5", s.color)} />
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white tabular-nums">{s.value}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{s.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Links + Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary-600" />Quick Access
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.label} href={link.href} className="group p-3 rounded-xl border border-surface-200 dark:border-surface-700 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all">
                  <Icon className="h-4 w-4 text-primary-600 dark:text-primary-400 mb-2" />
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">{link.label}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 line-clamp-1">{link.description}</p>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-accent-600" />Account Info
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-surface-100 dark:border-surface-800">
              <span className="text-surface-500 dark:text-surface-400">Email</span>
              <span className="font-medium text-surface-900 dark:text-white">{user.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-surface-100 dark:border-surface-800">
              <span className="text-surface-500 dark:text-surface-400">Member since</span>
              <span className="font-medium text-surface-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-surface-100 dark:border-surface-800">
              <span className="text-surface-500 dark:text-surface-400">Last sign in</span>
              <span className="font-medium text-surface-900 dark:text-white">{new Date(user.lastLoginAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-surface-500 dark:text-surface-400">Plan</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-bold">Free</span>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
