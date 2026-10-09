import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";
import { notifyAppointmentCreated } from "@/lib/notifications";
import { auth } from "@/lib/auth";

/**
 * POST /api/appointments — Create a new appointment (public)
 */
export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimit = checkRateLimit(request, { maxRequests: 5, windowMs: 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Prea multe cereri. Încearcă din nou în câteva momente." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(rateLimit.resetIn / 1000).toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const body = await request.json();

    // Validate input
    const result = appointmentSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const field = issue.path.join(".");
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(issue.message);
      }
      return NextResponse.json(
        { success: false, error: "Date invalide", errors: fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Verify service exists
    const service = await prisma.service.findUnique({
      where: { id: data.serviceId },
    });
    if (!service || !service.isActive) {
      return NextResponse.json(
        { success: false, error: "Serviciul selectat nu este disponibil" },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        clientEmail: data.clientEmail || null,
        carBrand: data.carBrand,
        carModel: data.carModel,
        serviceId: data.serviceId,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        notes: data.notes || null,
        status: "PENDING",
      },
      include: { service: true },
    });

    // Send notifications (non-blocking — don't fail the request if notifications fail)
    notifyAppointmentCreated(appointment.id).catch((err) => {
      console.error("Notification error:", err);
    });

    return NextResponse.json(
      {
        success: true,
        data: { id: appointment.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create appointment error:", error);
    return NextResponse.json(
      { success: false, error: "A apărut o eroare. Încearcă din nou." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/appointments — List appointments (admin only)
 */
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: { service: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        appointments,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("List appointments error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la încărcarea programărilor" },
      { status: 500 }
    );
  }
}
