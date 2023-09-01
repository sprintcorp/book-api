import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BookRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getBooks():Promise<any>{
        return await this.prisma.book.findMany();
    }

}