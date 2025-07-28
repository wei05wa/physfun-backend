import { Controller, Post, Body, Get, Param, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SelfGuard } from 'src/auth/guards/self.guard';
import { AdminOrSelfGuard } from 'src/auth/guards/adminorself.guard';
import { response, Response } from 'express';
import loginUserDto from './dto/login-user.dto';

@Controller('auth')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() body: { username: string; password: string; email: string; role: string}) {
    return this.usersService.createUser(body.username, body.password, body.email, body.role);
  }

   @Get('users')
   @UseGuards(AuthGuard,RolesGuard)
   @Roles('admin')
  async findAllUser() {
    return this.usersService.findAllUser();
  }

   @UseGuards(AuthGuard, AdminOrSelfGuard)
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
  async LoginUser(@Body() loginUserDto : any,  @Res({ passthrough: true }) response: Response) {
    const result = await this.usersService.LoginUser(loginUserDto.username, loginUserDto.password);

      // Set cookie if login successful
if(result.success && result.token){
  response.cookie('token', result.token, {
    httpOnly: true,
secure : process.env.NODE_ENV === 'production', // HTTPS only in production environment
 maxAge: 1209600000,    // duration = 2 weeks
  });
}


return result;
  }


    @Get('logout')
    @UseGuards(AuthGuard)
  async LogoutUser(@Res({passthrough : true}) response : Response ) {

  //clear cookie
  response.clearCookie('token');

    return this.usersService.LogoutUser();
  }
}
