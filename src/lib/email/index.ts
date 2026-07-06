// ======================
// Email System - Multi-provider Support
// ======================

export type EmailProvider = "smtp" | "sendgrid" | "resend";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export interface EmailConfig {
  provider: EmailProvider;
  from: string;
  smtp?: { host: string; port: number; user: string; pass: string; secure: boolean };
  sendgridKey?: string;
  resendKey?: string;
}

function getConfig(): EmailConfig {
  return {
    provider: (process.env.EMAIL_PROVIDER as EmailProvider) || "smtp",
    from: process.env.EMAIL_FROM || "noreply@barcodegen.com",
    smtp: {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
      secure: process.env.SMTP_SECURE === "true",
    },
    sendgridKey: process.env.SENDGRID_API_KEY,
    resendKey: process.env.RESEND_API_KEY,
  };
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const config = getConfig();
  const { to, subject, html, from = config.from } = options;

  try {
    switch (config.provider) {
      case "sendgrid":
        return await sendViaSendGrid(to, from, subject, html, config.sendgridKey!);
      case "resend":
        return await sendViaResend(to, from, subject, html, config.resendKey!);
      default:
        return await sendViaSMTP(to, from, subject, html, config.smtp!);
    }
  } catch (error) {
    console.error("Email send failed:", error);
    return false;
  }
}

async function sendViaSMTP(to: string, from: string, subject: string, html: string, smtp: NonNullable<EmailConfig["smtp"]>): Promise<boolean> {
  // In production: use nodemailer
  // const transporter = nodemailer.createTransport({ host: smtp.host, port: smtp.port, auth: { user: smtp.user, pass: smtp.pass } });
  // await transporter.sendMail({ from, to, subject, html });
  console.log(`[SMTP] Email to ${to}: ${subject}`);
  void from; void html; void smtp;
  return true;
}

async function sendViaSendGrid(to: string, from: string, subject: string, html: string, apiKey: string): Promise<boolean> {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ personalizations: [{ to: [{ email: to }] }], from: { email: from }, subject, content: [{ type: "text/html", value: html }] }),
  });
  return response.ok;
}

async function sendViaResend(to: string, from: string, subject: string, html: string, apiKey: string): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  return response.ok;
}
