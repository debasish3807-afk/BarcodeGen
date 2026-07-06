# BarcodeGen - Deployment Guide

## Quick Start

### Docker (Recommended)
```bash
# Clone and configure
cp .env.example .env.local
# Edit .env.local with your values

# Start all services
docker compose up -d

# Run database migrations
docker compose exec app npx prisma migrate deploy

# Access: http://localhost:3000
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### AWS (ECS/Fargate)
1. Push Docker image to ECR
2. Create ECS cluster with Fargate launch type
3. Configure Application Load Balancer
4. Set environment variables in Task Definition
5. Deploy service with desired count

### Google Cloud (Cloud Run)
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/barcodegen
gcloud run deploy barcodegen --image gcr.io/PROJECT_ID/barcodegen --platform managed
```

### Azure (Container Apps)
```bash
az containerapp create --name barcodegen --resource-group myRG --image ghcr.io/barcodegen:latest
```

### DigitalOcean (App Platform)
1. Connect GitHub repository
2. Select Docker build
3. Configure environment variables
4. Deploy

### Railway
```bash
railway login
railway init
railway up
```

### Render
1. Connect repository
2. Select Docker build
3. Add environment variables
4. Auto-deploy on push

### Netlify (Static Export)
```bash
# Add to next.config.ts: output: 'export'
netlify deploy --prod
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | PostgreSQL connection string |
| REDIS_URL | No | Redis connection (caching) |
| JWT_SECRET | Yes | JWT signing secret (min 32 chars) |
| NEXT_PUBLIC_APP_URL | Yes | Public app URL |
| EMAIL_PROVIDER | No | smtp/sendgrid/resend |
| STORAGE_PROVIDER | No | s3/cloudinary/backblaze/local |
| SENTRY_DSN | No | Error tracking |
| STRIPE_SECRET_KEY | No | Stripe payments |
| RAZORPAY_KEY_ID | No | Razorpay payments |

## SSL/HTTPS

### Let's Encrypt (Certbot)
```bash
certbot certonly --webroot -w /var/www/certbot -d barcodegen.com
```

### Cloudflare
1. Add domain to Cloudflare
2. Set SSL mode to "Full (Strict)"
3. Enable "Always Use HTTPS"
4. Configure DNS records

## Monitoring

- **Health Check**: GET /api/health
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001
- **Sentry**: Configure SENTRY_DSN

## Backup & Recovery

```bash
# Manual backup
./scripts/backup.sh

# Restore database
docker exec -i barcodegen-db pg_restore -U barcodegen -d barcodegen < backup.dump
```
