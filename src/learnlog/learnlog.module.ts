import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearnLog, LearnLogSchema } from './learnlog.schema';
import { LearnLogService } from './learnlog.service';
import { LearnLogController } from './learnlog.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LearnLog.name, schema: LearnLogSchema }]),
  ],
  providers: [LearnLogService],
  controllers: [LearnLogController],
})
export class LearnLogModule {}
