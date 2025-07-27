import { CanActivate, ExecutionContext, Injectable,  ForbiddenException  } from '@nestjs/common';
import {Request } from 'express'

@Injectable()
export class SelfGuard implements CanActivate{

 canActivate(context: ExecutionContext): boolean {

     const request = context.switchToHttp().getRequest<Request>();
const user = request.user;
const paramsUsername = request.params.username;


if(!user || !paramsUsername){
  return false;
}

   // If the username from the token matches the username in the URL, allow access.
if(user.username === paramsUsername){
 return true
}

    throw new ForbiddenException("User don't have permission to this route. ja")
 }
}