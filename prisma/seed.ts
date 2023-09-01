import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const post1 = await prisma.book.createMany({
      data: [{
          title: 'Book one',
          writer: 'Fred Adebayo',
          coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
          point: 10,
          tags: ['fiction', 'non-fiction', 'science', 'essay'],
        },{
          title: 'Book two',
          writer: 'Fred Adebayo',
          coverImage: 'https://images-na.ssl-images-amazon.com/images/I/91ke43dIxkL._AC_UL254_SR254,254_.jpg',
          point: 10,
          tags: ['fiction', 'essay'],
        },{
          title: 'Book three',
          writer: 'Fred Adebayo',
          coverImage: 'https://images-na.ssl-images-amazon.com/images/I/815oQ6G6HDL._AC_UL254_SR254,254_.jpg',
          point: 10,
          tags: ['science', 'essay'],
        }]
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