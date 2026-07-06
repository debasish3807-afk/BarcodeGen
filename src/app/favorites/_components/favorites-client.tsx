"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, Trash2, Copy, Edit3, Download, Upload, ScanBarcode, QrCode } from "lucide-react";
import { getFavorites, removeFavorite, renameFavorite, duplicateFavorite, exportFavorites, importFavorites, type FavoriteItem } from "../_lib/favorites-storage";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SortBy = "name" | "date" | "type";

export function FavoritesClient() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setFavorites(getFavorites()); }, []);

  const refresh = () => setFavorites(getFavorites());

  const handleRemove = (id: string) => { removeFavorite(id); refresh(); };
  const handleDuplicate = (id: string) => { duplicateFavorite(id); refresh(); };
  const handleStartRename = (item: FavoriteItem) => { setEditingId(item.id); setEditName(item.name); };
  const handleSaveRename = () => { if (editingId && editName.trim()) { renameFavorite(editingId, editName.trim()); refresh(); } setEditingId(null); };

  const handleExport = () => {
    const json = exportFavorites();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "barcodegen-favorites.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { importFavorites(reader.result as string); refresh(); };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleLoad = (item: FavoriteItem) => {
    localStorage.setItem("barcodegen_template_load", JSON.stringify(item.config));
    const path = item.type === "barcode" ? "/barcode-generator" : "/qr-generator";
    window.open(path, "_self");
  };

  const sorted = [...favorites]
    .filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "type") return a.type.localeCompare(b.type);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <Container>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search favorites..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" aria-label="Search favorites" />
        </div>
        <div className="flex gap-2">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)} className="px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm" aria-label="Sort by">
            <option value="date">Recent</option><option value="name">Name</option><option value="type">Type</option>
          </select>
          <button onClick={handleExport} disabled={favorites.length === 0} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-medium hover:bg-surface-50 dark:hover:bg-surface-800 disabled:opacity-50 transition-colors" aria-label="Export favorites">
            <Download className="h-3.5 w-3.5" />Export
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" id="import-fav" />
          <label htmlFor="import-fav" className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-medium hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors">
            <Upload className="h-3.5 w-3.5" />Import
          </label>
        </div>
      </div>

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {sorted.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <Card padding="md" hover className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", item.type === "barcode" ? "bg-primary-50 dark:bg-primary-950/50" : "bg-accent-50 dark:bg-accent-950/50")}>
                      {item.type === "barcode" ? <ScanBarcode className="h-5 w-5 text-primary-600 dark:text-primary-400" /> : <QrCode className="h-5 w-5 text-accent-600 dark:text-accent-400" />}
                    </div>
                    <span className="text-[10px] text-surface-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  {editingId === item.id ? (
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} onBlur={handleSaveRename} onKeyDown={(e) => e.key === "Enter" && handleSaveRename()} className="w-full px-2 py-1 text-sm font-semibold rounded border border-primary-500 focus:outline-none mb-2" autoFocus />
                  ) : (
                    <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-1 truncate">{item.name}</h4>
                  )}
                  <p className="text-xs text-surface-500 dark:text-surface-400 capitalize">{item.type}</p>
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-surface-100 dark:border-surface-800">
                    <button onClick={() => handleLoad(item)} className="flex-1 px-2 py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 rounded-lg hover:bg-primary-100 transition-colors">Load</button>
                    <button onClick={() => handleStartRename(item)} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors" aria-label="Rename"><Edit3 className="h-3.5 w-3.5 text-surface-500" /></button>
                    <button onClick={() => handleDuplicate(item.id)} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors" aria-label="Duplicate"><Copy className="h-3.5 w-3.5 text-surface-500" /></button>
                    <button onClick={() => handleRemove(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors" aria-label="Remove"><Trash2 className="h-3.5 w-3.5 text-red-500" /></button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 mx-auto text-surface-300 dark:text-surface-600 mb-4" />
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">No Favorites Yet</h3>
          <p className="text-sm text-surface-500 dark:text-surface-400 max-w-sm mx-auto">Save your barcode and QR code configurations as favorites for quick access later.</p>
        </div>
      )}
    </Container>
  );
}
