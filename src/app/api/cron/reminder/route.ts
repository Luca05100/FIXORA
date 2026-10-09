import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendReminderEmail } from "@/lib/email";
import { addDays, startOfDay, endOfDay } from "date-fns";

/**
 * GET /api/cron/reminder — Send reminder emails for tomorrow's appointments
 * 
 * This endpoint is called by Vercel Cron daily.
 * Protected by CRON_SECRET to prevent unauthorized access.
 */
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  try {
    const tomorrow = addDays(new Date(), 1);
    const tomorrowStart = startOfDay(tomorrow);
    const tomorrowEnd = endOfDay(tomorrow);

    // Find confirmed appointments for tomorrow that haven't received a reminder
    const appointments = await prisma.appointment.findMany({
      where: {
        status: "CONFIRMED",
        reminderSent: false,
        confirmedDate: {
          gte: tomorrowStart,
          lte: tomorrowEnd,
        },
      },
      include: { service: true },
    });

    if (appointments.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nu sunt programări pentru mâine care necesită reminder.",
        count: 0,
      });
    }

    const settings = await prisma.settings.findUnique({
      where: { id: "default" },
    });

    const businessName = settings?.businessName || "Service Auto";
    const businessPhone = settings?.businessPhone || "";

    let sentCount = 0;
    let errorCount = 0;

    for (const apt of appointments) {
      if (!apt.clientEmail) {
        // Skip appointments without email
        continue;
      }

      const dateStr = (apt.confirmedDate || apt.preferredDate).toLocaleDateString("ro-RO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const success = await sendReminderEmail(
        apt.clientEmail,
        apt.clientName,
        apt.service.name,
        dateStr,
        apt.confirmedTime || apt.preferredTime,
        businessName,
        businessPhone
      );

      if (success) {
        await prisma.appointment.update({
          where: { id: apt.id },
          data: { reminderSent: true },
        });
        sentCount++;
      } else {
        errorCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Remindere trimise: ${sentCount}, erori: ${errorCount}`,
      count: sentCount,
      errors: errorCount,
    });
  } catch (error) {
    console.error("Reminder cron error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la trimiterea reminderelor" },
      { status: 500 }
    );
  }
}
