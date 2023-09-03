import { HttpStatus, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from 'src/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private userRepository: UserRepository, private jwtService: JwtService) {}
    
    async createUser(userData: UserDTO):Promise<User>{
        try{
            if(await this.userRepository.findOne(userData.username)){
              throw new UnprocessableEntityException(`User exit with this useraname: ${userData.username}`);
            }
            const salt = await bcrypt.genSalt();
            userData.password = await bcrypt.hash(userData.password, salt);
            const user = await this.userRepository.save(userData);
            return user
        }catch(e){
            throw e;
        }
    }

    async loginUser(userData: UserDTO):Promise<AuthEntity>{
      const user = await this.userRepository.findOne(userData.username);
  
      if (!user) {
        throw new NotFoundException(`No user found for user: ${userData.username}`);
      }
      
      const isPasswordValid = await bcrypt.compare(userData.password, user.password);
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
      const token = await this.jwtService.signAsync({ user: user });
      return {
        accessToken: token,
      };
    }
}