import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { BookController } from 'src/controllers/book.controller';
import { JwtStrategy } from 'src/middlewares/authentication.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRepository } from 'src/repositories/book.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { BookService } from 'src/services/book.service';
import { LoggingService } from 'src/services/logger.service';

@Module({
    imports: [],
    controllers:[BookController],
    providers:[BookService, PrismaService, BookRepository, UserRepository,LoggingService, {
        provide: APP_GUARD,
        useClass: JwtStrategy,
      }],
})
export class BookModule {}
