import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    username: string,
    password: string,
    email: string,
    role: string,
    resetPasswordToken?: string,
    resetPasswordExpire?: Date,
  ): Promise<any> {
    const saltround = 10;

    //hash password
    const hashedpassword = await bcrypt.hash(password, saltround);

if(!username || !password || !email || !role){
  return {
    success : false,
    message : "All field is required.",
    data : null
  }
}

    const user = new this.userModel({
      username,
      password : hashedpassword,
      email,
      role,
      resetPasswordToken,
      resetPasswordExpire,
    });

    return user.save();
  }

  async LoginUser(
    name: string,
    password: string,
    resetPasswordToken?: string,
    resetPasswordExpire?: Date,
  ): Promise<any> {

if(!name || !password){
  return {
    success : false,
    message : "All field is required.",
    data : null
  }
}

    const query: any = {
      username: name,
    };



    const user = (await this.userModel
      .findOne(query)
      .select('+password')
      .exec()) as any;

    if (!user) {
      return {
        success: false,
        message: 'Invalid Credential.',
        data: null,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        success: false,
        message: 'Invalid Credential',
        data: null,
      };
    }

    //Create JWT payload
    const payload = {
      sub: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    //Generate JWT Token
    const token = this.jwtService.sign(payload);

    //Remove password from password
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    return {
      success: true,
      message: 'Login successfully',
      data: {
        user: userWithoutPassword,
        token: token, //JWT Token
        token_type: 'Bearer',
        token_expires_in: 3600, //1 hour
      },
    };
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  async findAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
