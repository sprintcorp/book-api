import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/services/user.service';
import { CustomUsernamevalidation } from 'src/utils/decorator.utils';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
        }),
    ],
    controllers:[UserController],
    providers:[UserService, PrismaService, CustomUsernamevalidation]
})
export class UserModule {}
