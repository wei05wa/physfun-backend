import { Injectable, Res, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



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
    if (!username || !password || !email || !role) {
      return {
        success: false,
        message: 'All field is required.',
        data: null,
      };
    }

    try {
      //  const saltround = 10;

      //   //hash password
      //   const hashedpassword = await bcrypt.hash(password, saltround);

      const user = new this.userModel({
        username,
        password,
        email,
        role,
        resetPasswordToken,
        resetPasswordExpire,
      });

      const savedUser = await user.save();
      return {
        success: true,
        message: 'User created successfully',
        data: savedUser,
      };
    } catch (err) {
      console.error('User creation error:', err);
      return {
        success: false,
        message: 'Failed to create user',
        data: null,
      };
    }
  }

  async LoginUser(
    name: string,
    password: string,
    resetPasswordToken?: string,
    resetPasswordExpire?: Date,
  ): Promise<any> {
    if (!name || !password) {
      return {
        success: false,
        message: 'All field is required.',
        data: null,
      };
    }

    const query: any = {
      username: name,
    };

    const user = await this.userModel.findOne(query).select('+password').exec();

    if (!user) {
      return {
        success: false,
        message: 'Invalid Credential. (us)',
        data: null,
      };
    }

    // console.log(password);
    // console.log(user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    // console.log(isMatch);

    if (!isMatch) {
      return {
        success: false,
        message: 'Invalid Credential.',
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
    const token = await this.jwtService.signAsync(payload);

    //Remove password from password
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    return {
      success: true,
      message: 'Login successfully',
      token: token, //JWT Token
      token_type: 'Bearer',
      token_expires_in: 3600, //1 hour
      data: {
        user: userWithoutPassword,
      },
    };
  }

async LogoutUser(){

  return {
    success : true,
    message : 'Logged Out Successfully.'
  }
}

  async GetmeByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

   async GetmebyID(userid: string): Promise<User | null> {
const user = this.userModel.findById(userid)

 if (!user) {
      throw new NotFoundException(`Usernot found.`);
    }

    return user
   }


  async findAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  
}
