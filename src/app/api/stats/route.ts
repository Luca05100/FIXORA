import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { subDays, startOfDay, endOfDay, format } from "date-fns";

/**
 * GET /api/stats — Get appointment statistics for last 30 days (admin only)
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  try {
    const thirtyDaysAgo = startOfDay(subDays(new Date(), 30));

    // Get aggregate counts
    const [totalPending, totalConfirmed, totalCompleted, totalCancelled] =
      await Promise.all([
        prisma.appointment.count({
          where: {
            status: "PENDING",
            createdAt: { gte: thirtyDaysAgo },
          },
        }),
        prisma.appointment.count({
          where: {
            status: "CONFIRMED",
            createdAt: { gte: thirtyDaysAgo },
          },
        }),
        prisma.appointment.count({
          where: {
            status: "COMPLETED",
            createdAt: { gte: thirtyDaysAgo },
          },
        }),
        prisma.appointment.count({
          where: {
            status: "CANCELLED",
            createdAt: { gte: thirtyDaysAgo },
          },
        }),
      ]);

    // Get daily breakdown for chart
    const appointments = await prisma.appointment.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
      select: {
        status: true,
        createdAt: true,
      },
    });

    // Build daily stats map
    const dailyMap = new Map<
      string,
      { pending: number; confirmed: number; completed: number; cancelled: number }
    >();

    // Initialize all 30 days
    for (let i = 30; i >= 0; i--) {
      const date = format(subDays(new Date(), i), "yyyy-MM-dd");
      dailyMap.set(date, { pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
    }

    // Populate with actual data
    for (const apt of appointments) {
      const date = format(apt.createdAt, "yyyy-MM-dd");
      const entry = dailyMap.get(date);
      if (entry) {
        const status = apt.status.toLowerCase() as "pending" | "confirmed" | "completed" | "cancelled";
        if (status in entry) {
          entry[status]++;
        }
      }
    }

    const dailyStats = Array.from(dailyMap.entries()).map(([date, counts]) => ({
      date,
      ...counts,
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalPending,
        totalConfirmed,
        totalCompleted,
        totalCancelled,
        total: totalPending + totalConfirmed + totalCompleted + totalCancelled,
        dailyStats,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la generarea statisticilor" },
      { status: 500 }
    );
  }
}
