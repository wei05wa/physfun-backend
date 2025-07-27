import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

//Authentication
@Injectable() export class AuthGuard implements CanActivate{
    constructor(private jwtService : JwtService,   private configService: ConfigService,){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest<Request>();
         const token = this.extractTokenFromHeader(request);

        if(!token) {
            throw new UnauthorizedException("Not Authorized");
        }

        try{
            const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
      
      request['user'] = payload;

        }catch(error){
              console.error('JWT Verification Failed:', error.message);
            throw new UnauthorizedException("Unauthorized")
        }

         return true;
    }
private extractTokenFromHeader(request : Request): string | undefined{


const [type,token] = request.headers.authorization?.split(' ') ?? [];
return type === 'Bearer' ? token : undefined;
}
}

