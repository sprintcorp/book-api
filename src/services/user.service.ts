import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    
    async createUser(userData: UserDTO):Promise<User>{
        try{
            const salt = await bcrypt.genSalt();
            userData.password = await bcrypt.hash(userData.password, salt);

            const user = await this.prisma.user.create({ data: userData });
            return user
        }catch(e){
            throw e;
        }
    }

    async loginUser(userData: UserDTO):Promise<any>{

    }

    async getUser(username):Promise<boolean>{
        const user = await this.prisma.user.findFirst({ where: { username: username } });
        if (user) {
            throw new UnprocessableEntityException('Username already exists');
        } else {
            return true;
        }
    }
}