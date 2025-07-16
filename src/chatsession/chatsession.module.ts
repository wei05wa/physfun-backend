import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  { ChatSessionSchema, ChatSession } from './chatsession.schema';
import { ChatSessionService } from './chatsession.service';
import { ChatSessionController } from './chatsession.controller';
import { ConfigModule} from '@nestjs/config';

@Module({
imports:[
 ConfigModule
],
  providers: [ChatSessionService],
  controllers: [ChatSessionController],
})
export class ChatsessionModule {}
