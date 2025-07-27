import { CanActivate, ExecutionContext, Injectable,  ForbiddenException  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import  { ROLES_KEY }   from '../decorators/roles.decorator'
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate{
 constructor(private reflector : Reflector){}

 canActivate(context: ExecutionContext): boolean {
   //Array keep role to access
     const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
        context.getHandler(),
        context.getClass(),
     ]);

        // If no roles are specified, allow access
     if(!requiredRoles || requiredRoles.length === 0){
        return true;
     }

     const request = context.switchToHttp().getRequest<Request>();
const user = request.user;

if(!user || !user.role){
   throw new ForbiddenException('User not authenticated.');
}


const haspermission = requiredRoles.some(role => user.role === role)

if(!haspermission){
     throw new ForbiddenException(
        `Access denied. Not Authorized.`
      );
}

     return true
 }
}