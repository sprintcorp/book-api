import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from 'src/controllers/app.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRepository } from 'src/repositories/book.repository';
import { BookService } from 'src/services/book.service';
import { RabbitMQService } from 'src/services/rabbitmq.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://scfwsotk:f52LYqeskoX8pUYbr-8Il9wlYy8-yTEI@crow.rmq.cloudamqp.com/scfwsotk',
          ],
          queue: 'hello_world',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [RabbitMQService, BookService, BookRepository, PrismaService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}