import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrderRepository {
    constructor(private readonly prisma: PrismaService) {}


    async save(data){
        return await this.prisma.order.create({ data: data });
    }

    async update(userId, bookId){
        return await this.prisma.order.update({
            where: { userId_bookId:{userId, bookId} },
            data: {status:'cancelled'},
        });
    }

    async userOrder(userId){
        return await this.prisma.order.findMany({
            where: {userId}
        });
    }

}