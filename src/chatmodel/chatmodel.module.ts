import { Module } from '@nestjs/common';
import { ChatmodelService } from './chatmodel.service';
import { ChatmodelController } from './chatmodel.controller';
import { ConfigModule} from '@nestjs/config';

@Module({
imports:[
 ConfigModule
],
  providers: [ChatmodelService],
  controllers: [ChatmodelController],
})
export class ChatmodelModule {}
