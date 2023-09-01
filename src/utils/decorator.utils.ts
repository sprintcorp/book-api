import { Injectable, SetMetadata, UnprocessableEntityException } from '@nestjs/common';

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';

export function isUsernameUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomUsernamevalidation,
    });
  };
}

@ValidatorConstraint({ name: 'username', async: true })
@Injectable()
export class CustomUsernamevalidation implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    // console.log(value);
    // const user = await this.prisma.user.findFirst({ where: { username: value } });
    // const user = await this.prisma.user.create({ data: {'username':value,'password':'password'} });
    const user = await this.userRepository.findOne(value);
    // console.log(user);
// 
      // .then((user) => {
        // if (user) {
        //   throw new UnprocessableEntityException('Username already exists');
        // } else {
          return false;
        // }
      // });
  }
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);