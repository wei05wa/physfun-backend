import { CanActivate, ExecutionContext, Injectable,  ForbiddenException  } from '@nestjs/common';
import {Request } from 'express'

@Injectable()
export class AdminOrSelfGuard implements CanActivate{

 canActivate(context: ExecutionContext): boolean {

     const request = context.switchToHttp().getRequest<Request>();

const user = request.user;
const paramsUserId = request.params.userid;
const paramsUsername = request.params.username;


if(!user){
  return false;
}

if(user.role === 'admin'){
    return true;
}

   // If the id from the token matches the id in the URL, allow access.
if(user.sub === paramsUserId){
 return true
}


   // If the username from the token matches the username in the URL, allow access.
if(user.username === paramsUsername){
 return true
}

    throw new ForbiddenException("User don't have permission to this route. lol")
 }
}