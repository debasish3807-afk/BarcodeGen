import type { QROptions, ErrorCorrectionLevel } from "../_types";

// ======================
// QR Code Renderer
// Uses qrcode-generator to create QR matrix,
// then renders to Canvas with custom styling
// ======================

type QRCellMatrix = boolean[][];

interface QRRenderConfig {
  data: string;
  size: number;
  margin: number;
  foregroundColor: string;
  backgroundColor: string;
  transparentBackground: boolean;
  errorCorrection: ErrorCorrectionLevel;
  moduleStyle: string;
  eyeStyle: string;
  gradient: {
    type: string;
    direction: string;
    startColor: string;
    endColor: string;
  };
  logo: {
    enabled: boolean;
    dataUrl: string | null;
    size: number;
    removeBg: boolean;
  };
}

const EC_MAP: Record<ErrorCorrectionLevel, number> = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2,
};

/**
 * Generate QR code matrix using qrcode-generator
 */
async function getQRMatrix(data: string, ecLevel: ErrorCorrectionLevel): Promise<{ matrix: QRCellMatrix; moduleCount: number }> {
  const qrGen = (await import("qrcode-generator")).default;
  const qr = qrGen(0, EC_MAP[ecLevel] === 0 ? "M" : EC_MAP[ecLevel] === 1 ? "L" : EC_MAP[ecLevel] === 3 ? "Q" : "H");
  qr.addData(data);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const matrix: QRCellMatrix = [];

  for (let row = 0; row < moduleCount; row++) {
    matrix[row] = [];
    for (let col = 0; col < moduleCount; col++) {
      matrix[row][col] = qr.isDark(row, col);
    }
  }

  return { matrix, moduleCount };
}

/**
 * Check if a cell is part of a finder pattern (eye)
 */
function isFinderPattern(row: number, col: number, moduleCount: number): boolean {
  // Top-left
  if (row < 7 && col < 7) return true;
  // Top-right
  if (row < 7 && col >= moduleCount - 7) return true;
  // Bottom-left
  if (row >= moduleCount - 7 && col < 7) return true;
  return false;
}

/**
 * Create gradient fill on canvas
 */
function createGradientFill(
  ctx: CanvasRenderingContext2D,
  size: number,
  gradient: QRRenderConfig["gradient"]
): CanvasGradient | string {
  if (gradient.type === "none") return "#000000";

  let grad: CanvasGradient;
  if (gradient.type === "radial") {
    const center = size / 2;
    grad = ctx.createRadialGradient(center, center, 0, center, center, center);
  } else {
    // Linear
    switch (gradient.direction) {
      case "to-bottom":
        grad = ctx.createLinearGradient(0, 0, 0, size);
        break;
      case "to-bottom-right":
        grad = ctx.createLinearGradient(0, 0, size, size);
        break;
      case "to-top-right":
        grad = ctx.createLinearGradient(0, size, size, 0);
        break;
      default: // to-right
        grad = ctx.createLinearGradient(0, 0, size, 0);
        break;
    }
  }

  grad.addColorStop(0, gradient.startColor);
  grad.addColorStop(1, gradient.endColor);
  return grad;
}

/**
 * Draw a single module with the specified style
 */
function drawModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  cellSize: number,
  style: string
) {
  const padding = cellSize * 0.05;
  const s = cellSize - padding * 2;

  switch (style) {
    case "rounded": {
      const radius = s * 0.3;
      ctx.beginPath();
      ctx.roundRect(x + padding, y + padding, s, s, radius);
      ctx.fill();
      break;
    }
    case "dots": {
      const radius = s / 2;
      ctx.beginPath();
      ctx.arc(x + cellSize / 2, y + cellSize / 2, radius * 0.85, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "classy": {
      const radius = s * 0.5;
      ctx.beginPath();
      ctx.roundRect(x + padding, y + padding, s, s, [radius, 0, radius, 0]);
      ctx.fill();
      break;
    }
    default: // square
      ctx.fillRect(x + padding, y + padding, s, s);
      break;
  }
}

/**
 * Draw a finder pattern (eye) with custom style
 */
function drawFinderPattern(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  cellSize: number,
  eyeStyle: string,
  fgColor: string | CanvasGradient
) {
  const outerSize = cellSize * 7;
  const innerSize = cellSize * 5;
  const coreSize = cellSize * 3;
  const outerOffset = 0;
  const innerOffset = cellSize;
  const coreOffset = cellSize * 2;

  const getRadius = (size: number) => {
    switch (eyeStyle) {
      case "rounded": return size * 0.2;
      case "circle": return size * 0.5;
      case "leaf": return size * 0.4;
      default: return 0;
    }
  };

  const getLeafRadius = (size: number): [number, number, number, number] => {
    const r = size * 0.4;
    return [r, 0, r, 0];
  };

  // Outer border
  ctx.fillStyle = fgColor as string;
  ctx.beginPath();
  if (eyeStyle === "leaf") {
    ctx.roundRect(startX + outerOffset, startY + outerOffset, outerSize, outerSize, getLeafRadius(outerSize));
  } else {
    ctx.roundRect(startX + outerOffset, startY + outerOffset, outerSize, outerSize, getRadius(outerSize));
  }
  ctx.fill();

  // Inner white
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  if (eyeStyle === "leaf") {
    ctx.roundRect(startX + innerOffset, startY + innerOffset, innerSize, innerSize, getLeafRadius(innerSize));
  } else {
    ctx.roundRect(startX + innerOffset, startY + innerOffset, innerSize, innerSize, getRadius(innerSize));
  }
  ctx.fill();

  // Core
  ctx.fillStyle = fgColor as string;
  ctx.beginPath();
  if (eyeStyle === "leaf") {
    ctx.roundRect(startX + coreOffset, startY + coreOffset, coreSize, coreSize, getLeafRadius(coreSize));
  } else {
    ctx.roundRect(startX + coreOffset, startY + coreOffset, coreSize, coreSize, getRadius(coreSize));
  }
  ctx.fill();
}

/**
 * Main render function - renders QR code to canvas
 */
export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  options: QROptions,
  encodedData: string
): Promise<void> {
  const config: QRRenderConfig = {
    data: encodedData,
    size: options.size,
    margin: options.margin,
    foregroundColor: options.foregroundColor,
    backgroundColor: options.backgroundColor,
    transparentBackground: options.transparentBackground,
    errorCorrection: options.errorCorrection,
    moduleStyle: options.moduleStyle,
    eyeStyle: options.eyeStyle,
    gradient: options.gradient,
    logo: options.logo,
  };

  const { matrix, moduleCount } = await getQRMatrix(config.data, config.errorCorrection);

  const totalModules = moduleCount + config.margin * 2;
  const cellSize = config.size / totalModules;
  const canvasSize = config.size;

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear / background
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  if (!config.transparentBackground) {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
  }

  // Determine fill color/gradient
  const fillStyle =
    config.gradient.type !== "none"
      ? createGradientFill(ctx, canvasSize, config.gradient)
      : config.foregroundColor;

  // Draw data modules (excluding finder patterns)
  ctx.fillStyle = fillStyle as string;
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (matrix[row][col] && !isFinderPattern(row, col, moduleCount)) {
        const x = (col + config.margin) * cellSize;
        const y = (row + config.margin) * cellSize;
        drawModule(ctx, x, y, cellSize, config.moduleStyle);
      }
    }
  }

  // Draw finder patterns with eye style
  const marginPx = config.margin * cellSize;

  // Top-left eye
  drawFinderPattern(ctx, marginPx, marginPx, cellSize, config.eyeStyle, fillStyle as string);
  // Top-right eye
  drawFinderPattern(ctx, marginPx + (moduleCount - 7) * cellSize, marginPx, cellSize, config.eyeStyle, fillStyle as string);
  // Bottom-left eye
  drawFinderPattern(ctx, marginPx, marginPx + (moduleCount - 7) * cellSize, cellSize, config.eyeStyle, fillStyle as string);

  // Draw logo if enabled
  if (config.logo.enabled && config.logo.dataUrl) {
    await drawLogo(ctx, canvasSize, config.logo);
  }
}

