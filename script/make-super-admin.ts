import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: {
      email: "your-email@example.com",
    },
    data: {
      role: "SUPER_ADMIN",
    },
  });

  console.log("User promoted to SUPER_ADMIN");
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });