// ======================
// Batch Exporter - ZIP downloads
// ======================

import type { BatchItem, BatchConfig, ExportFormat } from "../_types";

/**
 * Export batch items to ZIP archive
 */
export async function exportBatchToZip(
  items: BatchItem[],
  config: BatchConfig,
  format: ExportFormat
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const { saveAs } = await import("file-saver");

  const successItems = items.filter((item) => item.status === "success" && item.preview);
  if (successItems.length === 0) return;

  const zip = new JSZip();
  const folderName = `barcodegen-batch-${config.mode}`;
  const folder = zip.folder(folderName);
  if (!folder) return;

  for (let i = 0; i < successItems.length; i++) {
    const item = successItems[i];
    const baseName = `${config.mode}-${String(i + 1).padStart(4, "0")}-${sanitizeFilename(item.inputData)}`;

    switch (format) {
      case "png-zip": {
        const pngData = item.preview!;
        if (pngData.startsWith("data:image/png")) {
          const base64 = pngData.split(",")[1];
          folder.file(`${baseName}.png`, base64, { base64: true });
        }
        break;
      }
      case "svg-zip": {
        // Render SVG from preview or re-render
        const svgContent = await getSVGForItem(item, config);
        if (svgContent) {
          folder.file(`${baseName}.svg`, svgContent);
        }
        break;
      }
      case "jpg-zip": {
        const jpgData = await convertToJPG(item.preview!);
        if (jpgData) {
          const base64 = jpgData.split(",")[1];
          folder.file(`${baseName}.jpg`, base64, { base64: true });
        }
        break;
      }
      case "webp-zip": {
        const webpData = await convertToWebP(item.preview!);
        if (webpData) {
          const base64 = webpData.split(",")[1];
          folder.file(`${baseName}.webp`, base64, { base64: true });
        }
        break;
      }
      case "pdf": {
        // PDF handled separately
        break;
      }
    }
  }

  if (format === "pdf") {
    await exportBatchToPDF(successItems, config);
    return;
  }

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${folderName}-${format.replace("-zip", "")}.zip`);
}

/**
 * Export batch to single PDF
 */
async function exportBatchToPDF(items: BatchItem[], config: BatchConfig): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const { saveAs } = await import("file-saver");

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;

  // Title
  pdf.setFontSize(16);
  pdf.text(`BarcodeGen Batch Export - ${config.mode.toUpperCase()}`, margin, y);
  y += 10;
  pdf.setFontSize(10);
  pdf.text(`Format: ${config.format} | Items: ${items.length} | Generated: ${new Date().toLocaleDateString()}`, margin, y);
  y += 15;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.preview) continue;

    // Check if need new page
    const imgHeight = config.mode === "barcode" ? 25 : 40;
    if (y + imgHeight + 10 > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      y = margin;
    }

    // Add label
    pdf.setFontSize(8);
    pdf.text(`#${item.rowNumber}: ${item.inputData}`, margin, y);
    y += 4;

    // Add image
    try {
      const imgWidth = config.mode === "barcode" ? pageWidth - margin * 2 : 35;
      pdf.addImage(item.preview, "PNG", margin, y, imgWidth, imgHeight);
      y += imgHeight + 8;
    } catch {
      y += 5;
    }
  }

  const blob = pdf.output("blob");
  saveAs(blob, `barcodegen-batch-${config.mode}.pdf`);
}

/**
 * Get SVG content for a batch item
 */
async function getSVGForItem(item: BatchItem, config: BatchConfig): Promise<string | null> {
  try {
    const { renderBarcodeSVG, renderQRSVG } = await import("./batch-renderer");
    if (config.mode === "barcode") {
      return await renderBarcodeSVG(item.inputData, config.format, config.barcodeWidth, config.barcodeHeight);
    } else {
      return await renderQRSVG(item.inputData, config.qrSize, config.qrErrorCorrection);
    }
  } catch {
    return null;
  }
}

/**
 * Convert PNG data URL to JPG
 */
function convertToJPG(pngDataUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      } else {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = pngDataUrl;
  });
}

/**
 * Convert PNG data URL to WebP
 */
function convertToWebP(pngDataUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/webp", 0.92));
      } else {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = pngDataUrl;
  });
}

/**
 * Sanitize filename
 */
function sanitizeFilename(str: string): string {
  return str.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 30);
}
