# BarcodeGen - Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CDN / Cloudflare                         │
├─────────────────────────────────────────────────────────────────┤
│                      Nginx Reverse Proxy                         │
│              SSL • Rate Limiting • Compression                   │
├─────────────────────────────────────────────────────────────────┤
│                     Next.js 15 Application                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   App Router  │  │   REST API   │  │   Admin Dashboard    │  │
│  │  (Frontend)   │  │  (/api/v1)   │  │  (/admin/*)          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  PostgreSQL   │  │    Redis     │  │   Object Storage     │  │
│  │  (Prisma ORM) │  │   (Cache)   │  │   (S3/Cloudinary)    │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
    ┌────┴────┐         ┌────┴────┐         ┌────┴────┐
    │Prometheus│         │ Grafana │         │  Sentry │
    └─────────┘         └─────────┘         └─────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| UI | React 19 + Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Database | PostgreSQL 16 + Prisma ORM |
| Cache | Redis 7 (ioredis) |
| Auth | JWT (jose) + RBAC |
| Validation | Zod |
| Email | SendGrid / Resend / SMTP |
| Storage | S3 / Cloudinary / Backblaze |
| Monitoring | Prometheus + Grafana + Sentry |
| Container | Docker (multi-stage) |
| CI/CD | GitHub Actions |
| Proxy | Nginx (SSL, rate limit, gzip) |

## Directory Structure

```
barcodegen/
├── prisma/schema.prisma        # Database schema (20 tables)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (admin)/admin/      # Admin panel (8 pages)
│   │   ├── api/                # REST API endpoints
│   │   ├── barcode-generator/  # Barcode module
│   │   ├── qr-generator/      # QR module
│   │   ├── batch-generator/   # Batch module
│   │   └── ...                # 23+ route directories
│   ├── components/            # Shared UI components
│   ├── constants/             # App constants & config
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Core libraries
│   │   ├── api/               # Response helpers, validation, rate limiting
│   │   ├── auth/              # JWT, RBAC
│   │   ├── billing/           # Plans, coupons, SDKs
│   │   ├── cache/             # Redis client
│   │   ├── db/                # Prisma client
│   │   ├── email/             # Multi-provider email
│   │   ├── i18n/              # Internationalization (20 locales)
│   │   ├── monitoring/        # Health checks
│   │   └── storage/           # Multi-provider storage
│   ├── providers/             # React context providers
│   ├── styles/                # Global CSS + Tailwind theme
│   └── types/                 # TypeScript definitions
├── docker/                    # Nginx config
├── infrastructure/            # Prometheus, DB init
├── scripts/                   # Deploy, backup scripts
├── docs/                      # Documentation
├── .github/workflows/         # CI/CD pipelines
├── Dockerfile                 # Multi-stage production build
└── docker-compose.yml         # Full stack orchestration
```

## Security Architecture

- JWT tokens (HS256, 7-day expiry)
- Role-Based Access Control (5 roles)
- Rate limiting (Redis-backed sliding window)
- Input validation (Zod schemas on all endpoints)
- Security headers (CSP, HSTS, X-Frame-Options)
- Encrypted API keys (crypto.randomBytes)
- Webhook signature verification
- Non-root Docker container
- SQL injection protection (Prisma parameterized queries)
