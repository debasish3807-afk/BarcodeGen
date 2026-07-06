// ======================
// File Parsers for Batch Input
// ======================

export interface ParsedRow {
  value: string;
  rowNumber: number;
}

/**
 * Parse CSV file content into rows
 */
export function parseCSV(content: string): ParsedRow[] {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const rows: ParsedRow[] = [];

  for (let i = 0; i < lines.length; i++) {
    // Take first column if comma-separated
    const cols = lines[i].split(",");
    const value = cols[0].trim().replace(/^["']|["']$/g, "");
    if (value.length > 0) {
      rows.push({ value, rowNumber: i + 1 });
    }
  }

  return rows;
}

/**
 * Parse TXT file content (one value per line)
 */
export function parseTXT(content: string): ParsedRow[] {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  return lines.map((line, i) => ({
    value: line.trim(),
    rowNumber: i + 1,
  }));
}

/**
 * Parse JSON file content (array of strings or objects with 'value' field)
 */
export function parseJSON(content: string): ParsedRow[] {
  try {
    const data = JSON.parse(content);
    if (!Array.isArray(data)) {
      throw new Error("JSON must be an array");
    }

    return data
      .map((item, i) => {
        const value = typeof item === "string" ? item : item?.value || item?.data || item?.code || "";
        return { value: String(value).trim(), rowNumber: i + 1 };
      })
      .filter((r) => r.value.length > 0);
  } catch {
    throw new Error("Invalid JSON format. Expected an array of strings or objects.");
  }
}

/**
 * Parse Excel file using xlsx library
 */
export async function parseExcel(file: File): Promise<ParsedRow[]> {
  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: unknown[][] = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

  const rows: ParsedRow[] = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row && row.length > 0) {
      const value = String(row[0]).trim();
      if (value.length > 0 && value !== "undefined") {
        rows.push({ value, rowNumber: i + 1 });
      }
    }
  }

  return rows;
}

/**
 * Parse manual text input (one value per line)
 */
export function parseManual(text: string): ParsedRow[] {
  return parseTXT(text);
}

/**
 * Detect file type and parse accordingly
 */
export async function parseFile(file: File): Promise<ParsedRow[]> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "xlsx" || ext === "xls") {
    return parseExcel(file);
  }

  const content = await file.text();

  switch (ext) {
    case "csv":
      return parseCSV(content);
    case "json":
      return parseJSON(content);
    case "txt":
    default:
      return parseTXT(content);
  }
}
