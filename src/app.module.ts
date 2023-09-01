import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
// import { PrismaService } from './prisma/prisma.service';
// import { UserController } from './controllers/user.controller';
// import { OrderController } from './controllers/order.controller';
// import { BookController } from './controllers/book.controller';
import { UserModule } from './modules/user.module';
// import { UserService } from './services/user.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
