import { Controller, Post, Body } from '@nestjs/common';
import { ChatmodelService } from './chatsession.service';

@Controller('chat')
export class ChatmodelController {
  constructor(private readonly  ChatModelController : ChatmodelService) {}

  @Post()
  create(@Body() body: { prompt: string; }) {
    return this.ChatModelController.MessageModel(body.prompt);
  }
}
