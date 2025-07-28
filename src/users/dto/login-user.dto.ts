import { IsString , MinLength } from 'class-validator';

export default class {
  
  @IsString()
  username?: string;

  @IsString()
  @MinLength(6)
  password: string;

}
