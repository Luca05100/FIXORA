import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhook/notify — Generic webhook endpoint
 * 
 * This endpoint receives notifications from external services
 * (e.g., WhatsApp, Telegram bots) and can be used to trigger actions.
 * 
 * Payload format:
 * {
 *   "event": "message.received",
 *   "source": "whatsapp" | "telegram" | "sms",
 *   "data": {
 *     "phone": "+40...",
 *     "message": "...",
 *     "timestamp": "ISO-8601"
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  // Verify webhook secret
  const webhookSecret = process.env.INCOMING_WEBHOOK_SECRET;
  if (webhookSecret) {
    const providedSecret = request.headers.get("x-webhook-secret");
    if (providedSecret !== webhookSecret) {
      return NextResponse.json(
        { success: false, error: "Invalid webhook secret" },
        { status: 401 }
      );
    }
  }

  try {
    const payload = await request.json();

    // Log the webhook event (without sensitive data)
    console.log("Webhook received:", {
      event: payload.event,
      source: payload.source,
      timestamp: new Date().toISOString(),
    });

    // TODO: Implement handlers for different webhook events
    // Example handlers:
    // - Auto-reply to WhatsApp messages
    // - Process Telegram bot commands
    // - Handle SMS responses

    return NextResponse.json({
      success: true,
      message: "Webhook received",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
}
