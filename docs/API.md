# BarcodeGen - API Documentation

## Base URL
```
Production: https://api.barcodegen.com/v1
Development: http://localhost:3000/api/v1
```

## Authentication
All authenticated endpoints require a Bearer token:
```
Authorization: Bearer YOUR_API_KEY
```

## Rate Limits
- Free: 50 requests/minute
- Starter: 100 requests/minute
- Professional: 500 requests/minute
- Business: 2000 requests/minute
- Enterprise: Unlimited

## Endpoints

### Barcodes

#### Create Barcode
```
POST /v1/barcodes
Content-Type: application/json

{
  "value": "5901234123457",
  "format": "EAN13",
  "options": {
    "width": 2,
    "height": 100,
    "displayValue": true
  }
}
```

#### List Barcodes
```
GET /v1/barcodes?page=1&limit=20
```

### QR Codes

#### Create QR Code
```
POST /v1/qrcodes
Content-Type: application/json

{
  "value": "https://example.com",
  "type": "url",
  "options": {
    "size": 300,
    "errorCorrection": "M"
  }
}
```

### API Keys

#### Generate Key
```
POST /v1/api-keys
{
  "name": "Production Key",
  "scopes": ["barcodes", "qrcodes", "batch"]
}
```

### Contact
```
POST /v1/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Support Request",
  "message": "..."
}
```

### Health Check
```
GET /health
```

## Error Responses
```json
{
  "success": false,
  "message": "Error description",
  "errors": [...]
}
```

## Webhooks
Configure at: /developer → Webhooks tab

Events: `barcode.created`, `qrcode.created`, `batch.completed`, `payment.success`, `payment.failed`
