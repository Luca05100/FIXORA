/**
 * Generic webhook dispatcher for external notification channels.
 * Structured for easy integration with WhatsApp, Telegram, Slack, etc.
 */

export interface WebhookPayload {
  event: "appointment.created" | "appointment.confirmed" | "appointment.cancelled" | "appointment.completed" | "appointment.reminder";
  data: {
    appointmentId: string;
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    serviceName: string;
    date: string;
    time: string;
    status: string;
    notes?: string;
  };
  timestamp: string;
}

/**
 * Dispatch a webhook notification to configured external services.
 * Currently logs to console; connect to WhatsApp/Telegram API as needed.
 */
export async function dispatchWebhook(payload: WebhookPayload): Promise<void> {
  const webhookUrl = process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    // No webhook configured — skip silently
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WEBHOOK_SECRET
          ? { "X-Webhook-Secret": process.env.WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Webhook dispatch failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Don't throw — webhook failures shouldn't break the main flow
    console.error("Webhook dispatch error:", error);
  }
}

/**
 * Helper to create a webhook payload from appointment data.
 */
export function createWebhookPayload(
  event: WebhookPayload["event"],
  appointment: {
    id: string;
    clientName: string;
    clientPhone: string;
    clientEmail?: string | null;
    service: { name: string };
    confirmedDate?: Date | null;
    confirmedTime?: string | null;
    preferredDate: Date;
    preferredTime: string;
    status: string;
    notes?: string | null;
  }
): WebhookPayload {
  return {
    event,
    data: {
      appointmentId: appointment.id,
      clientName: appointment.clientName,
      clientPhone: appointment.clientPhone,
      clientEmail: appointment.clientEmail || undefined,
      serviceName: appointment.service.name,
      date: (appointment.confirmedDate || appointment.preferredDate).toISOString().split("T")[0],
      time: appointment.confirmedTime || appointment.preferredTime,
      status: appointment.status,
      notes: appointment.notes || undefined,
    },
    timestamp: new Date().toISOString(),
  };
}
