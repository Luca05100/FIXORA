import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { serviceSchema } from "@/lib/validators";

/**
 * GET /api/services — List active services (public)
 */
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        price: true,
        isActive: true,
        sortOrder: true,
      },
    });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("List services error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la încărcarea serviciilor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/services — Create a new service (admin only)
 */
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const result = serviceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Date invalide" },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: result.data,
    });

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la crearea serviciului" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/services — Update services (admin only, bulk update)
 */
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Neautorizat" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { services } = body;

    if (!Array.isArray(services)) {
      return NextResponse.json(
        { success: false, error: "Format invalid" },
        { status: 400 }
      );
    }

    // Update each service
    const updates = services.map(
      (s: { id: string; name: string; description?: string; duration?: number; price?: number; isActive: boolean; sortOrder: number }) =>
        prisma.service.update({
          where: { id: s.id },
          data: {
            name: s.name,
            description: s.description,
            duration: s.duration,
            price: s.price,
            isActive: s.isActive,
            sortOrder: s.sortOrder,
          },
        })
    );

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update services error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la actualizarea serviciilor" },
      { status: 500 }
    );
  }
}
