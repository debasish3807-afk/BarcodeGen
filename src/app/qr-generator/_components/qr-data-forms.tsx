"use client";

import {
  Link as LinkIcon,
  Type,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Wifi,
  Contact,
  MapPin,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import type {
  QRType,
  QRDataPayload,
  URLData,
  TextData,
  EmailData,
  PhoneData,
  SMSData,
  WhatsAppData,
  WiFiData,
  VCardData,
  LocationData,
  UPIData,
  ValidationResult,
} from "../_types";
import { cn } from "@/lib/utils";

// ======================
// Shared Input Components
// ======================

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  helperText?: string;
}

function Field({ label, value, onChange, placeholder, type = "text", required, helperText }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-surface-700 dark:text-surface-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
        aria-label={label}
      />
      {helperText && (
        <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">{helperText}</p>
      )}
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 3 }: FieldProps & { rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-medium text-surface-700 dark:text-surface-300 mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 text-sm rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
        aria-label={label}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-surface-700 dark:text-surface-300 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-sm rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({ label, checked, onChange }: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs font-medium text-surface-700 dark:text-surface-300">{label}</label>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-10 h-5.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
          checked ? "bg-primary-600" : "bg-surface-300 dark:bg-surface-600"
        )}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span className={cn(
          "absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform duration-200",
          checked && "translate-x-[18px]"
        )} />
      </button>
    </div>
  );
}

// ======================
// Type-specific Forms
// ======================

function URLForm({ data, onChange }: { data: URLData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
        <LinkIcon className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">URL</span>
      </div>
      <Field
        label="Website URL"
        value={data.url}
        onChange={(v) => onChange("url", v)}
        placeholder="https://example.com"
        type="url"
        required
        helperText="Include https:// for best compatibility"
      />
    </div>
  );
}

function TextForm({ data, onChange }: { data: TextData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 mb-1">
        <Type className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Text</span>
      </div>
      <TextAreaField
        label="Text Content"
        value={data.text}
        onChange={(v) => onChange("text", v)}
        placeholder="Enter your text message here..."
        rows={4}
      />
      <p className="text-xs text-surface-500 dark:text-surface-400">
        {data.text.length}/4296 characters
      </p>
    </div>
  );
}

function EmailForm({ data, onChange }: { data: EmailData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-accent-600 dark:text-accent-400 mb-1">
        <Mail className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Email</span>
      </div>
      <Field
        label="Email Address"
        value={data.email}
        onChange={(v) => onChange("email", v)}
        placeholder="hello@example.com"
        type="email"
        required
      />
      <Field
        label="Subject"
        value={data.subject}
        onChange={(v) => onChange("subject", v)}
        placeholder="Email subject line"
      />
      <TextAreaField
        label="Body"
        value={data.body}
        onChange={(v) => onChange("body", v)}
        placeholder="Email body content..."
        rows={3}
      />
    </div>
  );
}

function PhoneForm({ data, onChange }: { data: PhoneData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
        <Phone className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Phone</span>
      </div>
      <Field
        label="Phone Number"
        value={data.phone}
        onChange={(v) => onChange("phone", v)}
        placeholder="+1 555 123 4567"
        type="tel"
        required
        helperText="Include country code for international numbers"
      />
    </div>
  );
}

function SMSForm({ data, onChange }: { data: SMSData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 mb-1">
        <MessageSquare className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">SMS</span>
      </div>
      <Field
        label="Phone Number"
        value={data.phone}
        onChange={(v) => onChange("phone", v)}
        placeholder="+1 555 123 4567"
        type="tel"
        required
      />
      <TextAreaField
        label="Message (optional)"
        value={data.message}
        onChange={(v) => onChange("message", v)}
        placeholder="Pre-filled message text..."
        rows={3}
      />
    </div>
  );
}

function WhatsAppForm({ data, onChange }: { data: WhatsAppData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 mb-1">
        <MessageCircle className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
      </div>
      <Field
        label="Phone Number (with country code)"
        value={data.phone}
        onChange={(v) => onChange("phone", v)}
        placeholder="+1 555 123 4567"
        type="tel"
        required
        helperText="Include country code without + or spaces"
      />
      <TextAreaField
        label="Message (optional)"
        value={data.message}
        onChange={(v) => onChange("message", v)}
        placeholder="Pre-filled WhatsApp message..."
        rows={3}
      />
    </div>
  );
}

function WiFiForm({ data, onChange }: { data: WiFiData; onChange: (key: string, val: string | boolean) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-accent-600 dark:text-accent-400 mb-1">
        <Wifi className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">WiFi</span>
      </div>
      <Field
        label="Network Name (SSID)"
        value={data.ssid}
        onChange={(v) => onChange("ssid", v)}
        placeholder="My WiFi Network"
        required
      />
      <SelectField
        label="Encryption"
        value={data.encryption}
        onChange={(v) => onChange("encryption", v)}
        options={[
          { value: "WPA", label: "WPA/WPA2" },
          { value: "WEP", label: "WEP" },
          { value: "nopass", label: "None (Open)" },
        ]}
      />
      {data.encryption !== "nopass" && (
        <Field
          label="Password"
          value={data.password}
          onChange={(v) => onChange("password", v)}
          placeholder="Network password"
          type="password"
          required
        />
      )}
      <ToggleField
        label="Hidden Network"
        checked={data.hidden}
        onChange={(v) => onChange("hidden", v)}
      />
    </div>
  );
}