/**
 * Draw logo in center of QR code
 */
async function drawLogo(
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  logo: QRRenderConfig["logo"]
): Promise<void> {
  if (!logo.dataUrl) return;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const logoSize = canvasSize * (logo.size / 100);
      const x = (canvasSize - logoSize) / 2;
      const y = (canvasSize - logoSize) / 2;

      // Remove background behind logo
      if (logo.removeBg) {
        const padding = logoSize * 0.15;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(x - padding, y - padding, logoSize + padding * 2, logoSize + padding * 2, 8);
        ctx.fill();
      }

      ctx.drawImage(img, x, y, logoSize, logoSize);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = logo.dataUrl!;
  });
}

/**
 * Render QR code to SVG string
 */
export async function renderQRToSVG(
  options: QROptions,
  encodedData: string
): Promise<string> {
  const qrGen = (await import("qrcode-generator")).default;
  const ecMap: Record<ErrorCorrectionLevel, "L" | "M" | "Q" | "H"> = { L: "L", M: "M", Q: "Q", H: "H" };
  const qr = qrGen(0, ecMap[options.errorCorrection]);
  qr.addData(encodedData);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const totalModules = moduleCount + options.margin * 2;
  const cellSize = options.size / totalModules;
  const size = options.size;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;

  // Background
  if (!options.transparentBackground) {
    svg += `<rect width="${size}" height="${size}" fill="${options.backgroundColor}" />`;
  }

  // Gradient definition
  let fillAttr = `fill="${options.foregroundColor}"`;
  if (options.gradient.type !== "none") {
    const gradId = "qrGrad";
    if (options.gradient.type === "linear") {
      let x2 = "1", y2 = "0";
      switch (options.gradient.direction) {
        case "to-bottom": x2 = "0"; y2 = "1"; break;
        case "to-bottom-right": x2 = "1"; y2 = "1"; break;
        case "to-top-right": x2 = "1"; y2 = "0"; break;
        default: x2 = "1"; y2 = "0";
      }
      svg += `<defs><linearGradient id="${gradId}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0%" stop-color="${options.gradient.startColor}"/><stop offset="100%" stop-color="${options.gradient.endColor}"/></linearGradient></defs>`;
    } else {
      svg += `<defs><radialGradient id="${gradId}"><stop offset="0%" stop-color="${options.gradient.startColor}"/><stop offset="100%" stop-color="${options.gradient.endColor}"/></radialGradient></defs>`;
    }
    fillAttr = `fill="url(#${gradId})"`;
  }

  // Modules
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.isDark(row, col)) {
        const x = (col + options.margin) * cellSize;
        const y = (row + options.margin) * cellSize;
        const s = cellSize * 0.9;
        const offset = cellSize * 0.05;

        if (options.moduleStyle === "dots") {
          const r = s / 2 * 0.85;
          svg += `<circle cx="${x + cellSize / 2}" cy="${y + cellSize / 2}" r="${r}" ${fillAttr}/>`;
        } else if (options.moduleStyle === "rounded") {
          const radius = s * 0.3;
          svg += `<rect x="${x + offset}" y="${y + offset}" width="${s}" height="${s}" rx="${radius}" ${fillAttr}/>`;
        } else {
          svg += `<rect x="${x + offset}" y="${y + offset}" width="${s}" height="${s}" ${fillAttr}/>`;
        }
      }
    }
  }

  svg += "</svg>";
  return svg;
}
