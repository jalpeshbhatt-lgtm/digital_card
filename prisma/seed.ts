import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const templates = [
    {
      name: "Corporate Blue",
      slug: "corporate-blue",
      category: "corporate",
      thumbnail: "/templates/corporate-blue.jpg",
      isActive: true,
    },
    {
      name: "Corporate Green",
      slug: "corporate-green",
      category: "corporate",
      thumbnail: "/templates/corporate-green.jpg",
      isActive: true,
    },
    {
      name: "Modern Purple",
      slug: "modern-purple",
      category: "modern",
      thumbnail: "/templates/modern-purple.jpg",
      isActive: true,
    },
    {
      name: "Modern Cyan",
      slug: "modern-cyan",
      category: "modern",
      thumbnail: "/templates/modern-cyan.jpg",
      isActive: true,
    },
    {
      name: "Luxury Gold",
      slug: "luxury-gold",
      category: "luxury",
      thumbnail: "/templates/luxury-gold.jpg",
      isActive: true,
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: {
        slug: template.slug,
      },
      update: template,
      create: template,
    });
  }

  console.log("✅ Templates seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });