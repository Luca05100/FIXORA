import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@autobook.ro" },
    update: {},
    create: {
      email: "admin@autobook.ro",
      password: adminPassword,
      name: "Administrator",
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // Create default services
  const services = [
    { name: "Schimb ulei", description: "Schimb ulei motor + filtru ulei", duration: 30, price: 150, sortOrder: 1 },
    { name: "Revizie completă", description: "Revizie cu schimb ulei, filtre, verificare generală", duration: 120, price: 500, sortOrder: 2 },
    { name: "Vulcanizare", description: "Montare/demontare cauciucuri, echilibrare", duration: 45, price: 100, sortOrder: 3 },
    { name: "Detailing exterior", description: "Spălare premium, polish, ceruit", duration: 180, price: 300, sortOrder: 4 },
    { name: "Detailing interior", description: "Curățare tapițerie, plastic, geamuri", duration: 150, price: 250, sortOrder: 5 },
    { name: "Diagnoză auto", description: "Diagnoză computerizată + raport", duration: 30, price: 100, sortOrder: 6 },
    { name: "Altul", description: "Alt serviciu — specificați în observații", duration: null, price: null, sortOrder: 99 },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.name.toLowerCase().replace(/\s+/g, "-").replace(/ă/g, "a").replace(/ț/g, "t").replace(/î/g, "i") },
      update: {},
      create: {
        id: service.name.toLowerCase().replace(/\s+/g, "-").replace(/ă/g, "a").replace(/ț/g, "t").replace(/î/g, "i"),
        ...service,
      },
    });
  }
  console.log(`✅ ${services.length} services created`);

  // Create default settings
  await prisma.settings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "Service Auto Demo",
      businessPhone: "0722 123 456",
      businessEmail: "contact@serviceauto.ro",
      businessAddress: "Str. Exemplu nr. 1, București",
      googleReviewUrl: "https://g.page/r/your-review-link",
      primaryColor: "#1e40af",
    },
  });
  console.log("✅ Default settings created");

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
