"use client";

import { Search, Plus, Edit3, Trash2, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const BLOGS = [
  { id: "1", title: "Complete Guide to EAN-13", status: "published", views: 4521, date: "2025-01-15" },
  { id: "2", title: "QR Codes in Marketing", status: "published", views: 3892, date: "2025-01-10" },
  { id: "3", title: "Barcode vs QR Code", status: "published", views: 2945, date: "2025-01-05" },
  { id: "4", title: "Inventory Management", status: "draft", views: 0, date: "2025-01-20" },
  { id: "5", title: "WiFi QR Setup Guide", status: "published", views: 1823, date: "2024-12-01" },
];

export default function BlogManagerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input type="search" placeholder="Search posts..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"><Plus className="h-4 w-4" />New Post</button>
      </div>

      <Card padding="none" className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">Title</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">Views</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">Date</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-surface-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {BLOGS.map((blog) => (
              <tr key={blog.id} className="border-b border-surface-100 dark:border-surface-800/50 hover:bg-surface-50 dark:hover:bg-surface-800/30">
                <td className="px-5 py-4 font-medium text-surface-900 dark:text-white">{blog.title}</td>
                <td className="px-5 py-4"><span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", blog.status === "published" ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400" : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400")}>{blog.status}</span></td>
                <td className="px-5 py-4 text-surface-600 dark:text-surface-400 flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{blog.views.toLocaleString()}</td>
                <td className="px-5 py-4 text-surface-500 text-xs">{blog.date}</td>
                <td className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"><Edit3 className="h-4 w-4 text-surface-500" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"><Trash2 className="h-4 w-4 text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
