import { Controller, Post, Body } from '@nestjs/common';
import { ChatSessionService } from './chatsession.service';

@Controller('Chatsession')
export class ChatSessionController {
  constructor(private readonly  ChatSessionService : ChatSessionService) {}

  @Post()
  create(@Body() body: {sessionId : string , userId : string , messages : any[]}) {
    return this.ChatSessionService.createSession(body.sessionId,body.userId, body.messages);
  }

  
}