function VCardForm({ data, onChange }: { data: VCardData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
        <Contact className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">vCard</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="First Name"
          value={data.firstName}
          onChange={(v) => onChange("firstName", v)}
          placeholder="John"
          required
        />
        <Field
          label="Last Name"
          value={data.lastName}
          onChange={(v) => onChange("lastName", v)}
          placeholder="Doe"
          required
        />
      </div>
      <Field
        label="Phone"
        value={data.phone}
        onChange={(v) => onChange("phone", v)}
        placeholder="+1 555 123 4567"
        type="tel"
      />
      <Field
        label="Email"
        value={data.email}
        onChange={(v) => onChange("email", v)}
        placeholder="john@example.com"
        type="email"
      />
      <Field
        label="Organization"
        value={data.organization}
        onChange={(v) => onChange("organization", v)}
        placeholder="Company name"
      />
      <Field
        label="Title"
        value={data.title}
        onChange={(v) => onChange("title", v)}
        placeholder="Job title"
      />
      <Field
        label="Website"
        value={data.url}
        onChange={(v) => onChange("url", v)}
        placeholder="https://example.com"
        type="url"
      />
      <Field
        label="Address"
        value={data.address}
        onChange={(v) => onChange("address", v)}
        placeholder="123 Main St, City, Country"
      />
    </div>
  );
}

function LocationForm({ data, onChange }: { data: LocationData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-accent-600 dark:text-accent-400 mb-1">
        <MapPin className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Location</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Latitude"
          value={data.latitude}
          onChange={(v) => onChange("latitude", v)}
          placeholder="40.7128"
          type="text"
          required
        />
        <Field
          label="Longitude"
          value={data.longitude}
          onChange={(v) => onChange("longitude", v)}
          placeholder="-74.0060"
          type="text"
          required
        />
      </div>
      <Field
        label="Label (optional)"
        value={data.label}
        onChange={(v) => onChange("label", v)}
        placeholder="New York City"
        helperText="Displayed as label on the map"
      />
    </div>
  );
}

function UPIForm({ data, onChange }: { data: UPIData; onChange: (key: string, val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 mb-1">
        <IndianRupee className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">UPI Payment</span>
      </div>
      <Field
        label="UPI ID (VPA)"
        value={data.vpa}
        onChange={(v) => onChange("vpa", v)}
        placeholder="name@upi"
        required
        helperText="Your UPI Virtual Payment Address"
      />
      <Field
        label="Payee Name"
        value={data.name}
        onChange={(v) => onChange("name", v)}
        placeholder="John Doe"
        required
      />
      <Field
        label="Amount (optional)"
        value={data.amount}
        onChange={(v) => onChange("amount", v)}
        placeholder="0.00"
        type="text"
        helperText="Leave empty for variable amount"
      />
      <Field
        label="Note (optional)"
        value={data.note}
        onChange={(v) => onChange("note", v)}
        placeholder="Payment for..."
      />
    </div>
  );
}

// ======================
// Main Data Form Component
// ======================

interface QRDataFormProps {
  type: QRType;
  data: QRDataPayload;
  validation: ValidationResult;
  onDataChange: (key: string, value: unknown) => void;
}

export function QRDataForm({ type, data, validation, onDataChange }: QRDataFormProps) {
  const onChange = (key: string, val: string | boolean) => onDataChange(key, val);

  return (
    <div className="space-y-4">
      {/* Form content by type */}
      {type === "url" && <URLForm data={data as URLData} onChange={onChange} />}
      {type === "text" && <TextForm data={data as TextData} onChange={onChange} />}
      {type === "email" && <EmailForm data={data as EmailData} onChange={onChange} />}
      {type === "phone" && <PhoneForm data={data as PhoneData} onChange={onChange} />}
      {type === "sms" && <SMSForm data={data as SMSData} onChange={onChange} />}
      {type === "whatsapp" && <WhatsAppForm data={data as WhatsAppData} onChange={onChange} />}
      {type === "wifi" && <WiFiForm data={data as WiFiData} onChange={onChange} />}
      {type === "vcard" && <VCardForm data={data as VCardData} onChange={onChange} />}
      {type === "location" && <LocationForm data={data as LocationData} onChange={onChange} />}
      {type === "upi" && <UPIForm data={data as UPIData} onChange={onChange} />}

      {/* Validation Status */}
      <div
        role={validation.valid ? "status" : "alert"}
        aria-live="polite"
        className={cn(
          "flex items-center gap-1.5 text-xs font-medium pt-2 border-t border-surface-100 dark:border-surface-800",
          validation.valid
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        )}
      >
        {validation.valid ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          <AlertCircle className="h-3.5 w-3.5" />
        )}
        {validation.message}
      </div>
    </div>
  );
}
