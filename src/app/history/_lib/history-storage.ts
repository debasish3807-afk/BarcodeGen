// ======================
// History Local Storage
// ======================

export interface HistoryItem {
  id: string;
  type: "barcode" | "qr";
  format: string;
  value: string;
  preview: string | null;
  createdAt: string;
}

const STORAGE_KEY = "barcodegen_history";
const MAX_ITEMS = 200;

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

export function saveHistory(items: HistoryItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
}

export function addToHistory(item: Omit<HistoryItem, "id" | "createdAt">): void {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: `hist_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    createdAt: new Date().toISOString(),
  };
  history.unshift(newItem);
  saveHistory(history);
}

export function removeFromHistory(id: string): void {
  const history = getHistory().filter((h) => h.id !== id);
  saveHistory(history);
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function exportHistory(): string {
  return JSON.stringify(getHistory(), null, 2);
}
