import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export class CreateChatSession {
  @IsString()
  sessionId: string;

  @IsString()
 
  userId: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
