import { Module } from '@nestjs/common';
import { ChatmodelService } from './chatsession.service';
import { ChatmodelController } from './chatsession.controller';
import { ConfigModule} from '@nestjs/config';

@Module({
imports:[
 ConfigModule
],
  providers: [ChatmodelService],
  controllers: [ChatmodelController],
})
export class ChatsessionModule {}
