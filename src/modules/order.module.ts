import { Module } from '@nestjs/common';
import { OrderController } from 'src/controllers/order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderRepository } from 'src/repositories/order.repository';
import { OrderService } from 'src/services/order.service';

@Module({
    imports: [],
    controllers:[OrderController],
    providers:[OrderService, PrismaService, OrderRepository]
})
export class OrderModule {}
