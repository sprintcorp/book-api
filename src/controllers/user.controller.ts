import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('create')
    async createUser(@Req() res, @Body() user: UserDTO): Promise<any>{
        return await this.userService.createUser(user);   
    }

    @Post('login')
    async loginUser(@Req() res, @Body() user: UserDTO): Promise<any>{
        return await this.userService.loginUser(user);   
    }
}


//src/auth/auth.controller.ts

// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { AuthEntity } from './entity/auth.entity';
// import { LoginDto } from './dto/login.dto';

// @Controller('auth')
// @ApiTags('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   @ApiOkResponse({ type: AuthEntity })
//   login(@Body() { email, password }: LoginDto) {
//     return this.authService.login(email, password);
//   }
// }
