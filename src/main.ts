import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Book API V1')
    .setDescription('The API is used to help user create order from available books')
    .setVersion('1.0')
    .addTag('Book')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  // const dbService: PrismaService = app.get(PrismaService);
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
