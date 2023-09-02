import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(data){
        return await this.prisma.user.create({ data: data });
    }

    async findOne(username){
        return await this.prisma.user.findUnique({ where: { username: username } })
    }

    async updateUser(id: number,point: number){
        return await this.prisma.user.update({
            where: {id} ,
            data: {point: point},
        });
    }
}