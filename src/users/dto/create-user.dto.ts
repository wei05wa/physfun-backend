import { IsString,IsNotEmpty, IsOptional, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
    @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

 @IsString()
   @IsNotEmpty()
  @IsEmail()
  email: string;

  
 @IsString()
   @IsNotEmpty()
  role: string;
}
