import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const post1 = await prisma.book.upsert({
        where: { id: 1 },
        update: {},
        create: {
          title: 'Book one',
          writer: 'Fred Adebayo',
          coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
          point: 100,
          tags: ['fiction', 'non-fiction', 'science', 'essay'],
        },
      });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});