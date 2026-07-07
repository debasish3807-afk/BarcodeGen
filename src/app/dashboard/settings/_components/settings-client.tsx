"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Lock, Trash2, Shield, Bell, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { logout as clientLogout } from "@/lib/auth/client";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SettingsTab = "profile" | "password" | "notifications" | "danger";

export function SettingsClient() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [tab, setTab] = useState<SettingsTab>("profile");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/sign-in?next=/dashboard/settings");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  if (isLoading || !user) return <Container><div className="py-20 text-center text-surface-500">Loading...</div></Container>;

  const handleSaveProfile = () => {
    // In production: PATCH /api/v1/users/me
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("barcodegen_user") || "{}");
      stored.name = name;
      localStorage.setItem("barcodegen_user", JSON.stringify(stored));
    }
    setMessage({ type: "success", text: "Profile updated successfully." });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleChangePassword = () => {
    if (newPassword.length < 8) { setMessage({ type: "error", text: "Password must be at least 8 characters." }); return; }
    if (newPassword !== confirmPassword) { setMessage({ type: "error", text: "Passwords do not match." }); return; }
    // In production: POST /api/auth/change-password
    setMessage({ type: "success", text: "Password changed successfully." });
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== "DELETE") { setMessage({ type: "error", text: "Please type DELETE to confirm." }); return; }
    // In production: DELETE /api/v1/users/me
    clientLogout();
  };

  const tabs = [
    { id: "profile" as SettingsTab, label: "Profile", icon: User },
    { id: "password" as SettingsTab, label: "Password", icon: Lock },
    { id: "notifications" as SettingsTab, label: "Notifications", icon: Bell },
    { id: "danger" as SettingsTab, label: "Danger Zone", icon: Trash2 },
  ];

  return (
    <Container>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.push("/dashboard")} className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors" aria-label="Back to dashboard">
            <ArrowLeft className="h-5 w-5 text-surface-500" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Account Settings</h1>
            <p className="text-sm text-surface-500">{user.email}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar Tabs */}
          <nav className="space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all", tab === id ? "bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")} aria-pressed={tab === id}>
                <Icon className="h-4 w-4" />{label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="space-y-5">
            {/* Message */}
            {message && (
              <div className={cn("flex items-center gap-2 p-4 rounded-xl text-sm font-medium border", message.type === "success" ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400")} role="alert">
                {message.type === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                {message.text}
              </div>
            )}

            {/* Profile Tab */}
            {tab === "profile" && (
              <Card padding="lg">
                <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-5 flex items-center gap-2"><User className="h-5 w-5 text-primary-600" />Profile</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Display Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
                    <input type="email" value={user.email} disabled className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 text-sm text-surface-500 cursor-not-allowed" />
                    <p className="text-xs text-surface-400 mt-1">Email cannot be changed.</p>
                  </div>
                  <button onClick={handleSaveProfile} className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all">
                    Save Changes
                  </button>
                </div>
              </Card>
            )}

            {/* Password Tab */}
            {tab === "password" && (
              <Card padding="lg">
                <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-5 flex items-center gap-2"><Lock className="h-5 w-5 text-primary-600" />Change Password</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Current Password</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" autoComplete="current-password" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={8} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" autoComplete="new-password" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1.5">Confirm New Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" autoComplete="new-password" />
                  </div>
                  <button onClick={handleChangePassword} className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all">
                    Update Password
                  </button>
                </div>
              </Card>
            )}

            {/* Notifications Tab */}
            {tab === "notifications" && (
              <Card padding="lg">
                <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-5 flex items-center gap-2"><Bell className="h-5 w-5 text-primary-600" />Notifications</h2>
                <div className="space-y-4 max-w-md">
                  {["Product updates", "Security alerts", "Newsletter", "Marketing emails"].map((item) => (
                    <label key={item} className="flex items-center justify-between p-4 rounded-xl border border-surface-200 dark:border-surface-700">
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{item}</span>
                      <input type="checkbox" defaultChecked={item.includes("Security")} className="w-5 h-5 rounded border-surface-300 text-primary-600 focus:ring-primary-500/20" />
                    </label>
                  ))}
                </div>
              </Card>
            )}

            {/* Danger Zone */}
            {tab === "danger" && (
              <Card padding="lg" className="border-red-200 dark:border-red-900/50">
                <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2"><Shield className="h-5 w-5" />Danger Zone</h2>
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-5">Once you delete your account, there is no going back. All data will be permanently removed.</p>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-red-700 dark:text-red-400 mb-1.5">Type DELETE to confirm</label>
                    <input type="text" value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)} placeholder="DELETE" className="w-full px-4 py-3 rounded-xl border border-red-200 dark:border-red-800 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
                  </div>
                  <button onClick={handleDeleteAccount} disabled={deleteConfirm !== "DELETE"} className="px-6 py-3 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Delete My Account
                  </button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
