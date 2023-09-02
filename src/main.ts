import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {Transport, MicroserviceOptions} from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://scfwsotk:f52LYqeskoX8pUYbr-8Il9wlYy8-yTEI@crow.rmq.cloudamqp.com/scfwsotk'],
      queue: 'hello_world',
      queueOptions: {
        durable: false
      },
      noAck: false,
    },
  });

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
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
