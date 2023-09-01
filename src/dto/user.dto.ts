import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { isUsernameUnique } from "src/utils/decorator.utils";

export class UserDTO{
    @IsNotEmpty()
    @IsString()
    @isUsernameUnique({ message: 'username already exist' })
    @ApiProperty()
    public username: string;

    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    @ApiProperty()
    public password: string;
}


export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}