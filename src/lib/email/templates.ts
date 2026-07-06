// ======================
// Email Templates
// ======================

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5}
.container{max-width:600px;margin:0 auto;padding:20px}
.card{background:#fff;border-radius:16px;padding:40px;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
.header{text-align:center;margin-bottom:32px}
.logo{font-size:24px;font-weight:bold;color:#2563eb}
.btn{display:inline-block;padding:12px 32px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px}
.footer{text-align:center;margin-top:32px;color:#737373;font-size:12px}
</style></head>
<body><div class="container"><div class="card"><div class="header"><div class="logo">BarcodeGen</div></div>${content}</div>
<div class="footer"><p>&copy; ${new Date().getFullYear()} BarcodeGen. All rights reserved.</p><p><a href="https://barcodegen.com/privacy-policy" style="color:#737373">Privacy</a> | <a href="https://barcodegen.com/terms" style="color:#737373">Terms</a></p></div></div></body></html>`;

export function welcomeEmail(name: string): { subject: string; html: string } {
  return {
    subject: "Welcome to BarcodeGen!",
    html: baseTemplate(`<h1 style="color:#171717;font-size:24px;margin:0 0 16px">Welcome, ${name}!</h1><p style="color:#525252;line-height:1.6">Thank you for joining BarcodeGen. You now have access to the most powerful barcode and QR code generation platform.</p><p style="text-align:center;margin:32px 0"><a href="https://barcodegen.com/barcode-generator" class="btn">Start Generating</a></p>`),
  };
}

export function verificationEmail(name: string, token: string): { subject: string; html: string } {
  return {
    subject: "Verify Your Email - BarcodeGen",
    html: baseTemplate(`<h1 style="color:#171717;font-size:24px;margin:0 0 16px">Verify Your Email</h1><p style="color:#525252;line-height:1.6">Hi ${name}, please verify your email address to complete your registration.</p><p style="text-align:center;margin:32px 0"><a href="https://barcodegen.com/verify?token=${token}" class="btn">Verify Email</a></p><p style="color:#a3a3a3;font-size:12px">This link expires in 24 hours.</p>`),
  };
}

export function passwordResetEmail(name: string, token: string): { subject: string; html: string } {
  return {
    subject: "Reset Your Password - BarcodeGen",
    html: baseTemplate(`<h1 style="color:#171717;font-size:24px;margin:0 0 16px">Reset Password</h1><p style="color:#525252;line-height:1.6">Hi ${name}, we received a request to reset your password.</p><p style="text-align:center;margin:32px 0"><a href="https://barcodegen.com/reset-password?token=${token}" class="btn">Reset Password</a></p><p style="color:#a3a3a3;font-size:12px">If you didn't request this, ignore this email. Link expires in 1 hour.</p>`),
  };
}

export function invoiceEmail(name: string, amount: string, invoiceUrl: string): { subject: string; html: string } {
  return {
    subject: "Invoice from BarcodeGen",
    html: baseTemplate(`<h1 style="color:#171717;font-size:24px;margin:0 0 16px">Invoice Generated</h1><p style="color:#525252;line-height:1.6">Hi ${name}, your invoice for <strong>${amount}</strong> has been generated.</p><p style="text-align:center;margin:32px 0"><a href="${invoiceUrl}" class="btn">Download Invoice</a></p>`),
  };
}

export function newsletterEmail(content: string, unsubscribeUrl: string): { subject: string; html: string } {
  return {
    subject: "BarcodeGen Newsletter",
    html: baseTemplate(`${content}<p style="text-align:center;margin-top:32px"><a href="${unsubscribeUrl}" style="color:#a3a3a3;font-size:12px">Unsubscribe</a></p>`),
  };
}
