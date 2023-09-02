import { Module } from '@nestjs/common';
import { OrderController } from 'src/controllers/order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRepository } from 'src/repositories/book.repository';
import { OrderRepository } from 'src/repositories/order.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { OrderService } from 'src/services/order.service';

@Module({
    imports: [],
    controllers:[OrderController],
    providers:[OrderService, PrismaService, OrderRepository, BookRepository, UserRepository]
})
export class OrderModule {}
