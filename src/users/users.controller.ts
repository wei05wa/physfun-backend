import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SelfGuard } from 'src/auth/guards/self.guard';
import { AdminOrSelfGuard } from 'src/auth/guards/adminorself.guard';

@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() body: { username: string; password: string; email: string; role: string}) {
    return this.usersService.createUser(body.username, body.password, body.email, body.role);
  }

   @Get()
   @UseGuards(AuthGuard,RolesGuard)
   @Roles('admin')
  async findAllUser() {
    return this.usersService.findAllUser();
  }

   @UseGuards(AuthGuard, SelfGuard)
  @Get('name/:username')
  async findByUsername(@Param('username') username: string) {
    return this.usersService.GetmeByUsername(username);
  }

  @UseGuards(AuthGuard, AdminOrSelfGuard)
  @Get('id/:userid')
  async getuserbyid(@Param('userid') userid: string) {
    return this.usersService.GetmebyID(userid);
  }

  @Post('login')
  async LoginUser(@Body() body: { username : string; password: string; }) {
    return this.usersService.LoginUser(body.username, body.password);
  }

}
