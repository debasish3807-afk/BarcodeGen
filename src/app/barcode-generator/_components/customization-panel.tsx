"use client";

import {
  Ruler,
  Type,
  Palette,
  RotateCw,
  Eye,
  EyeOff,
  Scan,
} from "lucide-react";
import type { BarcodeOptions, FontFamily, TextAlign, Rotation } from "../_types";
import { cn } from "@/lib/utils";

interface CustomizationPanelProps {
  options: BarcodeOptions;
  onOptionChange: <K extends keyof BarcodeOptions>(key: K, value: BarcodeOptions[K]) => void;
}

// Reusable slider component
function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-surface-700 dark:text-surface-300">
          {label}
        </label>
        <span className="text-xs font-mono text-surface-500 dark:text-surface-400">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full appearance-none cursor-pointer accent-primary-600"
        aria-label={label}
      />
    </div>
  );
}

// Color picker field
function ColorField({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className={cn(disabled && "opacity-50 pointer-events-none")}>
      <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-9 h-9 rounded-lg border border-surface-200 dark:border-surface-700 cursor-pointer"
          aria-label={label}
          disabled={disabled}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          placeholder="#000000"
          disabled={disabled}
          aria-label={`${label} hex value`}
        />
      </div>
    </div>
  );
}

export function CustomizationPanel({ options, onOptionChange }: CustomizationPanelProps) {
  const fontFamilies: { value: FontFamily; label: string }[] = [
    { value: "monospace", label: "Monospace" },
    { value: "sans-serif", label: "Sans Serif" },
    { value: "serif", label: "Serif" },
    { value: "cursive", label: "Cursive" },
    { value: "fantasy", label: "Fantasy" },
  ];

  const textAligns: { value: TextAlign; label: string }[] = [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ];

  const rotations: Rotation[] = [0, 90, 180, 270];

  return (
    <div className="space-y-6">
      {/* Dimensions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Ruler className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Dimensions</h4>
        </div>
        <div className="space-y-4">
          <SliderField
            label="Bar Width"
            value={options.width}
            min={1}
            max={5}
            step={0.5}
            unit="px"
            onChange={(v) => onOptionChange("width", v)}
          />
          <SliderField
            label="Height"
            value={options.height}
            min={30}
            max={200}
            step={5}
            unit="px"
            onChange={(v) => onOptionChange("height", v)}
          />
          <SliderField
            label="Margin"
            value={options.margin}
            min={0}
            max={30}
            step={1}
            unit="px"
            onChange={(v) => onOptionChange("margin", v)}
          />
          <SliderField
            label="DPI"
            value={options.dpi}
            min={72}
            max={600}
            step={72}
            unit=""
            onChange={(v) => onOptionChange("dpi", v)}
          />
        </div>
      </div>

      {/* Typography */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Type className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Typography</h4>
        </div>
        <div className="space-y-4">
          {/* Show/Hide Text */}
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-surface-700 dark:text-surface-300">
              Show Text
            </label>
            <button
              onClick={() => onOptionChange("displayValue", !options.displayValue)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
                options.displayValue
                  ? "bg-primary-600"
                  : "bg-surface-300 dark:bg-surface-600"
              )}
              role="switch"
              aria-checked={options.displayValue}
              aria-label="Toggle text visibility"
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 flex items-center justify-center",
                  options.displayValue && "translate-x-5"
                )}
              >
                {options.displayValue ? (
                  <Eye className="h-3 w-3 text-primary-600" />
                ) : (
                  <EyeOff className="h-3 w-3 text-surface-400" />
                )}
              </span>
            </button>
          </div>

          {/* Font Size */}
          <SliderField
            label="Font Size"
            value={options.fontSize}
            min={8}
            max={28}
            step={1}
            unit="px"
            onChange={(v) => onOptionChange("fontSize", v)}
          />

          {/* Font Family */}
          <div>
            <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-1.5">
              Font Family
            </label>
            <select
              value={options.fontFamily}
              onChange={(e) => onOptionChange("fontFamily", e.target.value as FontFamily)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              aria-label="Font family"
            >
              {fontFamilies.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* Text Alignment */}
          <div>
            <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-1.5">
              Text Alignment
            </label>
            <div className="flex gap-1">
              {textAligns.map((align) => (
                <button
                  key={align.value}
                  onClick={() => onOptionChange("textAlign", align.value)}
                  className={cn(
                    "flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                    options.textAlign === align.value
                      ? "bg-primary-600 text-white"
                      : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
                  )}
                  aria-pressed={options.textAlign === align.value}
                >
                  {align.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="h-4 w-4 text-accent-600 dark:text-accent-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Colors</h4>
        </div>
        <div className="space-y-4">
          <ColorField
            label="Foreground (Bars)"
            value={options.foregroundColor}
            onChange={(v) => onOptionChange("foregroundColor", v)}
          />
          <ColorField
            label="Background"
            value={options.backgroundColor}
            onChange={(v) => onOptionChange("backgroundColor", v)}
            disabled={options.transparentBackground}
          />
          {/* Transparent Background */}
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-surface-700 dark:text-surface-300">
              Transparent Background
            </label>
            <button
              onClick={() => onOptionChange("transparentBackground", !options.transparentBackground)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
                options.transparentBackground
                  ? "bg-primary-600"
                  : "bg-surface-300 dark:bg-surface-600"
              )}
              role="switch"
              aria-checked={options.transparentBackground}
              aria-label="Toggle transparent background"
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                  options.transparentBackground && "translate-x-5"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Rotation */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <RotateCw className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Rotation</h4>
        </div>
        <div className="flex gap-1">
          {rotations.map((r) => (
            <button
              key={r}
              onClick={() => onOptionChange("rotation", r)}
              className={cn(
                "flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors",
                options.rotation === r
                  ? "bg-primary-600 text-white"
                  : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
              )}
              aria-pressed={options.rotation === r}
            >
              <div className="flex items-center justify-center gap-1">
                <Scan className="h-3 w-3" style={{ transform: `rotate(${r}deg)` }} />
                <span>{r}°</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
