"use client";

import { useRef } from "react";
import {
  Ruler,
  Palette,
  Sparkles,
  Shield,
  Image as ImageIcon,
  Square,
  Circle,
  Hexagon,
} from "lucide-react";
import type {
  QROptions,
  ErrorCorrectionLevel,
  ModuleStyle,
  EyeStyle,
  GradientType,
  GradientDirection,
} from "../_types";
import { cn } from "@/lib/utils";

interface QRCustomizationPanelProps {
  options: QROptions;
  onOptionChange: <K extends keyof QROptions>(key: K, value: QROptions[K]) => void;
}

// ======================
// Shared Controls
// ======================

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
        <label className="text-xs font-medium text-surface-700 dark:text-surface-300">{label}</label>
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

function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs font-medium text-surface-700 dark:text-surface-300">{label}</label>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
          checked ? "bg-primary-600" : "bg-surface-300 dark:bg-surface-600"
        )}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
            checked && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}

// ======================
// Main Component
// ======================

export function QRCustomizationPanel({ options, onOptionChange }: QRCustomizationPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const moduleStyles: { value: ModuleStyle; label: string; icon: React.ElementType }[] = [
    { value: "square", label: "Square", icon: Square },
    { value: "rounded", label: "Rounded", icon: Hexagon },
    { value: "dots", label: "Dots", icon: Circle },
    { value: "classy", label: "Classy", icon: Sparkles },
  ];

  const eyeStyles: { value: EyeStyle; label: string }[] = [
    { value: "square", label: "Square" },
    { value: "rounded", label: "Rounded" },
    { value: "circle", label: "Circle" },
    { value: "leaf", label: "Leaf" },
  ];

  const errorLevels: { value: ErrorCorrectionLevel; label: string; desc: string }[] = [
    { value: "L", label: "L", desc: "7%" },
    { value: "M", label: "M", desc: "15%" },
    { value: "Q", label: "Q", desc: "25%" },
    { value: "H", label: "H", desc: "30%" },
  ];

  const gradientTypes: { value: GradientType; label: string }[] = [
    { value: "none", label: "None" },
    { value: "linear", label: "Linear" },
    { value: "radial", label: "Radial" },
  ];

  const gradientDirections: { value: GradientDirection; label: string }[] = [
    { value: "to-right", label: "→" },
    { value: "to-bottom", label: "↓" },
    { value: "to-bottom-right", label: "↘" },
    { value: "to-top-right", label: "↗" },
  ];

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) return; // 2MB max

    const reader = new FileReader();
    reader.onload = () => {
      onOptionChange("logo", {
        ...options.logo,
        enabled: true,
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onOptionChange("logo", {
      ...options.logo,
      enabled: false,
      dataUrl: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Size & Margin */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Ruler className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Size & Spacing</h4>
        </div>
        <div className="space-y-4">
          <SliderField
            label="Size"
            value={options.size}
            min={150}
            max={600}
            step={50}
            unit="px"
            onChange={(v) => onOptionChange("size", v)}
          />
          <SliderField
            label="Quiet Zone (Margin)"
            value={options.margin}
            min={0}
            max={6}
            step={1}
            unit=""
            onChange={(v) => onOptionChange("margin", v)}
          />
        </div>
      </div>

      {/* Module Style */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Square className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Module Style</h4>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {moduleStyles.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onOptionChange("moduleStyle", value)}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs font-medium transition-all border",
                options.moduleStyle === value
                  ? "bg-primary-50 dark:bg-primary-950/50 border-primary-500 text-primary-700 dark:text-primary-300"
                  : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800"
              )}
              aria-pressed={options.moduleStyle === value}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Eye Style */}
      <div>
        <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-2">Eye Style</h4>
        <div className="grid grid-cols-4 gap-2">
          {eyeStyles.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onOptionChange("eyeStyle", value)}
              className={cn(
                "px-2 py-2 rounded-xl text-xs font-medium transition-all border text-center",
                options.eyeStyle === value
                  ? "bg-accent-50 dark:bg-accent-950/50 border-accent-500 text-accent-700 dark:text-accent-300"
                  : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800"
              )}
              aria-pressed={options.eyeStyle === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Correction */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-accent-600 dark:text-accent-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Error Correction</h4>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {errorLevels.map(({ value, label, desc }) => (
            <button
              key={value}
              onClick={() => onOptionChange("errorCorrection", value)}
              className={cn(
                "flex flex-col items-center px-2 py-2.5 rounded-xl text-xs font-medium transition-all border",
                options.errorCorrection === value
                  ? "bg-primary-50 dark:bg-primary-950/50 border-primary-500 text-primary-700 dark:text-primary-300"
                  : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800"
              )}
              aria-pressed={options.errorCorrection === value}
            >
              <span className="font-bold">{label}</span>
              <span className="text-[10px] opacity-70">{desc}</span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-surface-500 dark:text-surface-400 mt-1.5">
          Higher = more damage resistance, but denser QR
        </p>
      </div>

      {/* Colors */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="h-4 w-4 text-accent-600 dark:text-accent-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Colors</h4>
        </div>
        <div className="space-y-4">
          <ColorField
            label="Foreground"
            value={options.foregroundColor}
            onChange={(v) => onOptionChange("foregroundColor", v)}
            disabled={options.gradient.type !== "none"}
          />
          <ColorField
            label="Background"
            value={options.backgroundColor}
            onChange={(v) => onOptionChange("backgroundColor", v)}
            disabled={options.transparentBackground}
          />
          <ToggleSwitch
            label="Transparent Background"
            checked={options.transparentBackground}
            onChange={(v) => onOptionChange("transparentBackground", v)}
          />
        </div>
      </div>

      {/* Gradient */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Gradient</h4>
        </div>
        <div className="space-y-3">
          {/* Gradient Type */}
          <div className="grid grid-cols-3 gap-2">
            {gradientTypes.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onOptionChange("gradient", { ...options.gradient, type: value })}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-medium transition-all border text-center",
                  options.gradient.type === value
                    ? "bg-primary-50 dark:bg-primary-950/50 border-primary-500 text-primary-700 dark:text-primary-300"
                    : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800"
                )}
                aria-pressed={options.gradient.type === value}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Gradient Direction (only for linear) */}
          {options.gradient.type === "linear" && (
            <div className="grid grid-cols-4 gap-2">
              {gradientDirections.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onOptionChange("gradient", { ...options.gradient, direction: value })}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm font-medium transition-all border text-center",
                    options.gradient.direction === value
                      ? "bg-accent-50 dark:bg-accent-950/50 border-accent-500 text-accent-700 dark:text-accent-300"
                      : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800"
                  )}
                  aria-pressed={options.gradient.direction === value}
                  aria-label={`Gradient direction ${value}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Gradient Colors */}
          {options.gradient.type !== "none" && (
            <div className="grid grid-cols-2 gap-3">
              <ColorField
                label="Start"
                value={options.gradient.startColor}
                onChange={(v) => onOptionChange("gradient", { ...options.gradient, startColor: v })}
              />
              <ColorField
                label="End"
                value={options.gradient.endColor}
                onChange={(v) => onOptionChange("gradient", { ...options.gradient, endColor: v })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ImageIcon className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
          <h4 className="text-sm font-bold text-surface-900 dark:text-white">Logo</h4>
        </div>
        <div className="space-y-3">
          <ToggleSwitch
            label="Add Logo"
            checked={options.logo.enabled}
            onChange={(v) => onOptionChange("logo", { ...options.logo, enabled: v })}
          />

          {options.logo.enabled && (
            <>
              {/* Upload */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                  aria-label="Upload logo image"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-surface-300 dark:border-surface-600 text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors"
                >
                  <ImageIcon className="h-4 w-4" />
                  {options.logo.dataUrl ? "Change Logo" : "Upload Logo"}
                </label>
                {options.logo.dataUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={options.logo.dataUrl} alt="Logo preview" className="w-full h-full object-contain" />
                    </div>
                    <button
                      onClick={removeLogo}
                      className="text-xs text-red-600 dark:text-red-400 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-[10px] text-surface-500 dark:text-surface-400 mt-1">
                  PNG, JPG, SVG or WebP. Max 2MB.
                </p>
              </div>

              {/* Logo Size */}
              <SliderField
                label="Logo Size"
                value={options.logo.size}
                min={10}
                max={40}
                step={2}
                unit="%"
                onChange={(v) => onOptionChange("logo", { ...options.logo, size: v })}
              />

              {/* Remove BG behind logo */}
              <ToggleSwitch
                label="White Background Behind Logo"
                checked={options.logo.removeBg}
                onChange={(v) => onOptionChange("logo", { ...options.logo, removeBg: v })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
