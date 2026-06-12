import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@yourdomain.com",
    },
    update: {
      role: "SUPER_ADMIN",
    },
    create: {
      name: "Super Admin",
      email: "admin@yourdomain.com",
      password,
      role: "SUPER_ADMIN",
    },
  });

  console.log("✅ Super Admin Created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });