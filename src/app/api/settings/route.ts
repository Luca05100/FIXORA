import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { settingsSchema } from "@/lib/validators";

/**
 * GET /api/settings — Get current settings (public for display data, admin for full)
 */
export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: "default" },
      });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la încărcarea setărilor" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings — Update settings (admin only)
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
    const result = settingsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Date invalide", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const settings = await prisma.settings.upsert({
      where: { id: "default" },
      update: result.data,
      create: { id: "default", ...result.data },
    });

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare la salvarea setărilor" },
      { status: 500 }
    );
  }
}
