// ======================
// Favorites Local Storage
// ======================

export interface FavoriteItem {
  id: string;
  name: string;
  type: "barcode" | "qr";
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "barcodegen_favorites";

export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

export function saveFavorites(items: FavoriteItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addFavorite(item: Omit<FavoriteItem, "id" | "createdAt" | "updatedAt">): FavoriteItem {
  const favorites = getFavorites();
  const newItem: FavoriteItem = {
    ...item,
    id: `fav_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  favorites.unshift(newItem);
  saveFavorites(favorites);
  return newItem;
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter((f) => f.id !== id);
  saveFavorites(favorites);
}

export function renameFavorite(id: string, name: string): void {
  const favorites = getFavorites().map((f) =>
    f.id === id ? { ...f, name, updatedAt: new Date().toISOString() } : f
  );
  saveFavorites(favorites);
}

export function duplicateFavorite(id: string): FavoriteItem | null {
  const favorites = getFavorites();
  const original = favorites.find((f) => f.id === id);
  if (!original) return null;
  const dup: FavoriteItem = {
    ...original,
    id: `fav_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    name: `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  favorites.unshift(dup);
  saveFavorites(favorites);
  return dup;
}

export function exportFavorites(): string {
  return JSON.stringify(getFavorites(), null, 2);
}

export function importFavorites(json: string): number {
  try {
    const imported: FavoriteItem[] = JSON.parse(json);
    if (!Array.isArray(imported)) throw new Error("Invalid");
    const existing = getFavorites();
    const merged = [...imported.map((i) => ({ ...i, id: `fav_${Date.now()}_${Math.random().toString(36).substring(7)}` })), ...existing];
    saveFavorites(merged);
    return imported.length;
  } catch { return 0; }
}
