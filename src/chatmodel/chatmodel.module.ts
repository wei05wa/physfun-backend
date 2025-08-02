import { Module, Logger } from '@nestjs/common';
import { ChatmodelService } from './chatmodel.service';
import { ChatmodelController } from './chatmodel.controller';
import { ConfigModule} from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
imports:[
 ConfigModule,
   MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 1,
      },
    }),
   
],
  providers: [ChatmodelService,  Logger],
  controllers: [ChatmodelController],
})
export class ChatmodelModule {}
