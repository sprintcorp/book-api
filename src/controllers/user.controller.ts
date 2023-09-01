import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { LoginDto, UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('create')
    async createUser(@Req() res, @Body() user: UserDTO): Promise<any>{
        return await this.userService.createUser(user);   
    }

    @Post('login')
    async loginUser(@Req() res, @Body() user: LoginDto): Promise<any>{
        return await this.userService.loginUser(user);   
    }
}
