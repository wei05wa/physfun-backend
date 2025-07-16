import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export default class {
  
  @IsString()
  username?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
