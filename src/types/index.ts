// ======================
// Core Type Definitions
// ======================

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  isExternal?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
}

export interface BarcodeType {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
}

export interface QRType {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface HowItWorksStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export type Theme = "light" | "dark" | "system";
