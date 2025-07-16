import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() body: { username: string; password: string; email: string; role: string}) {
    return this.usersService.createUser(body.username, body.password, body.email, body.role);
  }

 @Get()
  async findAllUser() {
    return this.usersService.findAllUser();
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post('login')
  async LoginUser(@Body() body: { username : string; password: string; role: string}) {
    return this.usersService.LoginUser(body.username, body.password, body.role);
  }

}
