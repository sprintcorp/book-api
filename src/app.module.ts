import { Module } from '@nestjs/common';
// import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './modules/book.module';
import { OrderModule } from './modules/order.module';
import { RabbitMQModule } from './modules/rabbitmq.module';

@Module({
  imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
        }),
        UserModule, BookModule, OrderModule, RabbitMQModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
