import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { confirmAppointmentSchema } from "@/lib/validators";
import { auth } from "@/lib/auth";
import {
  notifyAppointmentConfirmed,
  notifyAppointmentCompleted,
} from "@/lib/notifications";
import { dispatchWebhook, createWebhookPayload } from "@/lib/webhook";

/**
 * PATCH /api/appointments/[id] — Update appointment status (admin only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    // Check appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { service: true },
    });

    if (!appointment) {
      return NextResponse.json(
        { success: false, error: "Programarea nu a fost găsită" },
        { status: 404 }
      );
    }

    switch (action) {
      case "confirm": {
        const validation = confirmAppointmentSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json(
            { success: false, error: "Date invalide pentru confirmare" },
            { status: 400 }
          );
        }

        const updated = await prisma.appointment.update({
          where: { id },
          data: {
            status: "CONFIRMED",
            confirmedDate: new Date(validation.data.confirmedDate),
            confirmedTime: validation.data.confirmedTime,
          },
          include: { service: true },
        });

        // Send confirmation email
        notifyAppointmentConfirmed(id).catch((err) =>
          console.error("Confirm notification error:", err)
        );

        return NextResponse.json({ success: true, data: updated });
      }

      case "cancel": {
        const updated = await prisma.appointment.update({
          where: { id },
          data: { status: "CANCELLED" },
          include: { service: true },
        });

        // Dispatch webhook for cancellation
        dispatchWebhook(createWebhookPayload("appointment.cancelled", updated)).catch(
          (err) => console.error("Cancel webhook error:", err)
        );

        return NextResponse.json({ success: true, data: updated });
      }

      case "complete": {
        const updated = await prisma.appointment.update({
          where: { id },
          data: { status: "COMPLETED" },
          include: { service: true },
        });

        // Send thank you + review email
        notifyAppointmentCompleted(id).catch((err) =>
          console.error("Complete notification error:", err)
        );

        return NextResponse.json({ success: true, data: updated });
      }

      default:
        return NextResponse.json(
          { success: false, error: "Acțiune necunoscută" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Update appointment error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la actualizarea programării" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/appointments/[id] — Get single appointment (admin only)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { service: true },
  });

  if (!appointment) {
    return NextResponse.json(
      { success: false, error: "Programarea nu a fost găsită" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: appointment });
}
