import { Resend } from "resend";
import { branding } from "@/config/branding";

// Initialize Resend client only if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@autobook.ro";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send an email via Resend, or log to console in development.
 */
async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  if (!resend) {
    console.log("📧 [DEV MODE] Email would be sent:");
    console.log(`  To: ${to}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Body: ${html.substring(0, 200)}...`);
    return true;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

/**
 * Email sent to client after submitting appointment request.
 */
export async function sendAppointmentReceivedEmail(
  clientEmail: string,
  clientName: string,
  serviceName: string,
  preferredDate: string,
  preferredTime: string,
  businessName: string
): Promise<boolean> {
  return sendEmail({
    to: clientEmail,
    subject: `Cererea ta de programare a fost primită — ${businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: ${branding.colors.primary};">Cerere de programare primită</h2>
        <p>Bună, <strong>${clientName}</strong>!</p>
        <p>Am primit cererea ta de programare și o vom procesa cât mai curând posibil.</p>
        <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Serviciu:</strong> ${serviceName}</p>
          <p style="margin: 4px 0;"><strong>Data preferată:</strong> ${preferredDate}</p>
          <p style="margin: 4px 0;"><strong>Interval orar:</strong> ${preferredTime}</p>
        </div>
        <p>Vei primi un email de confirmare cu data și ora exactă odată ce programarea este confirmată.</p>
        <p style="color: #64748b; font-size: 14px;">— Echipa ${businessName}</p>
      </div>
    `,
  });
}

/**
 * Email sent to service owner when a new appointment request arrives.
 */
export async function sendNewAppointmentNotification(
  ownerEmail: string,
  clientName: string,
  clientPhone: string,
  clientEmail: string | null | undefined,
  carInfo: string,
  serviceName: string,
  preferredDate: string,
  preferredTime: string,
  notes: string | null | undefined
): Promise<boolean> {
  return sendEmail({
    to: ownerEmail,
    subject: `🔔 Programare nouă: ${clientName} — ${serviceName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: ${branding.colors.primary};">Programare nouă</h2>
        <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Client:</strong> ${clientName}</p>
          <p style="margin: 4px 0;"><strong>Telefon:</strong> ${clientPhone}</p>
          ${clientEmail ? `<p style="margin: 4px 0;"><strong>Email:</strong> ${clientEmail}</p>` : ""}
          <p style="margin: 4px 0;"><strong>Mașină:</strong> ${carInfo}</p>
          <p style="margin: 4px 0;"><strong>Serviciu:</strong> ${serviceName}</p>
          <p style="margin: 4px 0;"><strong>Data preferată:</strong> ${preferredDate}</p>
          <p style="margin: 4px 0;"><strong>Interval orar:</strong> ${preferredTime}</p>
          ${notes ? `<p style="margin: 4px 0;"><strong>Observații:</strong> ${notes}</p>` : ""}
        </div>
        <p>Accesează panoul de administrare pentru a confirma sau gestiona această programare.</p>
      </div>
    `,
  });
}

/**
 * Email sent to client when appointment is confirmed.
 */
export async function sendAppointmentConfirmedEmail(
  clientEmail: string,
  clientName: string,
  serviceName: string,
  confirmedDate: string,
  confirmedTime: string,
  businessName: string,
  businessPhone: string,
  businessAddress: string
): Promise<boolean> {
  return sendEmail({
    to: clientEmail,
    subject: `✅ Programare confirmată — ${businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #16a34a;">Programare confirmată!</h2>
        <p>Bună, <strong>${clientName}</strong>!</p>
        <p>Programarea ta a fost confirmată. Te așteptăm!</p>
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #16a34a;">
          <p style="margin: 4px 0;"><strong>Serviciu:</strong> ${serviceName}</p>
          <p style="margin: 4px 0;"><strong>Data:</strong> ${confirmedDate}</p>
          <p style="margin: 4px 0;"><strong>Ora:</strong> ${confirmedTime}</p>
          ${businessAddress ? `<p style="margin: 4px 0;"><strong>Adresa:</strong> ${businessAddress}</p>` : ""}
        </div>
        <p>Dacă ai nevoie să modifici sau să anulezi programarea, contactează-ne la <strong>${businessPhone}</strong>.</p>
        <p style="color: #64748b; font-size: 14px;">— Echipa ${businessName}</p>
      </div>
    `,
  });
}

/**
 * Reminder email sent 24h before confirmed appointment.
 */
export async function sendReminderEmail(
  clientEmail: string,
  clientName: string,
  serviceName: string,
  confirmedDate: string,
  confirmedTime: string,
  businessName: string,
  businessPhone: string
): Promise<boolean> {
  return sendEmail({
    to: clientEmail,
    subject: `⏰ Reminder: Ai programare mâine — ${businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: ${branding.colors.primary};">Reminder programare</h2>
        <p>Bună, <strong>${clientName}</strong>!</p>
        <p>Ți-am pregătit un reminder: ai programare <strong>mâine</strong>.</p>
        <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid ${branding.colors.primary};">
          <p style="margin: 4px 0;"><strong>Serviciu:</strong> ${serviceName}</p>
          <p style="margin: 4px 0;"><strong>Data:</strong> ${confirmedDate}</p>
          <p style="margin: 4px 0;"><strong>Ora:</strong> ${confirmedTime}</p>
        </div>
        <p>Dacă nu poți ajunge, te rugăm să ne anunți la <strong>${businessPhone}</strong>.</p>
        <p style="color: #64748b; font-size: 14px;">— Echipa ${businessName}</p>
      </div>
    `,
  });
}

/**
 * Thank you email with Google review link, sent after appointment is completed.
 */
export async function sendThankYouEmail(
  clientEmail: string,
  clientName: string,
  businessName: string,
  googleReviewUrl: string
): Promise<boolean> {
  const reviewSection = googleReviewUrl
    ? `
      <p>Dacă ai fost mulțumit de serviciile noastre, ne-ar ajuta enorm un review:</p>
      <a href="${googleReviewUrl}" style="display: inline-block; background: ${branding.colors.primary}; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
        ⭐ Lasă un review pe Google
      </a>
    `
    : "";

  return sendEmail({
    to: clientEmail,
    subject: `Mulțumim pentru vizită! — ${businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: ${branding.colors.primary};">Mulțumim!</h2>
        <p>Bună, <strong>${clientName}</strong>!</p>
        <p>Mulțumim că ai ales <strong>${businessName}</strong>. Sperăm că ai fost mulțumit de serviciile noastre.</p>
        ${reviewSection}
        <p style="margin-top: 20px; color: #64748b; font-size: 14px;">— Echipa ${businessName}</p>
      </div>
    `,
  });
}
