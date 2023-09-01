import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { user: any }) {
    const user = await this.userRepository.findOne(payload.user.username);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}






// import { JwtService } from '@nestjs/jwt';
// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { Reflector } from '@nestjs/core';
// import { UserRepository } from 'src/repositories/user.repository';
// import { IS_PUBLIC_KEY } from 'src/utils/decorator.utils';


// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private readonly jwtService: JwtService, private reflector: Reflector,
//       private userRepository:UserRepository) {}

//     async canActivate(context: ExecutionContext): Promise<boolean> {

//       const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//         context.getHandler(),
//         context.getClass(),
//       ]);
      
//       if (isPublic) {
//         return true;
//       }



//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(
//         token,
//         {
//           secret: process.env.JWT_SECRET
//         }
//       );
//       const user = payload.user;

//       request['user'] = user;
    
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
