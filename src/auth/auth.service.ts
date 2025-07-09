import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      // แปลง user document เป็น plain object ด้วย JSON.parse(JSON.stringify(user)) แล้วลบ password
      const userObj = JSON.parse(JSON.stringify(user));
      delete userObj.password;
      return userObj;
    }
    return null;
  }
}
