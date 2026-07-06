// ======================
// Batch Renderer - Generates barcodes/QR codes
// ======================

import type { BatchConfig } from "../_types";

/**
 * Render a single barcode to SVG string
 */
export async function renderBarcodeSVG(
  value: string,
  format: string,
  width: number,
  height: number
): Promise<string> {
  const JsBarcode = (await import("jsbarcode")).default;
  const svgNS = "http://www.w3.org/2000/svg";

  // Create a temporary SVG in memory
  if (typeof document === "undefined") return "";

  const svg = document.createElementNS(svgNS, "svg");
  document.body.appendChild(svg);

  try {
    JsBarcode(svg, value, {
      format,
      width,
      height,
      margin: 10,
      displayValue: true,
      fontSize: 14,
      font: "monospace",
    });

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
  } finally {
    document.body.removeChild(svg);
  }
}

/**
 * Render a single barcode to PNG data URL
 */
export async function renderBarcodePNG(
  value: string,
  format: string,
  width: number,
  height: number
): Promise<string> {
  const svgString = await renderBarcodeSVG(value, format, width, height);
  if (!svgString) return "";

  return new Promise((resolve) => {
    const img = new Image();
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth * 2;
      canvas.height = img.naturalHeight * 2;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve("");
    };
    img.src = url;
  });
}

/**
 * Render a QR code to PNG data URL
 */
export async function renderQRPNG(
  value: string,
  size: number,
  ecLevel: "L" | "M" | "Q" | "H"
): Promise<string> {
  const qrGen = (await import("qrcode-generator")).default;
  const qr = qrGen(0, ecLevel);
  qr.addData(value);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const cellSize = size / (moduleCount + 8); // padding
  const canvasSize = size;

  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = "#000000";
  const offset = (canvasSize - moduleCount * cellSize) / 2;
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillRect(offset + col * cellSize, offset + row * cellSize, cellSize, cellSize);
      }
    }
  }

  return canvas.toDataURL("image/png");
}

/**
 * Render a QR code to SVG string
 */
export async function renderQRSVG(
  value: string,
  size: number,
  ecLevel: "L" | "M" | "Q" | "H"
): Promise<string> {
  const qrGen = (await import("qrcode-generator")).default;
  const qr = qrGen(0, ecLevel);
  qr.addData(value);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const cellSize = size / (moduleCount + 8);
  const offset = (size - moduleCount * cellSize) / 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="#FFFFFF"/>`;

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.isDark(row, col)) {
        svg += `<rect x="${offset + col * cellSize}" y="${offset + row * cellSize}" width="${cellSize}" height="${cellSize}" fill="#000000"/>`;
      }
    }
  }

  svg += "</svg>";
  return svg;
}

/**
 * Render a batch item based on config
 */
export async function renderBatchItem(
  value: string,
  config: BatchConfig
): Promise<{ png: string; svg: string }> {
  if (config.mode === "barcode") {
    const svg = await renderBarcodeSVG(value, config.format, config.barcodeWidth, config.barcodeHeight);
    const png = await renderBarcodePNG(value, config.format, config.barcodeWidth, config.barcodeHeight);
    return { svg, png };
  } else {
    const svg = await renderQRSVG(value, config.qrSize, config.qrErrorCorrection);
    const png = await renderQRPNG(value, config.qrSize, config.qrErrorCorrection);
    return { svg, png };
  }
}
