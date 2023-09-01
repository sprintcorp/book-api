import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription('The Book API description')
    .setVersion('0.1')
    .build();

  // const document = Swagg.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const dbService: PrismaService = app.get(PrismaService);
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
