# BarcodeGen

**Professional Barcode & QR Code Generator** — Enterprise-grade SaaS application built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

[![Build Status](https://img.shields.io/badge/build-passing-green)](https://github.com/barcodegen)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-purple)](CHANGELOG.md)

## Features

- **Barcode Generator** — 11 formats with live preview and customization
- **QR Code Generator** — 10 types with styling, gradients, and logo upload
- **Batch Generator** — Process 10,000+ items from CSV/Excel/JSON
- **AI Generator** — Describe what you need, get instant results
- **QR Scanner** — Camera and image upload decoding
- **Templates** — 18 professional presets
- **Multi-Language** — 20 locales with RTL support
- **Developer API** — REST API with SDKs for 9 languages
- **Admin Dashboard** — Full management panel

## Quick Start

```bash
# Clone
git clone https://github.com/barcodegen/barcodegen.git
cd barcodegen

# Install
npm install

# Configure
cp .env.example .env.local

# Generate Prisma
npx prisma generate

# Development
npm run dev

# Production build
npm run build && npm start
```

## Docker

```bash
docker compose up -d
```

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS v4 |
| Backend | Node.js, Prisma ORM, PostgreSQL, Redis |
| Auth | JWT + Role-Based Access Control |
| Payments | Stripe, Razorpay, PayPal, UPI, Apple/Google Pay |
| Monitoring | Prometheus, Grafana, Sentry |
| Deploy | Docker, GitHub Actions, Vercel, AWS/GCP/Azure |

## Project Stats

| Metric | Count |
|--------|-------|
| Total Routes | 55 |
| API Endpoints | 11 |
| Database Tables | 20 |
| Components | 60+ |
| Supported Languages | 20 |
| Barcode Formats | 11 |
| QR Types | 10 |
| Source Files | 166 |

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/API.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Changelog](CHANGELOG.md)

## License

MIT
