import { IsString,IsNotEmpty, IsIn, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
    @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

 @IsString()
  @IsEmail()
  email: string;

  
 @IsString()
   @IsNotEmpty()
    @IsIn(['user', 'admin'])
  role: string;
}
