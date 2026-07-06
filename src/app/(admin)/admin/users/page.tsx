"use client";

import { useState } from "react";
import { Search, Plus, Download, Filter, MoreHorizontal, Shield, Mail, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MOCK_USERS = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", status: "active", joined: "2025-01-01", lastLogin: "2 hours ago" },
  { id: "2", name: "Sarah Miller", email: "sarah@example.com", role: "user", status: "active", joined: "2025-01-05", lastLogin: "1 day ago" },
  { id: "3", name: "Michael Chen", email: "michael@example.com", role: "editor", status: "active", joined: "2025-01-10", lastLogin: "3 hours ago" },
  { id: "4", name: "Emma Wilson", email: "emma@example.com", role: "user", status: "inactive", joined: "2025-01-12", lastLogin: "1 week ago" },
  { id: "5", name: "James Park", email: "james@example.com", role: "api_user", status: "active", joined: "2025-01-15", lastLogin: "5 min ago" },
  { id: "6", name: "Lisa Anderson", email: "lisa@example.com", role: "user", status: "active", joined: "2025-01-18", lastLogin: "12 hours ago" },
];

const roleColors: Record<string, string> = {
  admin: "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300",
  editor: "bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-300",
  user: "bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300",
  api_user: "bg-secondary-50 text-secondary-700 dark:bg-secondary-950/50 dark:text-secondary-300",
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-medium hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"><Filter className="h-4 w-4" />Filter</button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-medium hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"><Download className="h-4 w-4" />Export</button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"><Plus className="h-4 w-4" />Add User</button>
        </div>
      </div>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">User</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">Joined</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase">Last Login</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-surface-500 uppercase w-16"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-surface-100 dark:border-surface-800/50 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs font-bold">{user.name.charAt(0)}</div>
                      <div><p className="font-semibold text-surface-900 dark:text-white">{user.name}</p><p className="text-xs text-surface-500 flex items-center gap-1"><Mail className="h-3 w-3" />{user.email}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold capitalize", roleColors[user.role])}><Shield className="h-3 w-3 inline mr-1" />{user.role.replace("_", " ")}</span></td>
                  <td className="px-5 py-4"><span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", user.status === "active" ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400")}>{user.status}</span></td>
                  <td className="px-5 py-4 text-surface-600 dark:text-surface-400 text-xs flex items-center gap-1"><Calendar className="h-3 w-3" />{user.joined}</td>
                  <td className="px-5 py-4 text-surface-500 text-xs">{user.lastLogin}</td>
                  <td className="px-5 py-4 text-center"><button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"><MoreHorizontal className="h-4 w-4 text-surface-500" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-surface-200 dark:border-surface-800">
          <span className="text-xs text-surface-500">Showing {filtered.length} of {MOCK_USERS.length} users</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-600 text-white">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600">2</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600">3</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
