import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';

@Module({
    imports: [],
    controllers:[UserController],
    providers:[UserService, PrismaService, UserRepository]
})
export class UserModule {}
