import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule }  from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  
   PassportModule,
    JwtModule.registerAsync({
     imports : [ConfigModule],
         inject: [ConfigService],
         useFactory: (config: ConfigService) => ({
           secret: config.get<string>('JWT_SECRET'),
           signOptions: {expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1h', }, // user need to re login again after jwt-expire or 1 hour
         }),
       }),
  ],

  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
